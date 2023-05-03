import React, { useEffect } from "react";
import { Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

import { useState } from "react";

const Encabezado = () => {
  const usuarioInfo = useSelector((state) => state.usuarioInfo);
  const { token } = usuarioInfo;

  const [username, setUsername] = useState("");
  const [imagen, setImagen] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  // const { ancho, alto } = useTamañoPantalla();

  useEffect(() => {
    if (token) {
      setUsername(JSON.parse(localStorage.getItem("username")));
      setImagen(JSON.parse(localStorage.getItem("imagen")));
      setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")));
    }
  }, [token, username]);

  return (
    <Navbar expand="lg">
      <Container className="d-flex justify-content-space-between">
        {/* Imagen de la cuenta */}
        {token && (
          <LinkContainer to="/cuenta">
            <Nav.Link>
              <Image
                src={`http://89.116.52.95:8080${imagen}`}
                alt="imagen de usuario"
                width="50px"
                style={{ marginRight: "20px", borderRadius: "50%" }}
              />
              {username}
            </Nav.Link>
          </LinkContainer>
        )}

        {/* Logo de la empresa */}
        <LinkContainer to="/">
          <Nav.Link className="text-center">
            <Image
              src="http://89.116.52.95:8080/media/imagenes/logo.png"
              alt="imagen de usuario"
              width="100px"
              style={{ marginRight: "20px" }}
            />
            Hielo Gran Pacífico
          </Nav.Link>
        </LinkContainer>

        {/* Menu de navegacion */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" style={{ flexGrow: 0 }}>
          <Nav className="me-auto mx-5 px-5">
            {!token ? (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            ) : (
              <>
                <NavDropdown title="Productos" id="basic-nav-dropdown">
                  <LinkContainer to="/productos">
                    <NavDropdown.Item>Lista de Productos</NavDropdown.Item>
                  </LinkContainer>
                  {isAdmin && (
                    <LinkContainer to="/registrar-producto">
                      <NavDropdown.Item>Registrar Producto</NavDropdown.Item>
                    </LinkContainer>
                  )}
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

                {isAdmin && (
                  <NavDropdown
                    title="Usuarios"
                    id="basic-nav-dropdown"
                    style={{ paddingBottom: "10px" }}
                  >
                    <LinkContainer to="/usuarios">
                      <NavDropdown.Item>Lista de Usuarios</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/registrar-usuario">
                      <NavDropdown.Item>Registrar Usuario</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Encabezado;
