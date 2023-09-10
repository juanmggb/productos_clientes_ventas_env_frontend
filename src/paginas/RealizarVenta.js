import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import FormularioProductoVenta from "../componentes/RealizarVenta/FormularioProductoVenta";
import Loader from "../componentes/general/Loader";
import Mensaje from "../componentes/general/Mensaje";
// import ImprimirTicket from "../componentes/ImprimirTicket";
import { RESET_VENTA_REGISTRAR } from "../constantes/ventaConstantes";
import { useCliente, useProductosVenta } from "./utilis/RealizarVenta.utilis";
import FormularioVenta from "../componentes/RealizarVenta/FormularioVenta";
import {
  StyledBotonPanel,
  StyledCol,
  StyledContainer,
  StyledContenidoPrincipal,
  StyledGridContainer,
  StyledPanelControl,
  StyledRow,
  StyledTitulo,
} from "./styles/RealizarVenta.styles";
import VentanaMostrarVenta from "../componentes/RealizarVenta/VentanaMostrarVenta";

const RealizarVenta = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();

  // Funcion para navegar en la aplicacion
  const navigate = useNavigate();

  // Obtener lista de clientes del Redux store
  const clienteVentaLista = useSelector((state) => state.clienteVentaLista);
  const { loading, clientesVenta, error } = clienteVentaLista;

  // Obtener estado registrar venta del Redux store
  const ventaRegistrar = useSelector((state) => state.ventaRegistrar);
  const {
    loading: loadingRegistrar,
    venta: ventaStorage,
    error: errorRegistrar,
  } = ventaRegistrar;

  // Hooks para mostrar resultados de la venta
  const [mostrarVenta, setMostrarVenta] = useState(false);
  // const [imprimirTicket, setImprimirTicket] = useState(false);
  const [venta, setVenta] = useState({});

  // Hook para mostrar y ocultar panel de control en pantallas pequenas
  const [mostrarPanel, setMostrarPanel] = useState(true);

  // Hook personalizado para manejar el estado del cliente y su lista de precios
  const {
    cliente,
    productosCliente,
    setProductosCliente,
    manejarCambiarCliente,
  } = useCliente(clientesVenta, dispatch, navigate);

  // Hook personalizado para manejar el estado de los productos de venta
  const {
    productosVenta,
    deshabilitarVenta, // la venta se deshabilita en funcion del estado de los productos de venta, por eso esta aqui
    setProductosVenta,
    manejarSeleccionarProducto,
    manejarCambioCantidad, // cantidad del producto de venta
    manejarConfirmarProducto,
    manejarCancelarProducto,
  } = useProductosVenta(productosCliente, setProductosCliente);

  // useEffect para mostrar las alertas de la venta
  useEffect(() => {
    if (loadingRegistrar) {
      toast.loading("Realizando venta");
    }

    if (ventaStorage) {
      toast.remove();
      toast.success("Venta realizada");
      // Reset venta registrar para no ejecutar este bloque de codigo cada vez que se entra a realizar venta
      dispatch({ type: RESET_VENTA_REGISTRAR });
      navigate("/ventas");

      // setImprimirTicket(true);
    }

    if (errorRegistrar) {
      toast.dismiss();
      toast.error("Error al realizar venta");
    }
  }, [ventaStorage, errorRegistrar, loadingRegistrar, dispatch, navigate]);

  // Renderizar loading si se estan cargando los clientes
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

  // Renderizar mensaje de error si el servidor regresa un error al pedir la lista de clientes
  if (error)
    return (
      <StyledContainer fluid>
        <StyledRow>
          <StyledCol>
            <Mensaje variant="danger">
              Hubo un error al cargar la lista de clientes
            </Mensaje>
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    );

  return (
    clientesVenta && (
      <>
        <StyledGridContainer>
          <StyledBotonPanel onClick={() => setMostrarPanel((state) => !state)} state={mostrarPanel}>
             <i className="fa-solid fa-arrow-right"></i>
          </StyledBotonPanel>
          <StyledTitulo>Realizar Venta</StyledTitulo>
          {/* Panel de control para registrar datos de venta */}
          <StyledPanelControl mostrarPanel={mostrarPanel}>
            <FormularioVenta
              cliente={cliente}
              manejarCambiarCliente={manejarCambiarCliente}
              productosVenta={productosVenta}
              setProductosVenta={setProductosVenta}
              clientes={clientesVenta}
              manejarSeleccionarProducto={manejarSeleccionarProducto}
              productosCliente={productosCliente}
              setVenta={setVenta}
              setMostrarVenta={setMostrarVenta}
              deshabilitarVenta={deshabilitarVenta}
            />
          </StyledPanelControl>
          {/* Contenido principal */}
          <StyledContenidoPrincipal>
            <FormularioProductoVenta
              productos={productosVenta}
              manejarCambioCantidad={manejarCambioCantidad}
              manejarConfirmarProducto={manejarConfirmarProducto}
              manejarCancelarProducto={manejarCancelarProducto}
            />
          </StyledContenidoPrincipal>
        </StyledGridContainer>

        {/* Mostrar venta */}
        {mostrarVenta && (
          <VentanaMostrarVenta
            venta={venta}
            mostrarVenta={mostrarVenta}
            setMostrarVenta={setMostrarVenta}
            productosVenta={productosVenta}
            cliente={cliente}
          />
        )}

        {/* Mostrar ticket */}
        {/* <ImprimirTicket
          datosVenta={venta}
          DESCUENTO={descuento}
          imprimirTicket={imprimirTicket}
          setImprimirTicket={setImprimirTicket}
        /> */}
      </>
    )
  );
};

export default RealizarVenta;
