import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import styled from "styled-components";

// Estilos generales
// Estilo para el contenedor
export const StyledContainer = styled(Container)`
  height: 88vh;
  padding: 3rem 0;
  background: linear-gradient(
    rgb(54, 54, 82),
    15%,
    rgb(84, 106, 144),
    60%,
    rgb(68, 111, 151)
  );

  @media screen and (max-width: 1200px){
    height: auto;
    padding: 1rem;

    @media screen and (max-width: 768px){
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
`;

export const StyledRow = styled(Row)`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  max-width: 120rem;
`;

export const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

// // Estilos Form.Group
export const StyledFormGroup = styled(Form.Group)`
  label {
    color: var(--font-color-label);
    font-weight: var(--font-weight-label);
    font-size: var(--font-size-label);
    @media screen and (max-width: 500px){
      font-size: 0.9rem;
    }
  }

  input,
  select {
    color: var(--font-color-input);
    font-weight: var(--font-weight-input);
    font-size: var(--font-size-input);
    margin-bottom: 2rem;
    @media screen and (max-width: 500px){
      font-size: 0.9rem;
      width: 100%;
    }
  }
`;

export const StyledImageUser = styled(Image)`
  width: 250px;
  height: 250px;
  border-radius: 50%;
`;

export const StyledButtonContainer = styled.div`
  display: flex;  
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledButton = styled(Button)`
  font-size: var(--font-size-input);
  margin-top: 1rem;
`;
