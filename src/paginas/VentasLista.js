import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { pedirVentasLista } from "../actions/ventaActions";
import Loader from "../componentes/Loader";
import { RESET_VENTA_DETALLES } from "../constantes/ventaConstantes";
import styled from "styled-components";
import FiltroListaVentas from "../componentes/VentasLista/FiltroListaVentas";
import VentanaEmergenteDetallesVenta from "../componentes/VentasLista/VentanaEmergenteDetallesVenta";
import VentanaEmergenteResumenVentas from "../componentes/VentasLista/VentanaEmergenteResumenVentas";
import ColumnasLista from "../componentes/ColumnasLista";
import ListaVentasRenglones from "../componentes/VentasLista/ListaVentaRenglones";
import * as XLSX from "xlsx";

const Principal = styled.div`
  position: fixed;
  background: linear-gradient(
    rgb(54, 54, 82),
    15%,
    rgb(84, 106, 144),
    60%,
    rgb(68, 111, 151)
  );
  color: black;
  font-weight: 400;
  border-radius: 0px;
  width: 100vw;
  height: 91vh;
  padding: 10px;
  grid-gap: 10px;
  display: grid;
  grid-template-columns: 2.5fr 8fr;
  grid-template-rows: 0.7fr 5.7fr 1.5fr;
  grid-template-areas:
    "PanelControl Columnas"
    "PanelControl ContenidoPrincipal"
    "Herramientas ContenidoPrincipal";
`;

// Estilos para el formulario de filtrado
const PanelControl = styled.div`
  grid-area: PanelControl;
  position: relative;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  align-items: flex-start;
  padding: 15px;
  padding-top: 8px;
  height: 100%;
  width: 100%;
`;

// Estilos para los renglones de productos
const ContenidoPrincipal = styled.div`
  grid-area: ContenidoPrincipal;
  background-color: white;
  position: relative;
  overflow: auto;
  padding: 10px;
  justify-content: center;
  border-radius: 5px;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.15);

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

// Estilos para la seccion de resumen de ventas y exportar tablas
const Herramientas = styled.div`
  background: white;
  color: black;
  grid-area: Herramientas;
  border-radius: 5px;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.15);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "Resumen"
    "Exportar";
  align-items: center;
  justify-items: center;
`;

// Estilo para los botones
const Boton = styled(Button)`
  width: 75%;
  height: 35px;
  background-color: green;
  color: white;
  font-weight: bold;
  box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);
  font-size: 14px;
  padding-top: 5px;
  align-items: center;

  &:hover {
    background-color: #00a100;
    box-shadow: 0px 2px 5px 2px rgba(0, 161, 0, 0.8);
  }
`;

// Estilo para el boton de resumen
const BotonResumen = styled(Boton)`
  grid-area: Resumen;
`;

// Estilo para el boton de exportar
const BotonExportar = styled(Boton)`
  grid-area: Exportar;
