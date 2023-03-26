import React, { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import styled from 'styled-components';
import useTamañoPantalla from './useTamañoPantalla';
import { useState } from "react";
import jwt_decode from "jwt-decode";

const Logo = styled.img`
  height: 40px;
  width: 110px;
  margin-left: ${props => (props.ancho>1200) ? '60%':(props.ancho>995) ? '40%':'35%'};
  display: ${props => props.ancho < 993 ? 'none':''} 
`;

const Usuario = styled.img`
  height: 45px;
  width: 45px;
  border-radius: 22.5px;
  margin-left: ${props => props.ancho>1200 ? '80%':props.ancho > 995 ? '60%':'55%'};
  display: ${props => props.ancho < 993 ? 'none':''};
`;

const LogoMovil = styled(Logo)`
  display: ${props => props.ancho < 993 ? props.estado ? 'inline-block':'none':'none'};
  margin-left: 0%;
  justify-items: left;
  width: 100px;
`;

const UsuarioMovil = styled(Usuario)`
  display: ${props => props.ancho < 993 ? props.estado ? 'inline-block':'none':'none'};
  margin: 0;
`;

const Encabezado = () => {
  const usuarioInfo = useSelector((state) => state.usuarioInfo);
  const { tokens } = usuarioInfo;
  const [username, setUsername] = useState("");
  const {ancho, alto} = useTamañoPantalla();
  const [estadoSesion, setEstadoSesion] = useState(false)

  useEffect(() => {
    if(!tokens){
      setEstadoSesion(false);
    }else{
      var decoded = jwt_decode(tokens.access);
      setUsername(decoded.username);
      setEstadoSesion(true);
    }
  },[tokens, username])

  const usuarioImagen = '../imagenes/' + username + '.png';
  const defecto= '../Imagenes/Logo.png';
  
  const manejarErrorImagen = (e) => {
    e.target.src = defecto;
  }


  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <LinkContainer to="/">
            <Navbar.Brand>{(ancho>400) ? 'OptAppAI':''}</Navbar.Brand> 
          </LinkContainer>
        </div>
        <LogoMovil src={'../Imagenes/logo.png'} ancho= {ancho} estado={estadoSesion}/>
        <UsuarioMovil src={usuarioImagen || defecto} onError={manejarErrorImagen} ancho={ancho} estado={estadoSesion}/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!tokens ? (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            ) : (
              <>
                <NavDropdown title="Productos" id="basic-nav-dropdown">
                  <LinkContainer to="/productos">
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
                <Logo src={'../Imagenes/logo.png'} ancho= {ancho}/>
                <Usuario src={usuarioImagen || defecto} onError={manejarErrorImagen} ancho={ancho}/>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Encabezado;
