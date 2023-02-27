import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { LOGOUT_USUARIO } from "../constantes/usuarioConstantes";

const Home = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();
  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Obtener informacion del usuario desde el Redux store
  const usuarioInfo = useSelector((state) => state.usuarioInfo);
  const { tokens } = usuarioInfo;

  const [username, setUsername] = useState("");

  useEffect(() => {
    // Si el usuario no ha iniciado sesion, redirecciona a la pagina de login
    if (!tokens) {
      navigate("/login");
    } else {
      // Obtener el usrname a partir del token
      var decoded = jwt_decode(tokens.access);
      setUsername(decoded.username);
    }
  }, [navigate, tokens]);

  const manejarLogout = () => {
    // Disparar accion para cerrar sesion
    dispatch({ type: LOGOUT_USUARIO });
    // Remover tokens del localStorage
    localStorage.removeItem("tokens");
  };

  return (
    <Row style={{ maxWidth: "80%", padding: "25px" }}>
      <Col md={3}>
        <h1>{username}</h1>
      </Col>
      <Col md={3}>
        <Button onClick={manejarLogout}>Logout</Button>
      </Col>
    </Row>
  );
};

export default Home;
