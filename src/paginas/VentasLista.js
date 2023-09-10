import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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
import { useMostrarDetallesVenta } from "./utilis/VentasLista.utilis";
import PaginacionVentas from "../componentes/VentasLista/PaginacionVentas";
import { pedirVentasReporteLista } from "../actions/ventaActions";

const VentasLista = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();
  // Funcion para nevagar en la aplicacion
  const navigate = useNavigate();
  // Function para obtener el search param en el url
  const location = useLocation();
  const search = location.search;

  // Obtener el estado desde el Redux store
  const ventaLista = useSelector((state) => state.ventaLista);
  const { loading, ventas, error, page, pages } = ventaLista;

  const manejarVentaDetalles = (id) => {
    // Redireccionar a la pagina de la venta
    dispatch({ type: RESET_VENTA_DETALLES });
    navigate(`/ventas/${id}`);
  };

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
  } = useMostrarDetallesVenta(ventas, dispatch, search);

  const manejarExportarVentas = () => {
    dispatch(pedirVentasReporteLista(search));
  };

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
          <StyledBotonPanel onClick={() => setMostrarPanel((state) => !state)} state={mostrarPanel}>
            <i className="fa-solid fa-arrow-right"/>
          </StyledBotonPanel>
          <StyledTitulo>Ventas</StyledTitulo>
          {/* Panel de control para filtrar y ordenar ventas */}
          <StyledPanelControl mostrarPanel={mostrarPanel}>
            {/* <FiltroListaVentas manejarFiltros={manejarFiltros} /> */}
            <FiltroListaVentas />

            {/* Exportar ventas */}
            <StyledBoton
              type="submit"
              onClick={() => manejarExportarVentas(ventas)}
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
              ventas={ventas}
              manejarMostrarDetallesVenta={manejarMostrarDetallesVenta}
              manejarVentaDetalles={manejarVentaDetalles}
            ></TablaVentas>

            <PaginacionVentas
              page={page}
              pages={pages}
              search={search}
              isAdmin={false}
            />
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
          ventas={ventas}
        />
      </>
    )
  );
};

export default VentasLista;
