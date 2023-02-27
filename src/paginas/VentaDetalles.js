import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { actualizarVenta, obtenerVentaDetalles } from "../actions/ventaActions";
import Loader from "../componentes/Loader";
import Mensaje from "../componentes/Mensaje";
import VentanaMostrarVentaActualizar from "../componentes/VentanaMostrarVentaActualizar";
import {
  RESET_VENTA_ACTUALIZAR,
  RESET_VENTA_DETALLES,
} from "../constantes/ventaConstantes";

const VentaDetalles = ({ match }) => {
  // Obtener el id de la venta
  const params = useParams(match);
  const ventaId = params.id;

  // Funcion para disparar las acciones
  const dispatch = useDispatch();

  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Obtener el estado desde el Redux store
  const ventaDetalles = useSelector((state) => state.ventaDetalles);
  const { loading, venta, error } = ventaDetalles;

  // Obtener el estado desde el Redux store
  const ventaActualizar = useSelector((state) => state.ventaActualizar);
  const {
    loading: loadingActualizar,
    reporte: reporteActualizar,
    error: errorActualizar,
  } = ventaActualizar;

  const [status, setStatus] = useState("");

  const [mostrarReporte, setMostrarReporte] = useState(false);

  useEffect(() => {
    // Si la actualizacion fue correcta, reset productoActualizar y redireccionar a la pagina de productos
    if (reporteActualizar) {
      setMostrarReporte(true);
    }

    // Si no hay venta o la venta no es la que seleccione, disparar la accion de
    // obtener venta
    if (!venta || venta.id !== Number(ventaId)) {
      dispatch(obtenerVentaDetalles(ventaId));
    } else if (venta.STATUS === "CANCELADO" || venta.STATUS === "REALIZADO") {
      alert("No es posible modificar el STATUS de la venta");
      navigate("/ventas");
    } else {
      setStatus(venta.STATUS);
    }
  }, [dispatch, venta, ventaId, reporteActualizar, navigate]);

  const manejarActualizarVenta = (e) => {
    e.preventDefault();
    // Disparar la accion de actualizar producto
    dispatch(
      actualizarVenta({
        // El id es para el endpoint, no como informacion de actualizacion
        id: ventaId,
        STATUS: status,
      })
    );
  };

  const manejarCerrarVentana = () => {
    setMostrarReporte(false);
    dispatch({ type: RESET_VENTA_ACTUALIZAR });
    navigate("/ventas");
  };

  const manejarRegresar = () => {
    // Redireccionar a la pagina de ventas
    dispatch({ type: RESET_VENTA_DETALLES });
    navigate("/ventas");
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Mensaje variant="danger">{error}</Mensaje>
  ) : (
    venta && (
      <div style={{ padding: "25px", width: "50%" }}>
        {loadingActualizar && <Loader />}
        {errorActualizar && (
          <Mensaje variant="danger">{errorActualizar}</Mensaje>
        )}
        {/* Esta es la parte que cambia en las paginas */}
        <h1>Venta #{venta.id}</h1>
        <Button variant="primary" onClick={manejarRegresar}>
          Regresar
        </Button>
        <Form onSubmit={manejarActualizarVenta}>
          <Form.Group controlId="status">
            <Form.Label>STATUS</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="PENDIENTE">Pendiente</option>
              <option value="REALIZADO">Realizado</option>
              <option value="CANCELADO">Cancelado</option>
            </Form.Control>
          </Form.Group>

          <Button type="submit">Actualizar venta</Button>
        </Form>

        {/* Mostrar venta */}
        {mostrarReporte && (
          <VentanaMostrarVentaActualizar
            reporteActualizar={reporteActualizar}
            mostrarReporte={mostrarReporte}
            manejarCerrarVentana={manejarCerrarVentana}
          />
        )}
      </div>
    )
  );
};

export default VentaDetalles;
