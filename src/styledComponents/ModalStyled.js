import { Modal } from "react-bootstrap";
import styled from "styled-components";

// Estilos CSS del la ventana modal\
export const ModalStyled = styled(Modal)`
  
  // Estilos para smartphone
  @media (max-width: 480px) and (orientation: portrait) {
    padding: 0px 10px; 
  }
`;

// Estilos CSS del header de la ventana emergente
export const ModalHeaderStyled = styled(Modal.Header)`
  background-color: white;
  border-bottom: 4px solid #d9d9d9;

  & h4 {
    color: black;
    font-weight: bold;
  }
`;
// Estilos del body de la ventana emergente
export const ModalBodyStyled = styled(Modal.Body)`
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

  // Estilos para smartphone
  @media (max-width: 480px) and (orientation: portrait) {
    padding: 0px 10px;
    max-height: 300px
  }
`;

// Estilos del footer de la ventana emergente
export const ModalFooterStyled = styled(Modal.Footer)`
    background-color: white;
    border-top: 4px solid #d9d9d9;
`;
