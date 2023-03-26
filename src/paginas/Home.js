import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { LOGOUT_USUARIO } from "../constantes/usuarioConstantes";
import styled from 'styled-components';

const DatosGenerales = styled.div`
  padding: 25px;
  width: 100vw;
  display: flex;
  flex-direction: row;
  column-gap: 30px;
  align-items: center;
  `;

const ImagenUsuario = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

const Texto = styled.h3`
  font-size: 30px;
`;

const LogOut = styled(Button)`
  font-weight: bold;
  box-shadow: 1px 2px 5px 1px rgba(0,0,0,0.2);

  &:hover{
    background-color: rgb(30,60,120);
    box-shadow: 1px 2px 5px 1px rgba(0,0,0,0.2);
  }
`;


const Home = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();
  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Obtener informacion del usuario desde el Redux store
  const usuarioInfo = useSelector((state) => state.usuarioInfo);
  const { tokens } = usuarioInfo;

  const [username, setUsername] = useState("");

  const usuarioImagen = '../Imagenes/' + username + '.png';
  const defecto = '../Imagenes/Logo.png';
  const manejarErrorImagen = (e) => {
    e.target.src = defecto
  }


  useEffect(() => {
    // Si el usuario no ha iniciado sesion, redirecciona a la pagina de login
    if (!tokens) {
      navigate("/login");
    } else {
      // Obtener el username a partir del token
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
    <DatosGenerales>
      <ImagenUsuario src={usuarioImagen || defecto} onError={manejarErrorImagen}/>
      <h3>{username}</h3>
      <LogOut onClick= {manejarLogout}>Cerrar Sesión</LogOut>
    </DatosGenerales>
  );
};

export default Home;
