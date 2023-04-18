import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { borrarCliente, pedirClientesLista } from "../actions/clienteActions";
import Loader from "../componentes/Loader";
import Mensaje from "../componentes/Mensaje";
import VentanaMostrarCliente from "../componentes/VentanaMostrarCliente";
import {
  RESET_CLIENTE_BORRAR,
  RESET_CLIENTE_DETALLES,
} from "../constantes/clienteConstantes";
import { useMediaQuery } from "react-responsive";

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

  useEffect(() => {
    if (successBorrar) {
      dispatch({ type: RESET_CLIENTE_BORRAR });
      alert("La eliminación fue exitosa");
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

  return loading ? (
    <Loader />
  ) : error ? (
    <Mensaje variant="danger">{error}</Mensaje>
  ) : (
    clientes && (
      <div style={{ padding: "25px" }}>
        {loadingBorrar && <Loader />}
        {errorBorrar && <Mensaje variant="danger">{errorBorrar}</Mensaje>}
        {/* Esta el la parte que cambia en las paginas */}
        <h1>Clientes</h1>
        <Table striped bordered hover>
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
                <td>{c.id}</td>
                <td>{c.NOMBRE}</td>

                {shouldShow ? (
                  <>
                    <td>{c.CONTACTO}</td>
                    <td>{c.TELEFONO}</td>
                    <td>{c.CORREO}</td>
                  </>
                ) : null}

                <td>
                  <Button onClick={() => manejarClienteDetalles(c.id)}>
                    <i className="fa-solid fa-circle-info"></i>
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={(e) => manejarBorrarCliente(e, c.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Mostrar venta */}
        {mostrarCliente && (
          <VentanaMostrarCliente
            cliente={cliente}
            mostrarCliente={mostrarCliente}
            manejarCerrarVentana={manejarCerrarVentana}
          />
        )}
      </div>
    )
  );
};

export default ClientesLista;
