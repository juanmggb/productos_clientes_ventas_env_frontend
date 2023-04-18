import React from "react";
import { Button, Modal } from "react-bootstrap";

const VentanaMostrarVenta = ({
  venta,
  mostrarVenta,
  manejarCerrarVentana,
  descuento,
}) => {
  return (
    venta &&
    venta.productos_venta && (
      <Modal show={mostrarVenta} onHide={manejarCerrarVentana}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de Venta #{venta.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "black" }}>
          <p>
            <strong>VENDEDOR:</strong> {venta.VENDEDOR}
          </p>
          <p>
            <strong>CLIENTE:</strong> {venta.cliente_nombre}
          </p>
          <p>
            <strong>FECHA:</strong> {formatearFecha(venta.FECHA)}
          </p>
          <p>
            <strong>MONTO SIN DESCUENTO:</strong> ${" "}
            {(venta.MONTO / (1 - descuento / 100)).toFixed(2)}
          </p>
          <p>
            <strong>DESCUENTO:</strong> {venta.DESCUENTO}%
          </p>
          <p>
            <strong>MONTO CON DESCUENTO:</strong> $ {venta.MONTO.toFixed(2)}
          </p>
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
            {venta.productos_venta.map((pv) => (
              <li key={pv.id}>
                {pv.producto_nombre} x {pv.CANTIDAD_VENTA} = ${" "}
                {pv.PRECIO_VENTA * (1 - descuento / 100).toFixed(2)}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              manejarCerrarVentana();
            }}
            style={{
              backgroundColor: "rgb(20,50,100)",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
};

function formatearFecha(fecha) {
  const date = new Date(fecha);
  return date.toLocaleString();
}

export default VentanaMostrarVenta;
