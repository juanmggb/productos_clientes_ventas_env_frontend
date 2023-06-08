import React from "react";
import { Modal } from "react-bootstrap";
import {
  StyledButton,
  StyledModalBody,
  StyledModalFooter,
  StyledModalHeader,
} from "./styles/VentanaMostrarProducto.styles";

const VentanaMostrarProducto = ({
  producto,
  mostrarProducto,
  manejarCerrarVentana,
}) => {
  return (
    producto && (
      <Modal centered show={mostrarProducto} onHide={manejarCerrarVentana}>
        <StyledModalHeader>
          <h4>Detalles del producto #{producto.id}</h4>
        </StyledModalHeader>
        <StyledModalBody>
          <h5>Datos del producto</h5>
          <p>
            <strong>Nombre:</strong> {producto.NOMBRE}
          </p>
          <p>
            <strong>Cantidad:</strong> {producto.CANTIDAD}
          </p>
          <p>
            <strong>Precio:</strong> {producto.PRECIO}
          </p>
        </StyledModalBody>
        <StyledModalFooter>
          <StyledButton
            onClick={() => {
              manejarCerrarVentana();
            }}
          >
            Cerrar
          </StyledButton>
        </StyledModalFooter>
      </Modal>
    )
  );
};

export default VentanaMostrarProducto;
