import React, { useEffect, useState } from "react";
import { Button, Table, Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { borrarCliente, pedirClientesLista } from "../actions/clienteActions";
import {toast} from 'react-hot-toast'
import styled from "styled-components";
import Loader from "../componentes/Loader";
import { Icono } from '../styledComponents/alertaEliminar'
import VentanaMostrarCliente from "../componentes/VentanaMostrarCliente";
import {
  RESET_CLIENTE_BORRAR,
  RESET_CLIENTE_DETALLES,
} from "../constantes/clienteConstantes";
import { useMediaQuery } from "react-responsive";

// Estilos de la página principal
const Principal = styled.div`
  position: fixed;
  background: linear-gradient(
    rgb(54, 54, 82),
    15%,
    rgb(84, 106, 144),
    60%,
    rgb(68, 111, 151)
  );

  height: 90vh;
  width: 100vw;
  padding: 0px 10px;
  user-select: none;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  & div {
    font-size: 1.8em;
    height: 10vh;
    padding-top: 10px;
    color: white;
  }
  // Estilos para smarthphone
  @media (max-width: 480px) and (orientation: portrait) {
    height: 90svh;
    gap: 10px;

    & div {
    height: 10vsh;
    font-weight: bold;
    }
  }
`;

// Estilos de la tabla
const TableStyled = styled(Table)`

  & tbody {
    height: 75svh;
    display: block;

    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;

    color: white;
  }

  & thead, tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;/* even columns width , fix width of table too*/

    color: white;
  }

  & th{
    text-align: center;
    vertical-align: middle;
  }

  & td{
    text-align: center;
    vertical-align: middle;
  }
`;

const ClientesLista = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();
  // Funcion para nevagar en la aplicacion
  const navigate = useNavigate();
  // Obtener el estado desde el Redux store
  const clienteLista = useSelector((state) => state.clienteLista);
  const { loading, clientes, error } = clienteLista;

  // Obtener el estado desde el Redux sotore
  const clienteBorrar = useSelector((state) => state.clienteBorrar);
  const {
    loading: loadingBorrar,
    success: successBorrar,
    error: errorBorrar,
  } = clienteBorrar;

  const [mostrarCliente, setMostrarCliente] = useState(false);
  const [cliente, setCliente] = useState({});

  const isSmallViewport = useMediaQuery({ maxWidth: 768 });
  const shouldShow = !isSmallViewport;

  // useEffect para mostrar las alertas
  useEffect(() => {

  if (loadingBorrar) {
    toast.loading('Eliminando cliente');
  }

  if (successBorrar) {
    toast.dismiss();
    toast.success('Cliente eliminado exitosamente', {
      duration: 2000
    });
  }
  
  if (errorBorrar) {
    toast.dismiss();
    toast.error('Error al eliminar cliente', {
      duration: 2000
    });
  }

}, [successBorrar, errorBorrar, loadingBorrar])

  useEffect(() => {
    if (successBorrar) {
      dispatch({ type: RESET_CLIENTE_BORRAR });
    }

    // Si no hay clientes, disparar la accion de pedir clientes
    if (!clientes) {
      dispatch(pedirClientesLista());
    }
  }, [dispatch, clientes, successBorrar]);

  const manejarClienteDetalles = (id) => {
    // Redireccionar a la pagina del cliente
    dispatch({ type: RESET_CLIENTE_DETALLES });
    navigate(`/clientes/${id}`);
  };

  const manejarBorrarCliente = (e, id) => {
    e.stopPropagation();
    if (window.confirm("¿Está seguro de eliminar este cliente")) {
      dispatch(borrarCliente(id));
    } else {
      alert("Operación cancelada");
    }
  };

  const manejarCerrarVentana = () => {
    setMostrarCliente(false);
  };

  const manejarMostrarDetallesCliente = (clienteId) => {
    const clienteSeleccionado = { ...clientes.find((c) => c.id === clienteId) };
    setCliente(clienteSeleccionado);
    setMostrarCliente(true);
  };

  // Funcion para mostrar la alerta de eliminar producto
  const alertaBorrarCliente = (e, id) => {
    e.stopPropagation();
    toast((t) => (
      <Container>
        <Row>
            Estás seguro de eliminar el cliente?
        </Row>
        <Row>
        <Col style={{display: 'flex', justifyContent: 'center', padding: '5px'}}>
            <Icono
              onClick={() => {
                dispatch(borrarCliente(id))
                toast.dismiss(t.id);
                }}>
              <i class="fa-solid fa-circle-check fa-2xl" style={{color: '#67ce00'}}></i>
            </Icono>
          </Col>
          <Col style={{display: 'flex', justifyContent: 'center', padding: '5px'}}>
            <Icono
              onClick={() => {
                toast.dismiss(t.id);
                toast.error('Operacion cancelada', { duration: 2000});
            }}>
            <i class="fa-sharp fa-solid fa-circle-xmark fa-2xl" style={{color: '#ff0000'}}></i>
            </Icono>
          </Col>
        </Row>
      </Container>
    ), {duration: 5000})
  };

  return loading ? (
        <Principal><Loader /></Principal>
          ) : error ? ( 
            <Principal>
              {toast.error('Error en el servidor')}
            </Principal>
          ) : (
    clientes && (
      <Principal>
        {/* Esta el la parte que cambia en las paginas */}
        <div>Clientes</div>
        <TableStyled striped hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOMBRE</th>

              {shouldShow ? (
                <>
                  <th>CONTACTO</th>
                  <th>TELEFONO</th>
                  <th>CORREO</th>
                </>
              ) : null}

              <th>EDITAR</th>
              <th>BORRAR</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr
                key={c.id}
                onClick={() => manejarMostrarDetallesCliente(c.id)}
              >
                <td style = {{color: 'white'}}>{c.id}</td>
                <td style = {{color: 'white'}}>{c.NOMBRE}</td>

                {shouldShow ? (
                  <>
                    <td style = {{color: 'white'}}>{c.CONTACTO}</td>
                    <td style = {{color: 'white'}}>{c.TELEFONO}</td>
                    <td style = {{color: 'white'}}>{c.CORREO}</td>
                  </>
                ) : null}

                <td>
                  <Button onClick={() => manejarClienteDetalles(c.id)}>
                    <i className="fa-solid fa-circle-info"></i>
                  </Button>
                </td >
                <td>
                  <Button
                    variant="danger"
                    onClick={(e) => alertaBorrarCliente(e, c.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </TableStyled>

        {/* Mostrar venta */}
        {mostrarCliente && (
          <VentanaMostrarCliente
            cliente={cliente}
            mostrarCliente={mostrarCliente}
            manejarCerrarVentana={manejarCerrarVentana}
          />
        )}
      </Principal>
    )
  );
};

export default ClientesLista;
