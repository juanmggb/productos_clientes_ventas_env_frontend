import React from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-hot-toast";

// Importar estilos del componente
import {
  StyledButton,
  StyledButtonContainer,
  StyledCol,
  StyledContainer,
  StyledFormGroup,
  StyledImageUser,
  StyledRow,
} from "./styles/Home.styles";
import ConfirmarCerrarSesion from "../componentes/Home/ConfirmarCerrarSesion";
import { BASE_URL } from "../constantes/constantes";

const Home = () => {
  // Obtener la informacion del usuario del localStorage
  const name = getLocalStorage("name");
  const username = getLocalStorage("username");
  const isAdmin = getLocalStorage("isAdmin");
  const imagen = getLocalStorage("imagen");

  // Funcion para manejar el cierre de sesion
  const manejarLogout = () => {
    toast((t) => <ConfirmarCerrarSesion t={t} />, {
      duration: 5000,
    });
  };

  return (
    <StyledContainer fluid>
      <StyledRow>
        {/* Columna con la imagen del usuario */}
        <StyledCol md={6}>
          <StyledImageUser src={`${BASE_URL}${imagen}`} />
        </StyledCol>
        {/* Columna con la informacion del usuario */}
        <StyledCol md={6}>
          <Form>
            <StyledFormGroup>
              <Form.Label>Usuario:</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={username}
              ></Form.Control>
            </StyledFormGroup>

            <StyledFormGroup>
              <Form.Label>Permisos:</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={isAdmin ? "ADMINISTRADOR" : "NO ES ADMINISTRADOR"}
              ></Form.Control>
            </StyledFormGroup>

            <StyledFormGroup>
              <Form.Label>Nombre:</Form.Label>
              <Form.Control type="text" readOnly value={name}></Form.Control>
            </StyledFormGroup>

            <StyledButtonContainer>
              <StyledButton onClick={manejarLogout}>Cerrar Sesión</StyledButton>
              </StyledButtonContainer>
          </Form>
        </StyledCol>
      </StyledRow>
    </StyledContainer>
  );
};

const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export default Home;
