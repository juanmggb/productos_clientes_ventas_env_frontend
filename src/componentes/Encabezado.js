import React, { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";
import useTamañoPantalla from "./useTamañoPantalla";
import { useState } from "react";
import jwt_decode from "jwt-decode";

const Logo = styled.img`
  height: 40px;
  width: 110px;
  margin-left: ${(props) =>
    props.ancho > 1200 ? "60%" : props.ancho > 995 ? "40%" : "35%"};
  display: ${(props) => (props.ancho < 993 ? "none" : "")};
`;

const Usuario = styled.img`
  height: 45px;
  width: 45px;
  border-radius: 22.5px;
  display: ${(props) => (props.ancho < 993 ? "none" : "")};
  margin-left: ${(props) => props.ancho > 1200 ? "65%" : props.ancho > 995 ? "60%" : "55%"};
`;

const LogoMovil = styled(Logo)`
  display: ${(props) =>
    props.ancho < 993 ? (props.estado ? "inline-block" : "none") : "none"};
  margin-left: 0%;
  justify-items: left;
  width: 100px;

  // Estilos de smarthphone
  @media (max-width: 480px) and (orientation: portrait) {
    position: relative;
    left: -15px;
  }
`;

const UsuarioMovil = styled(Usuario)`
  display: ${(props) =>
    props.ancho < 993 ? (props.estado ? "inline-block" : "none") : "none"};
  margin: 0;

  @media (max-width: 480px) and (orientation: portrait) {
    position: relative;
    right: 0px;
  }
`;
// Estilos del Container
const ContainerStyled = styled(Container)`

   // Estilos para smartphone
   @media (max-width: 480px) and (orientation: portrait) {
    padding: 10px;
   }
`;

// Estilos del Navbar 
const NavbarStyled = styled(Navbar)`
  height: 10vh;
  z-index: 1;
  
  background-color: #d9e3f1;
  
  // Estilos de smarthphone
  @media (max-width: 480px) and (orientation: portrait) {
    height: 10;
   }
`;

// Estilos del Navbar.Collapse
const NavbarCollapseStyled = styled(Navbar.Collapse)`
  background-color: #d9e3f1;

  // Estilos para smartphone
  @media (max-width: 480px) and (orientation: portrait) {
    position: relative;
    padding: 10px 10px 0px 50px;
    left: -50px;
    border-radius: 10px;
    width: 200px;
  }
`;

// Estilos de Nav
const NavStyled = styled(Nav)`
  background: red;
`;

const Encabezado = () => {
  const usuarioInfo = useSelector((state) => state.usuarioInfo);
  const { token } = usuarioInfo;
  const [username, setUsername] = useState("");
  const { ancho, alto } = useTamañoPantalla();
  const [estadoSesion, setEstadoSesion] = useState(false);

  useEffect(() => {
    if (!token) {
      setEstadoSesion(false);
    } else {
      var decoded = jwt_decode(token);
      setUsername(decoded.username);
      setEstadoSesion(true);
    }
  }, [token, username]);

  const usuarioImagen = JSON.parse(localStorage.getItem("imagen"));
  const defecto = "../Imagenes/Logo.png";

  const manejarErrorImagen = (e) => {
    e.target.src = defecto;
  };

  return (
    <NavbarStyled expand="lg">
      <ContainerStyled>
        <div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <LinkContainer to="/">
            <Navbar.Brand>{ancho > 480 ? "OptAppAI" : ""}</Navbar.Brand>
          </LinkContainer>
        </div>
        <LogoMovil
          src={"../Imagenes/logo.png"}
          ancho={ancho}
          estado={estadoSesion}
        />
        <LinkContainer to = '/'>
          <UsuarioMovil
            src={`http://192.168.1.108:8000${usuarioImagen}`}
            onError={manejarErrorImagen}
            ancho={ancho}
            estado={estadoSesion}
          />
        </LinkContainer>
        <NavbarCollapseStyled id="basic-navbar-nav">
          <Nav className="me-auto">
            {!token ? (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            ) : (
              <>
                <NavDropdown  title="Productos" id="basic-nav-dropdown">
                  <LinkContainer  to="/productos">
                    <NavDropdown.Item>Lista de Productos</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/registrar-producto">
                    <NavDropdown.Item>Registrar Producto</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>

                <NavDropdown title="Clientes" id="basic-nav-dropdown">
                  <LinkContainer to="/clientes">
                    <NavDropdown.Item>Lista de Clientes</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/registrar-cliente">
                    <NavDropdown.Item>Registrar Cliente</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>

                <NavDropdown title="Ventas" id="basic-nav-dropdown">
                  <LinkContainer to="/ventas">
                    <NavDropdown.Item>Lista de Ventas</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/realizar-venta">
                    <NavDropdown.Item>Realizar Venta</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>

                <NavDropdown title="Usuarios" id="basic-nav-dropdown" style = {{paddingBottom: '10px'}}>
                  <LinkContainer to="/usuarios">
                    <NavDropdown.Item>Lista de Usuarios</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/registrar-usuario">
                    <NavDropdown.Item>Registrar Usuario</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>

                <Logo src={"../Imagenes/logo.png"} ancho={ancho} />
                <Usuario
                  src={`http://192.168.1.108:8000${usuarioImagen}`}
                  onError={manejarErrorImagen}
                    ancho={ancho}
                  onClick = {() => {}}
                />
              </>
            )}
          </Nav>
        </NavbarCollapseStyled>
      </ContainerStyled>
    </NavbarStyled>
  );
};

export default Encabezado;
