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
          <p>
            <strong>NOMBRE:</strong> {cliente.NOMBRE}
          </p>
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
