import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../componentes/general/Loader";
import VentanaMostrarCliente from "../componentes/ClientesLista/VentanaMostrarCliente";
import {
  RESET_CLIENTE_BORRAR,
  RESET_CLIENTE_DETALLES,
} from "../constantes/clienteConstantes";
import ConfirmarBorrarObjeto from "../componentes/general/ConfirmarBorrarObjeto";
import Mensaje from "../componentes/general/Mensaje";
import FiltroListaClientes from "../componentes/ClientesLista/FiltroListaClientes";
import TablaClientes from "../componentes/ClientesLista/TablaClientes";
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
} from "./styles/ClientesLista.styles";
import { useFiltros } from "./utilis/VentasLista.utilis";
import {
  filtrarClientes,
  useMostrarDetallesCliente,
} from "./utilis/ClienteLista.utilis";
import PaginacionClientes from "../componentes/ClientesLista/PaginacionClientes";

// Estilos

const ClientesLista = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();
  // Funcion para nevagar en la aplicacion
  const navigate = useNavigate();
  // funcion para obtener el search param en el url
  const location = useLocation();
  const search = location.search;

  console.log(search);
  // Obtener lista de clientes desde el Redux store
  const clienteLista = useSelector((state) => state.clienteLista);
  const { loading, clientes, error, page, pages } = clienteLista;

  // Obtener el estado borrar cliente desde el Redux sotore
  const clienteBorrar = useSelector((state) => state.clienteBorrar);
  const {
    loading: loadingBorrar,
    success: successBorrar,
    error: errorBorrar,
  } = clienteBorrar;

  // Hook para mostrar y ocultar panel de control en pantallas pequenas
  const [mostrarPanel, setMostrarPanel] = useState(true);

  // Custom Hook para filtrar y ordenar los clientes
  // const { buscar, filtrarPor, ordenarPor, manejarFiltros } = useFiltros();

  // Custom Hook para mostrar ventana con detalles del cliente
  const {
    mostrarCliente,
    cliente,
    manejarCerrarVentana,
    manejarMostrarDetallesCliente,
  } = useMostrarDetallesCliente(dispatch, navigate, clientes, search);

  let clientesFiltrados = clientes;

  // useEffect para mostrar alertas de eliminar cliente
  useEffect(() => {
    if (loadingBorrar) {
      toast.loading("Eliminando cliente");
    }

    if (successBorrar) {
      toast.dismiss();
      toast.success("Cliente eliminado exitosamente", {
        duration: 2000,
      });
      // Reset cliente borrar para que no se ejecute este bloque de codigo cada vez que se entra a la lista de clientes
      dispatch({ type: RESET_CLIENTE_BORRAR });
    }

    if (errorBorrar) {
      toast.remove();
      toast.error("Error al eliminar cliente", {
        duration: 4000,
      });
    }
  }, [successBorrar, errorBorrar, loadingBorrar, dispatch]);

  // Funcion para redireccionar a la pagina del cliente
  const manejarClienteDetalles = (id) => {
    // Redireccionar a la pagina del cliente
    dispatch({ type: RESET_CLIENTE_DETALLES });
    navigate(`/clientes/${id}`);
  };

  // Funcion para eliminar cliente
  const manejarBorrarCliente = (e, id) => {
    e.stopPropagation();
    toast((t) => <ConfirmarBorrarObjeto id={id} t={t} objeto={"cliente"} />, {
      duration: 5000,
    });
  };

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

  // Renderizar tabla de clientes
  return (
    clientes && (
      <>
        <StyledGridContainer>
          <StyledBotonPanel onClick={() => setMostrarPanel((state) => !state)} state={mostrarPanel}>
             <i className="fa-solid fa-arrow-right"></i>
          </StyledBotonPanel>
          <StyledTitulo>Clientes</StyledTitulo>
          {/* Panel de control para filtrar y ordenar clientes */}
          <StyledPanelControl mostrarPanel={mostrarPanel}>
            <FiltroListaClientes />

            {/* Exportar clientes */}
            <StyledBoton
              type="submit"
              // onClick={() => manejarExportarVentas(ventasFiltradas)}
            >
              Descargar tabla de clientes
            </StyledBoton>

            {/* Mostrar resumen de clientes */}
            <StyledBoton type="submit">Mostrar resumen de clientes</StyledBoton>
          </StyledPanelControl>

          {/* Tabla de clientes */}
          <StyledContenidoPrincipal>
            <TablaClientes
              clientesFiltrados={clientesFiltrados}
              manejarMostrarDetallesCliente={manejarMostrarDetallesCliente}
              manejarClienteDetalles={manejarClienteDetalles}
              manejarBorrarCliente={manejarBorrarCliente}
            ></TablaClientes>
            <PaginacionClientes
              page={page}
              pages={pages}
              search={search}
              isAdmin={false}
            />
          </StyledContenidoPrincipal>
        </StyledGridContainer>
        {/* Mostrar venta con detalles del cliente */}
        {mostrarCliente && (
          <VentanaMostrarCliente
            cliente={cliente}
            mostrarCliente={mostrarCliente}
            manejarCerrarVentana={manejarCerrarVentana}
          />
        )}
      </>
    )
  );
};

export default ClientesLista;
