import React from "react";
import { Form, Modal } from "react-bootstrap";
import {
  StyledButton,
  StyledModalBody,
  StyledModalFooter,
  StyledModalHeader,
} from "./styles/VentanaFormularioPrecios.styles";

const VentanaFormularioPrecios = ({
  productos,
  mostrarPrecios,
  manejarCerrarVentana,
  manejarCambioPrecio,
}) => {
  return (
    productos && (
      <Modal centered show={mostrarPrecios} onHide={manejarCerrarVentana}>
        <StyledModalHeader>
          <h4>Precios del Cliente </h4>
        </StyledModalHeader>
        <StyledModalBody>
          <Form>
            {productos.map((p) => (
              <Form.Group controlId={p.NOMBRE} key={p.id}>
                <Form.Label>Producto: {p.NOMBRE}</Form.Label>
                <Form.Control
                  type="number"
                  value={p.PRECIO}
                  onChange={(e) =>
                    manejarCambioPrecio(Number(e.target.value), Number(p.id))
                  }
                ></Form.Control>
              </Form.Group>
            ))}
          </Form>
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

export default VentanaFormularioPrecios;
