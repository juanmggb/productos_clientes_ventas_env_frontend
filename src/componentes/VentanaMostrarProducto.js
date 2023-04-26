import React from "react";
import { Button } from "react-bootstrap";
import {
  ModalStyled,
  ModalHeaderStyled,
  ModalBodyStyled,
  ModalFooterStyled,
} from "../styledComponents/ModalStyled";

const VentanaMostrarProducto = ({
  producto,
  mostrarProducto,
  manejarCerrarVentana,
}) => {
  return (
    producto && (
      <ModalStyled
        centered
        show={mostrarProducto}
        onHide={manejarCerrarVentana}
      >
        <ModalHeaderStyled>
          <h4>Detalles del producto #{producto.id}</h4>
        </ModalHeaderStyled>
        <ModalBodyStyled>
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
            }}
          >
            Cerrar
          </Button>
        </ModalFooterStyled>
      </ModalStyled>
    )
  );
};

export default VentanaMostrarProducto;
