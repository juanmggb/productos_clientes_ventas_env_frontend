import React, { useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../actions/sesionActions";
import { toast } from "react-hot-toast";
import {
  StyledBackground,
  StyledContainer,
  StyledForm,
  StyledLogoContainer,
} from "./styles/InicioSesion.styles";
import { BASE_URL } from "../constantes/constantes";

const InicioSesion = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();

  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Obtener la informacion del usuario desde el Redux store
  const usuarioInfo = useSelector((state) => state.usuarioInfo);
  const { loading, token, error } = usuarioInfo;

  // Hook para guardar las credenciales del usuario
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // useState para mostrar mensajes de inicio de sesion
  useEffect(() => {
    if (loading) {
      toast.loading("Iniciando sesión");
    }

    // Si el usuario ya ha iniciado sesion redirecciona a la pagina de inicio
    if (token) {
      toast.dismiss();
      toast.success("Se inició sesión correctamente", {
        duration: 2000,
      });
      navigate("/");
    }

    if (error) {
      toast.remove();
      toast.error("Por favor, introduce credenciales válidas", {
        duration: 4000,
      });
    }
  }, [navigate, token, error, loading]);

  // Funcion para iniciar sesion
  const manejarSubmit = (e) => {
    e.preventDefault();
    // Disparar el creador de acciones login
    dispatch(login(username, password));
  };

  return (
    <StyledBackground>
      <StyledContainer>
        <StyledLogoContainer>
          <Image
            src={`${BASE_URL}media/imagenes/general/logo.png`}
            alt="Hielo Gran Pacifico Logo"
          />
        </StyledLogoContainer>
        <StyledForm autoComplete="off" onSubmit={manejarSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Iniciar sesión
          </Button>
        </StyledForm>
      </StyledContainer>
    </StyledBackground>
  );
};

export default InicioSesion;
