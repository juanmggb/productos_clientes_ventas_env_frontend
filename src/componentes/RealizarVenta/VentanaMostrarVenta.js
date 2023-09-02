import React, { useState } from "react";
import { Col, Form, Modal } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { registrarVenta } from "../../actions/ventaActions";
import {
  StyledButtonCancelar,
  StyledButtonConfirmar,
  StyledCol,
  StyledRow,
} from "./styles/VentanaMostrarVenta.styles";

const VentanaMostrarVenta = ({
  venta,
  mostrarVenta,
  setMostrarVenta,
  productosVenta,
  cliente,
}) => {
  // Funcion para disparar acciones

  const dispatch = useDispatch();

  // Obtener fecha y hora de la venta
  const { date, hour } = getCurrentDate();

  // Obtener monto sin descuento de la venta
  const monto = venta.MONTO;

  // Obtener descuento de lA VENTA
  const descuento = venta.DESCUENTO;

  // Hook para calcular y mostrar el cambio de la venta
  const [cambio, setCambio] = useState(0);

  // Funcion para realizar la venta
  const manejarRealizarVenta = (e) => {
    e.preventDefault();

    if (cambio < 0) {
      toast.error("El cambio debe ser mayor o igual a cero");
    } else {
      // Disparar la accion para registrar la venta y cerrar la ventana de la venta
      dispatch(registrarVenta(venta));
      setMostrarVenta(false);
    }
  };

  return (
    venta && (
      <Modal centered show={mostrarVenta} onHide={() => setMostrarVenta(false)}>
        <Modal.Header>
          <h4>Detalles de Venta</h4>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>VENDEDOR:</strong> {venta.VENDEDOR}
          </p>
          <p>
            <strong>CLIENTE:</strong> {cliente.NOMBRE}
          </p>
          <p>
            <strong>FECHA:</strong> {date}
          </p>
          <p>
            <strong>HORA:</strong> {hour}
          </p>
          <p>
            <strong>MONTO SIN DESCUENTO:</strong> ${" "}
            {(venta.MONTO / (1 - descuento / 100)).toFixed(2)}
          </p>
          <p>
            <strong>DESCUENTO:</strong> {descuento}%
          </p>
          <p>
            <strong>MONTO CON DESCUENTO:</strong> $ {monto.toFixed(2)}
          </p>

          <StyledRow>
            <StyledCol xs={4}>
              <Form onSubmit={manejarRealizarVenta}>
                <Form.Group controlId="recibido">
                  <Form.Control
                    required={monto > 0}
                    type="number"
                    placeholder="Recibido"
                    onChange={(e) => setCambio(e.target.value - monto)}
                  ></Form.Control>
                </Form.Group>
                <StyledButtonConfirmar type="submit">
                  Confirmar
                </StyledButtonConfirmar>
              </Form>
            </StyledCol>
            <Col xs={6}>
              <p>Cambio: {cambio.toFixed(2)} $</p>
            </Col>
          </StyledRow>
          <p>
            <strong>TIPO DE VENTA:</strong> {venta.TIPO_VENTA}
          </p>
          <p>
            <strong>TIPO DE PAGO:</strong> {venta.TIPO_PAGO}
          </p>
          <p>
            <strong>STATUS:</strong> {venta.STATUS}
          </p>
          <p>
            <strong>OBSERVACIONES:</strong> {venta.OBSERVACIONES}
          </p>
          <p>
            <strong>PRODUCTOS DE LA VENTA:</strong>
          </p>
          <ul>
            {productosVenta.map((pv) => (
              <li key={pv.id}>
                {pv.producto_nombre} x {pv.cantidadVenta} = ${" "}
                {pv.PRECIO * (1 - descuento / 100).toFixed(2)}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <StyledButtonCancelar
            variant="danger"
            onClick={() => setMostrarVenta(false)}
          >
            Cancelar
          </StyledButtonCancelar>
        </Modal.Footer>
      </Modal>
    )
  );
};

const getCurrentDate = () => {
  const currentDate = new Date();

  const date = currentDate.toLocaleDateString();
  const hour = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { date, hour };
};

export default VentanaMostrarVenta;
