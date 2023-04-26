import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { LOGOUT_USUARIO } from "../constantes/usuarioConstantes";
import styled from "styled-components";
import {
  actualizarAccessToken,
  isTokenValid,
  logout,
} from "../actions/usuarioActions";

// Estilos de la página principal
const Principal = styled.div`
  position: fixed;
  background: linear-gradient(
    rgb(54, 54, 82),
    15%,
    rgb(84, 106, 144),
    60%,
    rgb(68, 111, 151)
  );

  height: 90vh;
  width: 100vw;
  padding: 30px;
  user-select: none;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  // Estilos para smarthphone
  @media (max-width: 480px) and (orientation: portrait) {
    height: 90svh;

    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    gap: 30px;
  }

  // Estilos para pc
  @media (min-width: 480px) {
    & div {
      width: 50vw;
    }
  }
`;

// Estilos Form.Group
const FormGroupStyled = styled(Form.Group)`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 5px;

  & label {
    color: white;
    font-weight: bold;
  }

  & input,
  select {
    color: black;
    font-weight: bold;
  }
`;

const ImagenUsuario = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 40px;
`;

const Home = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();
  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Obtener informacion del usuario desde el Redux store
  const usuarioInfo = useSelector((state) => state.usuarioInfo);
  const { token } = usuarioInfo;

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [imagen, setImagen] = useState("");

  useEffect(() => {
    // Si el usuario no ha iniciado sesion, redirecciona a la pagina de login
    if (!token) {
      navigate("/login");
    } else {
      // Validar el token
      const isValid = isTokenValid(token);

      if (!isValid) {
        dispatch(actualizarAccessToken("/"));
      }
      setName(JSON.parse(localStorage.getItem("name")));
      setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")));
      setUsername(JSON.parse(localStorage.getItem("username")));
      setImagen(JSON.parse(localStorage.getItem("imagen")));
    }
  }, [navigate, token, dispatch]);

  const manejarLogout = () => {
    // Disparar accion para cerrar sesion
    dispatch(logout());
  };

  return (
    <Principal>
      <ImagenUsuario src={`http://127.0.0.1:8000${imagen}`} />
      <Form>
        <FormGroupStyled>
          <Form.Label>Usuario:</Form.Label>
          <Form.Control type="text" readOnly value={username}></Form.Control>
        </FormGroupStyled>

        <FormGroupStyled>
          <Form.Label>Permisos:</Form.Label>
          <Form.Control
            type="text"
            readOnly
            value={isAdmin ? "ADMINISTRADOR" : "NO ES ADMINISTRADOR"}
          ></Form.Control>
        </FormGroupStyled>

        <FormGroupStyled>
          <Form.Label>Nombre:</Form.Label>
          <Form.Control type="text" readOnly value={name}></Form.Control>
        </FormGroupStyled>

        <Button className="mt-3" onClick={manejarLogout}>
          Cerrar Sesión
        </Button>
      </Form>
    </Principal>
  );
};

export default Home;
