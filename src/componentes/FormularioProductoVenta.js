import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const FormularioProductoVenta = ({
  producto,
  manejarCambioCantidad,
  manejarConfirmarProducto,
  manejarCancelarProducto,
}) => {
  return (
    <Row>
      <p>
        ID: {producto.id} | NOMBRE: {producto.producto_nombre} | PRECIO:
        {producto.PRECIO} | CANTIDAD DISPONIBLE: {producto.producto_cantidad}
      </p>
      <Col md={3}>
        <Form.Group controlId={producto.id}>
          <Form.Control
            disabled={producto.confirmado}
            type="number"
            value={producto.cantidadVenta}
            onChange={(e) =>
              manejarCambioCantidad(Number(e.target.value), producto.id)
            }
          ></Form.Control>
        </Form.Group>
      </Col>
      <Col md={3}>
        <Button
          disabled={producto.confirmado}
          onClick={() => manejarConfirmarProducto(producto.id)}
        >
          Confirmar
        </Button>
      </Col>
      <Col md={3}>
        <Button
          disabled={!producto.confirmado}
          onClick={() => manejarConfirmarProducto(producto.id)}
        >
          Modificar
        </Button>
      </Col>
      <Col md={3}>
        <Button onClick={() => manejarCancelarProducto(producto.id)}>
          Cancelar
        </Button>
      </Col>
    </Row>
  );
};

export default FormularioProductoVenta;
