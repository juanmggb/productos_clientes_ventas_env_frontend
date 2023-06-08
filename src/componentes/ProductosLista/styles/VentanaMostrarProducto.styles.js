import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";

// Estilos CSS del header de la ventana emergente
export const StyledModalHeader = styled(Modal.Header)`
  background-color: white;
  border-bottom: 4px solid #d9d9d9;

  & h4 {
    color: black;
    font-weight: bold;
  }
`;
// Estilos del body de la ventana emergente
export const StyledModalBody = styled(Modal.Body)`
  background-color: white;
  color: black;

  & h5 {
    color: black;
    font-weight: bold;
  }
`;

export const StyledButton = styled(Button)`
  background-color: rgb(20, 50, 100);
  color: var(--white-color);
  font-weight: var(--font-weight-label);
`;

// Estilos del footer de la ventana emergente
export const StyledModalFooter = styled(Modal.Footer)`
  background-color: white;
  border-top: 4px solid #d9d9d9;
`;
