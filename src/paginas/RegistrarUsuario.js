import React, { useEffect, useState } from "react";
import { Button, Form, Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registrarProducto } from "../actions/productoActions";
import { toast } from "react-hot-toast";
import styled from "styled-components";
import { RESET_PRODUCTO_REGISTRAR } from "../constantes/productoConstantes";
import { RESET_USUARIO_REGISTRAR } from "../constantes/usuarioConstantes";
import { registrarUsuario } from "../actions/usuarioActions";

// Estilos CSS con styled components
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
  flex-direction: column;
  align-items: center;
  gap: 30px;

  & h1 {
    color: white;
  }

  // Estilos para smarthphone
  @media (max-width: 480px) and (orientation: portrait) {
    height: 90svh;

    & input {
      height: 6svh;
    }

    & select {
      height: 6svh;
      padding: 10px;
    }

    & h1 {
      font-weight: bold;
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

const RegistrarUsuario = () => {
  // Funcion para disparar acciones
  const dispatch = useDispatch();

  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Obtener el estado desde el Redux store
  const usuarioRegistrar = useSelector((state) => state.usuarioRegistrar);
  const {
    loading: loadingRegistrar,
    success: successRegistrar,
    error: errorRegistrar,
  } = usuarioRegistrar;

  const [nombre, setNombre] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [imagen, setImagen] = useState(null);

  // useEffect para mostrar las alertas
  useEffect(() => {
    if (loadingRegistrar) {
      toast.loading("Registrando usuario");
    }

    if (successRegistrar) {
      toast.remove();
      toast.success("Usuario registrado");
    }

    if (errorRegistrar) {
      toast.dismiss();
      toast.error("Error al registrar usuario");
    }
  }, [successRegistrar, errorRegistrar, loadingRegistrar]);

  useEffect(() => {
    // Si el registro fue correcto, reset productoRegistrar y redireccionar a la pagina de productos
    if (successRegistrar) {
      dispatch({ type: RESET_USUARIO_REGISTRAR });
      navigate("/usuarios");
    }
  }, [navigate, successRegistrar, dispatch]);

  const manejarRegistrarUsuario = (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      toast.error("Las contraseñas deben ser iguales", { duration: 1000 });
    } else {
      const formData = new FormData();

      formData.append("name", nombre);
      formData.append("username", nombreUsuario);
      formData.append("is_admin", isAdmin);
      formData.append("password1", password1);
      formData.append("password2", password2);
      if (imagen) {
        formData.append("IMAGEN", imagen);
      }

      // Disparar la accion de actualizar producto
      dispatch(registrarUsuario(formData));
    }
  };

  // Aqui no es necesario empezar con loading porque no hay un estado necesario al cargar el componente.
  return (
    <Principal>
      {/* Esta es la parte que cambia en las paginas */}
      <h1>Registrar usuario</h1>
      <Container>
        <Form onSubmit={manejarRegistrarUsuario}>
          <Row>
            <Col lg={true} md={4}>
              <FormGroupStyled controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                ></Form.Control>
              </FormGroupStyled>

              <FormGroupStyled controlId="nombreUsuario">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={nombreUsuario}
                  onChange={(e) => setNombreUsuario(e.target.value)}
                ></Form.Control>
              </FormGroupStyled>

              <FormGroupStyled controlId="password1">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  required
                  type="password"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                ></Form.Control>
              </FormGroupStyled>

              <FormGroupStyled controlId="password2">
                <Form.Label>Confirmar contraseña</Form.Label>
                <Form.Control
                  required
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                ></Form.Control>
              </FormGroupStyled>
            </Col>

            <Col lg={true} md={4}>
              <FormGroupStyled controlId="isAdmin">
                <Form.Label>Permisos</Form.Label>
                <Form.Select
                  value={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.value)}
                >
                  <option value={true}>ADMINISTRADOR</option>
                  <option value={false}>NO ES ADMINISTRADOR</option>
                </Form.Select>
              </FormGroupStyled>

              <Form.Group controlId="formImage">
                <Form.Label>IMAGEN</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setImagen(e.target.files[0])}
                />
              </Form.Group>

              <Button className="mt-3" type="submit">
                Registrar usuario
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Principal>
  );
};

export default RegistrarUsuario;
