import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../actions/usuarioActions";
import Loader from "../componentes/Loader";
import Mensaje from "../componentes/Mensaje";

const InicioSesion = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();

  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Obtener la informacion del usuario desde el Redux store
  const usuarioInfo = useSelector((state) => state.usuarioInfo);
  const { loading, tokens, error } = usuarioInfo;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Si el usuario ya ha iniciado sesion redirecciona a la pagina de inicio
    if (tokens) {
      navigate("/");
    }
  }, [navigate, tokens]);

  const manejatSubmit = (e) => {
    e.preventDefault();
    // Disparar el creador de acciones login
    dispatch(login(username, password));
  };

  return (
    <>
      {loading && <Loader />}
      {error && <Mensaje variant="danger">{error}</Mensaje>}
      {
        <div>
          <Form
            style={{ maxWidth: "80%", paddingLeft: "25px" }}
            onSubmit={manejatSubmit}
          >
            <h1>Ingrese los datos de usuario</h1>
            <Row>
              <Col md={6}>
                <Form.Group controlId="username">
                  <Form.Label>Nombre de usuario</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="password">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" variant="primary">
              Iniciar sesión
            </Button>
          </Form>
        </div>
      }
    </>
  );
};

export default InicioSesion;
