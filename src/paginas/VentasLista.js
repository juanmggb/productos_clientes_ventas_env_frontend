import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../componentes/general/Loader";
import { RESET_VENTA_DETALLES } from "../constantes/ventaConstantes";
import FiltroListaVentas from "../componentes/VentasLista/FiltroListaVentas";
import VentanaMostrarVenta from "../componentes/VentasLista/VentanaMostrarVenta";
import VentanaMostrarResumenVentas from "../componentes/VentasLista/VentanaMostrarResumenVentas";

import Mensaje from "../componentes/general/Mensaje";
import TablaVentas from "../componentes/VentasLista/TablaVentas";
import {
  StyledBoton,
  StyledBotonPanel,
  StyledCol,
  StyledContainer,
  StyledContenidoPrincipal,
  StyledGridContainer,
  StyledPanelControl,
  StyledRow,
  StyledTitulo,
} from "./styles/VentasLista.styles";
import {
  filtrarVentas,
  manejarExportarVentas,
  useFiltros,
  useMostrarDetallesVenta,
} from "./utilis/VentasLista.utilis";

const VentasLista = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();
  // Funcion para nevagar en la aplicacion
  const navigate = useNavigate();
  // Obtener el estado desde el Redux store
  const ventaLista = useSelector((state) => state.ventaLista);
  const { loading, ventas, error } = ventaLista;

  const manejarVentaDetalles = (id) => {
    // Redireccionar a la pagina de la venta
    dispatch({ type: RESET_VENTA_DETALLES });
    navigate(`/ventas/${id}`);
  };

  // Custom Hook para filtrar y ordenar ventas
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

  // Hook para mostrar y ocultar panel de control en pantallas pequenas
  const [mostrarPanel, setMostrarPanel] = useState(true);
  // Hook para mostrar el resumen de venta
  const [mostrarResumen, setMostrarResumen] = useState(false);

  // Custom hook para mostrar los detalles de la venta
  const {
    mostrarVenta,
    venta,
    manejarCerrarVentana,
    manejarMostrarDetallesVenta,
  } = useMostrarDetallesVenta(ventas, dispatch);

  // Filtrar y ordenar ventas
  let ventasFiltradas = ventas
    ? filtrarVentas(
        ventas,
        filtrarPor,
        buscar,
        fechaInicio,
        fechaFinal,
        horaInicio,
        horaFinal,
        ordenarPor
      )
    : [];

  if (loading)
    return (
      <StyledContainer fluid>
        <StyledRow>
          <StyledCol>
            <Loader />
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    );

  if (error)
    return (
      <StyledContainer fluid>
        <StyledRow>
          <StyledCol>
            <Mensaje variant="danger">
              Hubo un problema al cargar la lista de ventas
            </Mensaje>
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    );

  return (
    ventas && (
      <>
        <StyledGridContainer>
          <StyledBotonPanel onClick={() => setMostrarPanel((state) => !state)}>
            {mostrarPanel ? (
              <i className="fa-solid fa-arrow-left"></i>
            ) : (
              <i className="fa-solid fa-arrow-right"></i>
            )}
          </StyledBotonPanel>
          <StyledTitulo>Ventas</StyledTitulo>
          {/* Panel de control para filtrar y ordenar ventas */}
          <StyledPanelControl mostrarPanel={mostrarPanel}>
            <FiltroListaVentas manejarFiltros={manejarFiltros} />

            {/* Exportar ventas */}
            <StyledBoton
              type="submit"
              onClick={() => manejarExportarVentas(ventasFiltradas)}
            >
              Descargar tabla de ventas
            </StyledBoton>

            {/* Mostrar resumen de ventas */}
            <StyledBoton onClick={setMostrarResumen} type="submit">
              Mostrar resumen de ventas
            </StyledBoton>
          </StyledPanelControl>

          {/* Tabla de ventas */}
          <StyledContenidoPrincipal>
            <TablaVentas
              ventasFiltradas={ventasFiltradas}
              manejarMostrarDetallesVenta={manejarMostrarDetallesVenta}
              manejarVentaDetalles={manejarVentaDetalles}
            ></TablaVentas>
          </StyledContenidoPrincipal>
        </StyledGridContainer>

        {/* Mostrar venta con detalles de la venta */}
        <VentanaMostrarVenta
          mostrarVenta={mostrarVenta}
          manejarCerrarVentana={manejarCerrarVentana}
          venta={venta}
        />

        {/* Mostrar resumen de ventas */}
        <VentanaMostrarResumenVentas
          mostrarResumen={mostrarResumen}
          manejarCerrarVentana={() => setMostrarResumen(false)}
          ventas={ventasFiltradas}
        />
      </>
    )
  );
};

export default VentasLista;
