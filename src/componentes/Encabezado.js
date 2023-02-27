import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

const Encabezado = () => {
  const usuarioInfo = useSelector((state) => state.usuarioInfo);
  const { tokens } = usuarioInfo;

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>OptAppAI</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
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
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Encabezado;