`;

const VentasLista = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();
  // Funcion para nevagar en la aplicacion
  const navigate = useNavigate();
  // Obtener el estado desde el Redux store
  const ventaLista = useSelector((state) => state.ventaLista);
  const { loading, ventas, error } = ventaLista;

  useEffect(() => {
    // Si no hay ventas, disparar la accion de pedir productos
    if (!ventas) {
      dispatch(pedirVentasLista());
    }
  }, [dispatch, ventas]);

  const manejarVentaDetalles = (id) => {
    // Redireccionar a la pagina de la venta
    dispatch({ type: RESET_VENTA_DETALLES });
    navigate(`/ventas/${id}`);
  };

  // Custom Hook para crear el estado filtros y destructurar sus componentes y su manejarFiltros
  const {
    buscar,
    filtrarPor,
    ordenarPor,
    fechaInicio,
    fechaFinal,
    horaInicio,
    horaFinal,
    manejarFiltros,
  } = useFiltros();

  // Hook para guardar los detalles de la venta
  const [ventaDetalles, setVentaDetalles] = useState({});

  // Custom hook para mostrar los detalles de la venta
  const {
    estadoVentanaEmergente,
    setEstadoVentanaEmergente,
    mostrarDetallesVenta,
  } = useVentanaEmergente(setVentaDetalles);

  // Hook para mostrar el resumen de venta
  const [mostrarResumen, setMostrarResumen] = useState(false);

  // ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE

  // Parte 2. LLamar a las funciones que modifican los estados

  // 1. Filtrar ventas por campo seleccionado
  let ventasFiltradas;
  if (ventas) {
    ventasFiltradas = filtrarVentasPorCampo(ventas, filtrarPor, buscar);

    // 2. Filtrar ventas por fecha
    ventasFiltradas = filtrarVentasPorFecha(
      ventasFiltradas,
      fechaInicio,
      fechaFinal
    );

    // 3. Filtrar ventas por hora
    ventasFiltradas = filtrarVentasPorHora(
      ventasFiltradas,
      horaInicio,
      horaFinal
    );

    // 4. Ordenar ventas por campo seleccionado
    ventasFiltradas = ordenarVentas(ventasFiltradas, ordenarPor);
  }

  const manejarExportarVentas = (ventas) => {
    ventas = modifyJSON(ventas);
    const worksheet = XLSX.utils.json_to_sheet(ventas);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "ventas.xlsx");
  };

  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  let NombresColumnas;

  if (isAdmin) {
    NombresColumnas = [
      "ID",
      "CLIENTE",
      "FECHA",
      "HORA",
      "TIPO DE VENTA",
      "VENDEDOR",
      "TIPO DE PAGO",
      "STATUS",
      "EDITAR",
    ];
  } else {
    NombresColumnas = [
      "ID",
      "CLIENTE",
      "FECHA",
      "HORA",
      "TIPO DE VENTA",
      "VENDEDOR",
      "TIPO DE PAGO",
      "STATUS",
    ];
  }

  return loading ? (
    <Principal>
      <Loader />
    </Principal>
  ) : error ? (
    <Principal>{toast.error("Error en el servidor")}</Principal>
  ) : (
    ventas && (
      <>
        <Principal>
          <PanelControl>
            <FiltroListaVentas
              manejarFiltros={manejarFiltros}
              setMostrarResumen={setMostrarResumen}
            />
          </PanelControl>

          {/* DESCRIPCION DE LA LISTA */}
          <ColumnasLista NombresColumnas={NombresColumnas} />

          {/* LISTA DE USUARIOS */}
          <ContenidoPrincipal>
            <ListaVentasRenglones
              ventas={ventasFiltradas}
              mostrarDetallesVenta={mostrarDetallesVenta}
              manejarVentaDetalles={manejarVentaDetalles}
            />
          </ContenidoPrincipal>

          {/* HERRAMIENTAS */}
          <Herramientas>
            {/* EXPORTAR VENTAS */}
            <BotonExportar
              type="submit"
              onClick={() => manejarExportarVentas(ventasFiltradas)}
            >
              Descargar tabla de ventas
            </BotonExportar>

            {/* MOSTRAR RESUMEN DE VENTAS */}
            <BotonResumen onClick={setMostrarResumen} type="submit">
              Mostrar resumen de ventas
            </BotonResumen>
          </Herramientas>

          {/* VENTANA EMERGENTE CON DETALLES DE VENTA */}
          <VentanaEmergenteDetallesVenta
            estado={estadoVentanaEmergente}
            cambiarEstado={setEstadoVentanaEmergente}
            ventaDetalles={ventaDetalles}
          />

          {/* VENTANA EMERGENTE CON RESUMEN DE VENTAS */}
          <VentanaEmergenteResumenVentas
            mostrarResumen={mostrarResumen}
            setMostrarResumen={setMostrarResumen}
            ventas={ventasFiltradas}
          />
        </Principal>
      </>
    )
  );
};

// Función para crear estado filter y su API
const useFiltros = () => {
  // Crear estado filtros
  const [filtros, setFiltros] = useState({
    buscar: "",
    filtrarPor: 0,
    ordenarPor: 0,
    fechaInicio: "",
    fechaFinal: "",
    horaInicio: "",
    horaFinal: "",
  });

  // Funcion para modificar el estado filtros
  const manejarFiltros = (
    buscar,
    filtrarPor,
    ordenarPor,
    fechaInicio,
    fechaFinal,
    horaInicio,
    horaFinal
  ) => {
    setFiltros({
      buscar,
      filtrarPor,
      ordenarPor,
      fechaInicio,
      fechaFinal,
      horaInicio,
      horaFinal,
    });
  };

  return {
    ...filtros,
    manejarFiltros,
  };
};

// Funcion para filtrar usuarios por campo seleccionado
const filtrarVentasPorCampo = (ventas, campo, buscar) => {
  // Si no hay nombre para buscar, regresa todos los usuarios
  // Regresamos una copia para tener una funcion pura
  if (!buscar) return [...ventas];
  // Pasa el valor de buscar a minusculas
  const minusculaBusqueda = buscar.toLowerCase();

  // Filtra ventas por el campo seleccionado y el valor de busqueda
  switch (campo) {
    // Filtrar usuarios por nombre del cliente
    case 0:
      return ventas.filter((venta) =>
        venta.cliente_nombre.toLowerCase().startsWith(minusculaBusqueda)
      );
    // Filtrar usuarios por tipo de venta
    case 1:
      return ventas.filter((venta) =>
        venta.TIPO_VENTA.toLowerCase().startsWith(minusculaBusqueda)
      );
    // Filtrar usuarios por tipo de pago
    case 2:
      return ventas.filter((venta) =>
        venta.TIPO_PAGO.toLowerCase().startsWith(minusculaBusqueda)
      );
    // Filtrar usuarios por status
    case 3:
      return ventas.filter((venta) =>
        venta.STATUS.toLowerCase().startsWith(minusculaBusqueda)
      );
    // Filtrar usuarios por nombre del repartidor
    case 4:
      return ventas.filter((venta) =>
        venta.VENDEDOR.toLowerCase().startsWith(minusculaBusqueda)
      );
    default:
      return ventas;
  }
};

// Funcion para filtrar ventas por fecha
const filtrarVentasPorFecha = (ventas, fechaInicio, fechaFinal) => {
  // Si no hay fechas seleccionadas regresa todas las ventas
  if (!fechaInicio || !fechaFinal) return [...ventas];

  // Utilizar la funcion estaEntreFechas para filtrar cada fecha
  return ventas.filter((venta) =>
    estaEntreFechas(venta.FECHA.split("T")[0], fechaInicio, fechaFinal)
  );
};

const estaEntreFechas = (fechaStr, fechaInicioStr, fechaFinalStr) => {
  const fecha = new Date(fechaStr);
  const fechaInicio = new Date(fechaInicioStr);
  const fechaFinal = new Date(fechaFinalStr);

  // Probar si la fecha esta en el rango de fechas
  return fecha >= fechaInicio && fecha <= fechaFinal;
};

// Funcion para filtrar ventas por hora
const filtrarVentasPorHora = (ventas, horaInicio, horaFinal) => {
  // Si no hay horas seleccionadas regresa todas las ventas
  if (!horaInicio || !horaFinal) return [...ventas];

  // Regresar las ventas con hora entre el rango de horas
  return ventas.filter(
    (venta) =>
      horaInicio <= venta.FECHA.split("T")[1].split(".")[0] &&
      venta.FECHA.split("T")[1].split(".")[0] <= horaFinal
  );
};

// Función para ordenar las ventas
const ordenarVentas = (ventas, ordenarPor) => {
  // Crear copia de ventas
  const ventasOrdenadas = [...ventas];
  switch (ordenarPor) {
    // Ordenar tabla de ventas por nombre de cliente
    case 1:
      return ventasOrdenadas.sort((a, b) => {
        if (a.cliente_nombre > b.cliente_nombre) return 1;
        if (a.cliente_nombre < b.cliente_nombre) return -1;
        return 0;
      });

    // Ordenar tabla de ventas por fecha
    case 2:
      return ventasOrdenadas.sort((a, b) => {
        const [anioA, mesA, diaA] = a.FECHA.split("T")[0].split("-");
        const fechaA = new Date(+anioA, +mesA - 1, +diaA);
        const [anioB, mesB, diaB] = b.FECHA.split("T")[0].split("-");
        const fechaB = new Date(+anioB, +mesB - 1, +diaB);
        if (fechaA > fechaB) return 1;
        if (fechaA < fechaB) return -1;
        return 0;
      });

    // Ordenar tabla de ventas por hora
    case 3:
      return ventasOrdenadas.sort((a, b) => {
        if (
          a.FECHA.split("T")[1].split(".")[0] >
          b.FECHA.split("T")[1].split(".")[0]
        )
          return 1;
        if (
          a.FECHA.split("T")[1].split(".")[0] <
          b.FECHA.split("T")[1].split(".")[0]
        )
          return -1;
        return 0;
      });

    // Ordenar tabla de ventas por nombre de repartidor
    case 4:
      return ventasOrdenadas.sort((a, b) => {
        if (a.VENDEDOR > b.VENDEDOR) return 1;
        if (a.VENDEDOR < b.VENDEDOR) return -1;
        return 0;
      });
    default:
      return ventasOrdenadas;
  }
};

// Funcion para crear estado estadoVentanaEmergente y su API
const useVentanaEmergente = (setVentaDetalles) => {
  // Crear estado
  const [estadoVentanaEmergente, setEstadoVentanaEmergente] = useState(false);

  // Funcion para cambiar detalles de venta y mostrar los detalles de venta
  const mostrarDetallesVenta = (detallesVenta) => {
    // Cambiar detallesVenta
    setVentaDetalles(detallesVenta);
    // Cambiar para mostrar ventana emergente
    setEstadoVentanaEmergente(true);
  };

  return {
    estadoVentanaEmergente,
    setEstadoVentanaEmergente,
    mostrarDetallesVenta,
  };
};

export default VentasLista;

function modifyJSON(data) {
  let newData = [];

  // Iterate through each object in the original array
  for (let i = 0; i < data.length; i++) {
    let obj = {};

    // Iterate through each property in the object
    for (let prop in data[i]) {
      // Check if the property is one that needs to be modified
      if (prop === "cliente_nombre") {
        // 2. Change the column name "cliente_nombre" to "CLIENTE"
        obj["CLIENTE"] = data[i][prop];
      } else if (prop === "FECHA") {
        // 3. Create two new columns from the column with the column name "FECHA"
        // Split the date and time into separate variables
        let [date, time] = data[i][prop].split("T");

        // Format the date as "YYYY/MM/DD"
        let formattedDate = date.split("-").reverse().join("/");

        // Create the new columns
        obj["FECHA"] = formattedDate;
        obj["HORA"] = time.slice(0, 5);
      } else if (prop === "TIPO_VENTA") {
        // 4. Change the column name "TIPO_VENTA" to "TIPO DE VENTA"
        obj["TIPO DE VENTA"] = data[i][prop];
      } else if (prop === "TIPO_PAGO") {
        // 5. Change the name "TIPO_PAGO" to "TIPO DE PAGO"
        obj["TIPO DE PAGO"] = data[i][prop];
      } else if (prop !== "productos_venta" && prop !== "CLIENTE") {
        // Add all other properties to the new object, except "productos_venta" and "CLIENTE"
        obj[prop] = data[i][prop];
      }
    }

    // Add the modified object to the new array
    newData.push(obj);
  }

  return newData;
}
