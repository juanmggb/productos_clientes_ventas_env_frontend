import React from "react";
import { Modal } from "react-bootstrap";
import {
  StyledButton,
  StyledModalBody,
  StyledModalFooter,
  StyledModalHeader,
} from "./styles/VentanaMostrarCliente.styles";

const ORDER_WEEK = {
  LUNES: 1,
  MARTES: 2,
  MIERCOLES: 3,
  JUEVES: 4,
  VIERNES: 5,
  SABADO: 6,
  DOMINGO: 7,
};

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

          <p>
            <strong>Observaciones:</strong> {cliente.OBSERVACIONES}
          </p>

          <h5>Precios del cliente</h5>

          {cliente.precios_cliente.map((pc) => (
            <p>
              {pc.producto_nombre}: {pc.PRECIO}{" "}
              <strong>({pc.porcentage_precio} %)</strong>
            </p>
          ))}

          <h5>Rutas del Cliente</h5>
          {cliente.RUTAS.sort((a, b) => {
            if (ORDER_WEEK[a.DIA] < ORDER_WEEK[b.DIA]) return -1;
            if (ORDER_WEEK[b.DIA] < ORDER_WEEK[a.DIA]) return 1;
            return 0;
          }).map((r) => (
            <p>
              {r.NOMBRE}: {r.DIA}
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
