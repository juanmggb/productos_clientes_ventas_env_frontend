import React from "react";
import { Button } from "react-bootstrap";
import {
  ModalStyled,
  ModalHeaderStyled,
  ModalBodyStyled,
  ModalFooterStyled
} from '../styledComponents/ModalStyled';

const VentanaMostrarCliente = ({
  cliente,
  mostrarCliente,
  manejarCerrarVentana,
}) => {
  return (
    cliente &&
    cliente.precios_cliente && (
      <ModalStyled centered show={mostrarCliente} onHide={manejarCerrarVentana}>
        <ModalHeaderStyled>
          <h4>Detalles del Cliente #{cliente.id}</h4>
        </ModalHeaderStyled>
        <ModalBodyStyled>
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

          <h5>Datos de los precios</h5>
          <p>
            <strong>Precios del cliente:</strong>{" "}
            {cliente.precios_cliente.map((pc) => (
              <p>
                {pc.producto_nombre}: {pc.PRECIO}
              </p>
            ))}
          </p>
        </ModalBodyStyled>
        <ModalFooterStyled>
          <Button
              variant="secondary"
              onClick={() => {
                manejarCerrarVentana();
              }}
              style={{
                backgroundColor: "rgb(20,50,100)",
                color: "white",
                fontWeight: "bold",
              }}>
            Cerrar
          </Button>
        </ModalFooterStyled>
      </ModalStyled>
    )
  );
};

export default VentanaMostrarCliente;
