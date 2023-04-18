import React from "react";
import { Button, Modal } from "react-bootstrap";

const VentanaMostrarCliente = ({
  cliente,
  mostrarCliente,
  manejarCerrarVentana,
}) => {
  return (
    cliente &&
    cliente.precios_cliente && (
      <Modal show={mostrarCliente} onHide={manejarCerrarVentana}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Cliente #{cliente.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Datos del cliente</h3>
          <p>
            <strong>NOMBRE:</strong> {cliente.NOMBRE}
          </p>
          <p>
            <strong>CONTACTO:</strong> {cliente.CONTACTO}
          </p>
          <p>
            <strong>TELEFONO:</strong> {cliente.TELEFONO}
          </p>
          <p>
            <strong>CORREO:</strong> {cliente.CORREO}
          </p>
          <p>
            <strong>TIPO DE PAGO:</strong> {cliente.TIPO_PAGO}
          </p>
          <h3>Datos de la dirección</h3>

          <p>
            <strong>CALLE:</strong> {cliente.DIRECCION.CALLE}
          </p>
          <p>
            <strong>NUMERO:</strong> {cliente.DIRECCION.NUMERO}
          </p>
          <p>
            <strong>COLONIA:</strong> {cliente.DIRECCION.COLONIA}
          </p>
          <p>
            <strong>CIUDAD:</strong> {cliente.DIRECCION.CIUDAD}
          </p>
          <p>
            <strong>MUNICIPIO:</strong> {cliente.DIRECCION.MUNICIPIO}
          </p>
          <p>
            <strong>CODIGO POSTAL:</strong> {cliente.DIRECCION.CP}
          </p>

          <h3>Datos de los precios</h3>
          <p>
            <strong>PRECIOS DEL CLIENTE:</strong>{" "}
            {cliente.precios_cliente.map((pc) => (
              <p>
                {pc.producto_nombre}: {pc.PRECIO}
              </p>
            ))}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={manejarCerrarVentana}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
};

export default VentanaMostrarCliente;
