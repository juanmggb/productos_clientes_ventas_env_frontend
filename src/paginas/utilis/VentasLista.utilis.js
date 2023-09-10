import { useEffect, useState } from "react";
import { pedirVentasLista } from "../../actions/ventaActions";

// Función para crear estado filter y su API
export const useFiltros = () => {
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

// Funcion para filtrar ventas por campo seleccionado
const filtrarVentasPorCampo = (ventas, campo, buscar) => {
  // Si no hay nombre para buscar, regresa todos las ventas
  // Regresamos una copia para tener una función pura
  if (!buscar) {
    return [...ventas];
  }

  // Pasa el valor de buscar a minúsculas
  const minusculaBusqueda = buscar.toLowerCase();

  // Filtra ventas por el campo seleccionado y el valor de búsqueda
  switch (campo) {
    case 0:
      // Filtrar ventas por nombre del cliente
      return ventas.filter((venta) => {
        return (
          venta.cliente_nombre &&
          venta.cliente_nombre.toLowerCase().startsWith(minusculaBusqueda)
        );
      });
    case 1:
      // Filtrar ventas por tipo de venta
      return ventas.filter((venta) =>
        venta.TIPO_VENTA.toLowerCase().startsWith(minusculaBusqueda)
      );
    case 2:
      // Filtrar ventas por tipo de pago
      return ventas.filter((venta) =>
        venta.TIPO_PAGO.toLowerCase().startsWith(minusculaBusqueda)
      );
    case 3:
      // Filtrar ventas por status
      return ventas.filter((venta) =>
        venta.STATUS.toLowerCase().startsWith(minusculaBusqueda)
      );
    case 4:
      // Filtrar ventas por nombre del repartidor
      return ventas.filter((venta) =>
        venta.VENDEDOR.toLowerCase().startsWith(minusculaBusqueda)
      );
    default:
      return ventas;
  }
};

// Funcion para filtrar ventas por fecha
const filtrarVentasPorFecha = (ventas, fechaInicio, fechaFinal) => {
  // Si no hay fechas seleccionadas, regresa todas las ventas
  if (!fechaInicio || !fechaFinal) {
    return [...ventas];
  }

  // Utilizar la funcion estaEntreFechas para filtrar cada venta por fecha
  return ventas.filter((venta) =>
    estaEntreFechas(venta.FECHA.split("T")[0], fechaInicio, fechaFinal)
  );
};

const estaEntreFechas = (fechaStr, fechaInicioStr, fechaFinalStr) => {
  // Convertir las fechas de texto a objetos Date
  const fecha = new Date(fechaStr);
  const fechaInicio = new Date(fechaInicioStr);
  const fechaFinal = new Date(fechaFinalStr);

  // Probar si la fecha está en el rango de fechas
  return fecha >= fechaInicio && fecha <= fechaFinal;
};

// Funcion para filtrar ventas por hora
const filtrarVentasPorHora = (ventas, horaInicio, horaFinal) => {
  // Si no hay horas seleccionadas, regresa todas las ventas
  if (!horaInicio || !horaFinal) {
    return [...ventas];
  }

  // Filtrar y regresar las ventas con hora dentro del rango
  return ventas.filter((venta) => {
    const horaVenta = venta.FECHA.split("T")[1].split(".")[0];
    return horaInicio <= horaVenta && horaVenta <= horaFinal;
  });
};

// Función para ordenar las ventas
const ordenarVentas = (ventas, ordenarPor) => {
  // Crear una copia de las ventas para mantener el arreglo original inmutable
  const ventasOrdenadas = [...ventas];

  switch (ordenarPor) {
    case 1:
      // Ordenar tabla de ventas por nombre de cliente
      return ventasOrdenadas.sort((a, b) => {
        if (!a.cliente_nombre && b.cliente_nombre) return 1;
        if (a.cliente_nombre && !b.cliente_nombre) return -1;
        if (a.cliente_nombre > b.cliente_nombre) return 1;
        if (a.cliente_nombre < b.cliente_nombre) return -1;
        return 0;
      });

    case 2:
      // Ordenar tabla de ventas por fecha
      return ventasOrdenadas.sort((a, b) => {
        const [anioA, mesA, diaA] = a.FECHA.split("T")[0].split("-");
        const fechaA = new Date(+anioA, +mesA - 1, +diaA);
        const [anioB, mesB, diaB] = b.FECHA.split("T")[0].split("-");
        const fechaB = new Date(+anioB, +mesB - 1, +diaB);
        if (fechaA > fechaB) return 1;
        if (fechaA < fechaB) return -1;
        return 0;
      });

    case 3:
      // Ordenar tabla de ventas por hora
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

    case 4:
      // Ordenar tabla de ventas por nombre de repartidor
      return ventasOrdenadas.sort((a, b) => {
        if (a.VENDEDOR > b.VENDEDOR) return 1;
        if (a.VENDEDOR < b.VENDEDOR) return -1;
        return 0;
      });

    default:
      // Si no se especifica un criterio de ordenamiento válido, regresar el arreglo original
      return ventasOrdenadas;
  }
};

export const filtrarVentas = (
  ventas,
  filtrarPor,
  buscar,
  fechaInicio,
  fechaFinal,
  horaInicio,
  horaFinal,
  ordenarPor
) => {
  let ventasFiltradas = [...ventas].reverse();

  ventasFiltradas = filtrarVentasPorCampo(ventasFiltradas, filtrarPor, buscar);
  ventasFiltradas = filtrarVentasPorFecha(
    ventasFiltradas,
    fechaInicio,
    fechaFinal
  );
  ventasFiltradas = filtrarVentasPorHora(
    ventasFiltradas,
    horaInicio,
    horaFinal
  );
  ventasFiltradas = ordenarVentas(ventasFiltradas, ordenarPor);
  return ventasFiltradas;
};

// Function to create the state 'estadoVentanaEmergente' and its API
export const useMostrarDetallesVenta = (ventas, dispatch, search) => {
  const [venta, setVenta] = useState({});

  const [mostrarVenta, setMostrarVenta] = useState(false);

  useEffect(() => {
    // Si no hay ventas, disparar la accion de pedir ventas
    if (!ventas) {
      dispatch(pedirVentasLista(search));
    }
  }, [dispatch, ventas, search]);

  useEffect(() => {
    // Si el parametros search con la informacion de filtrado se modifica, volver a pedir las ventas
    // Si la pagina cambioa, volver a pedir las ventas
    dispatch(pedirVentasLista(search));
  }, [search, dispatch]);

  const manejarCerrarVentana = () => {
    setMostrarVenta(false);
  };

  const manejarMostrarDetallesVenta = (ventaId) => {
    const ventaSeleccionada = { ...ventas.find((c) => c.id === ventaId) };

    setVenta({
      id: ventaSeleccionada.id,
      productos: ventaSeleccionada.productos_venta,
      descuento: ventaSeleccionada.DESCUENTO,
      total: ventaSeleccionada.MONTO,
      status: ventaSeleccionada.STATUS,
      observacion: ventaSeleccionada.OBSERVACIONES,
      cliente: ventaSeleccionada.NOMBRE_CLIENTE,
      fecha: ventaSeleccionada.FECHA,
      vendedor: ventaSeleccionada.VENDEDOR,
      tipo: ventaSeleccionada.TIPO_VENTA,
      pago: ventaSeleccionada.TIPO_PAGO,
    });
    setMostrarVenta(true);
  };

  return {
    mostrarVenta,
    venta,
    manejarCerrarVentana,
    manejarMostrarDetallesVenta,
  };
};

export const modifyJSON = (data) => {
  let newData = [];

  // Iterate through each object in the original array
  for (let i = 0; i < data.length; i++) {
    let obj = {};

    // Iterate through each property in the object
    for (let prop in data[i]) {
      // Check if the property is one that needs to be modified

      // 1. Change the column name "cliente_nombre" to "CLIENTE"
      if (prop === "cliente_nombre") {
        obj["CLIENTE"] = data[i][prop];
      }
      // 2. Create two new columns from the column with the column name "FECHA"
      else if (prop === "FECHA") {
        // Split the date and time into separate variables
        let [date, time] = data[i][prop].split("T");

        // Format the date as "YYYY/MM/DD"
        let formattedDate = date.split("-").reverse().join("/");

        // Create the new columns
        obj["FECHA"] = formattedDate;
        obj["HORA"] = time.slice(0, 5);
      }
      // 3. Change the column name "TIPO_VENTA" to "TIPO DE VENTA"
      else if (prop === "TIPO_VENTA") {
        obj["TIPO DE VENTA"] = data[i][prop];
      }
      // 4. Change the name "TIPO_PAGO" to "TIPO DE PAGO"
      else if (prop === "TIPO_PAGO") {
        obj["TIPO DE PAGO"] = data[i][prop];
      }
      // Add all other properties to the new object, except "productos_venta" and "CLIENTE"
      else if (prop !== "productos_venta" && prop !== "CLIENTE") {
        obj[prop] = data[i][prop];
      }
    }

    // Add the modified object to the new array
    newData.push(obj);
  }

  return newData;
};
