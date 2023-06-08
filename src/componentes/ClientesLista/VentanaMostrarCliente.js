import React from "react";
import { Modal } from "react-bootstrap";
import {
  StyledButton,
  StyledModalBody,
  StyledModalFooter,
  StyledModalHeader,
} from "./styles/VentanaMostrarCliente.styles";

const VentanaMostrarCliente = ({
  cliente,
  mostrarCliente,
  manejarCerrarVentana,
}) => {
  return (
    cliente &&
    cliente.precios_cliente && (
      <Modal centered show={mostrarCliente} onHide={manejarCerrarVentana}>
        <StyledModalHeader>
          <h4>Detalles del Cliente #{cliente.id}</h4>
        </StyledModalHeader>
        <StyledModalBody>
          <h5>Datos del cliente</h5>
          <p>
            <strong>Nombre:</strong> {cliente.NOMBRE}
          </p>
          <p>
            <strong>Contacto:</strong> {cliente.CONTACTO}
          </p>
          <p>
            <strong>Telefono:</strong> {cliente.TELEFONO}
          </p>
          <p>
            <strong>Correo:</strong> {cliente.CORREO}
          </p>
          <p>
            <strong>Tipo de pago:</strong> {cliente.TIPO_PAGO}
          </p>
          <h5>Datos de la dirección</h5>

          <p>
            <strong>Calle:</strong> {cliente.DIRECCION.CALLE}
          </p>
          <p>
            <strong>Número:</strong> {cliente.DIRECCION.NUMERO}
          </p>
          <p>
            <strong>Colonia:</strong> {cliente.DIRECCION.COLONIA}
          </p>
          <p>
            <strong>Ciudad:</strong> {cliente.DIRECCION.CIUDAD}
          </p>
          <p>
            <strong>Municipio:</strong> {cliente.DIRECCION.MUNICIPIO}
          </p>
          <p>
            <strong>C.P:</strong> {cliente.DIRECCION.CP}
          </p>

          <h5>Precios del cliente</h5>

          {cliente.precios_cliente.map((pc) => (
            <p>
              {pc.producto_nombre}: {pc.PRECIO}
            </p>
          ))}
        </StyledModalBody>
        <StyledModalFooter>
          <StyledButton
            variant="secondary"
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

export default VentanaMostrarCliente;
