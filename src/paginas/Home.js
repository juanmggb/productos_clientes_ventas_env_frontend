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

// const DatosGenerales = styled.div`
//   padding: 25px;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   column-gap: 30px;
//   align-items: left;
// `;

const ImagenUsuario = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 40px;
`;

const Texto = styled.h3`
  font-size: 30px;
`;

const LogOut = styled(Button)`
  font-weight: bold;
  box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: rgb(30, 60, 120);
    box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.2);
  }
`;
const usuarioImagen = JSON.parse(localStorage.getItem("imagen"));
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

  // const usuarioImagen = "../Imagenes/" + username + ".png";
  const defecto = "../Imagenes/Logo.png";
  const manejarErrorImagen = (e) => {
    e.target.src = defecto;
  };

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
    <Container>
      <Row className="p-5 justify-content-center align-items-center">
        <Col md={3} className="d-flex align-items-center">
          <ImagenUsuario
            src={`http://127.0.0.1:8000/${usuarioImagen}`}
            onError={manejarErrorImagen}
          />
        </Col>
        <Col md={9} className="d-flex flex-column">
          <Form>
            <Form.Group>
              <Form.Label>NOMBRE DE USUARIO:</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={username}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>PERMISOS:</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={isAdmin ? "ADMINISTRADOR" : "NO ES ADMINISTRADOR"}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>NOMBRE:</Form.Label>
              <Form.Control type="text" readOnly value={name}></Form.Control>
            </Form.Group>

            <Button className="mt-3" onClick={manejarLogout}>
              Cerrar Sesión
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
