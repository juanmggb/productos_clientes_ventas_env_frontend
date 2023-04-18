import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../actions/usuarioActions";
import Loader from "../componentes/Loader";
import Mensaje from "../componentes/Mensaje";
import styled from "styled-components";

//Estilos CSS
const Principal = styled.div`
  position: relative;
  width: 100%;
  height: 90vh;
  background: linear-gradient(rgba(0, 0, 0, 0), 80%, rgba(0, 0, 0, 0.5)),
    url("../imagenes/background1.jpg");
  background-size: 100% 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormularioContenedor = styled.div`
  position: relative;
  height: 90%;
  width: 350px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
  grid-template-rows: 100px 5fr 0.8fr;
  grid-template-areas:
    "Logo"
    "Form"
    "Vacio";
`;

const LogoDiv = styled.div`
  grid-area: Logo;
  display: flex;
  background-repeat: no-repeat;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  height: 90%;
  width: 200px;
`;

const Formulario = styled.form`
  grid-area: Form;
  border-radius: 10px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1.2fr;
  grid-template-areas:
    "User"
    "Password"
    "Ingresar";
  justify-items: center;
  align-items: center;
  background-color: rgba(185, 185, 185, 0.6);
`;

const InicioSesion = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();

  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Obtener la informacion del usuario desde el Redux store
  const usuarioInfo = useSelector((state) => state.usuarioInfo);
  const { loading, token, error } = usuarioInfo;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Si el usuario ya ha iniciado sesion redirecciona a la pagina de inicio
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  const manejarSubmit = (e) => {
    e.preventDefault();
    // Disparar el creador de acciones login
    dispatch(login(username, password));
  };

  return (
    <>
      {loading && <Loader />}
      {error && <Mensaje variant="danger">{error}</Mensaje>}
      {
        <>
          <Principal>
            <FormularioContenedor>
              <LogoDiv>
                <Logo src={"../imagenes/Logo.png"} />
              </LogoDiv>
              <Formulario autoComplete="off" onSubmit={manejarSubmit}>
                <Form.Group
                  style={{ width: "90%", gridArea: "User" }}
                  controlId="username"
                >
                  <Form.Label
                    style={{
                      width: "100%",
                      fontWeight: "bold",
                      color: "rgb(30,50,120)",
                    }}
                  >
                    Nombre de usuario
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  style={{ width: "90%", gridArea: "Password" }}
                  controlId="password"
                >
                  <Form.Label
                    style={{
                      width: "100%",
                      fontWeight: "bold",
                      color: "rgb(30,50,120)",
                    }}
                  >
                    Contraseña
                  </Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  style={{
                    color: "rgba(220,220,220)",
                    backgroundColor: "rgba(30,60,90)",
                    fontWeight: "bold",
                  }}
                >
                  Iniciar sesión
                </Button>
              </Formulario>
            </FormularioContenedor>
          </Principal>
        </>
      }
    </>
  );
};

export default InicioSesion;
