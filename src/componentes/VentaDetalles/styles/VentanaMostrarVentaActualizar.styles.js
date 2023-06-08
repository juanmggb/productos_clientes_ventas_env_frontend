import { Modal } from "react-bootstrap";
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

  max-height: 400px;

  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  // Estilos para las tablas
  & table {
    color: black;
  }

  & h5 {
    color: black;
    font-weight: bold;
  }
`;
