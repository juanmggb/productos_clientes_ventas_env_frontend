import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { StyledButton, TableStyled } from "./styles/TablaVentas.styles";

const TablaVentas = ({
  ventasFiltradas,
  manejarMostrarDetallesVenta,
  manejarVentaDetalles,
}) => {
  const isSmallViewport = useMediaQuery({ maxWidth: 768 });
  const shouldshow = !isSmallViewport;

  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  return (
    <Container>
      <Row>
        <Col>
          <TableStyled hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>CLIENTE</th>

                {shouldshow ? (
                  <>
                    <th>FECHA</th>
                    <th>VENDEDOR</th>
                    <th>HORA</th>
                    <th>TIPO DE VENTA</th>
                    <th>TIPO DE PAGO</th>
                    <th>STATUS</th>
                  </>
                ) : null}

                {isAdmin ? <th>EDITAR</th> : null}
              </tr>
            </thead>
            <tbody>
              {ventasFiltradas.map((venta) => (
                <tr
                  key={venta.id}
                  onClick={() => {
                    return manejarMostrarDetallesVenta(venta.id);
                  }}
                >
                  <td>{venta.id}</td>
                  <td>
                    {venta.CLIENTE
                      ? truncateClienteNombre(venta.cliente_nombre)
                      : "NO DISPONIBLE"}
                  </td>

                  {shouldshow ? (
                    <>
                      <td>{obtenerFecha(venta.FECHA)}</td>
                      <td>{truncateClienteNombre(venta.VENDEDOR)}</td>
                      <td>{obtenerHora(venta.FECHA)}</td>
                      <td>{venta.TIPO_VENTA}</td>
                      <td>{venta.TIPO_PAGO}</td>
                      <td>{venta.STATUS}</td>
                    </>
                  ) : null}

                  {isAdmin ? (
                    <td>
                      {venta.STATUS === "PENDIENTE" ? (
                        <StyledButton
                          shouldshow={shouldshow.toString()}
                          onClick={() => manejarVentaDetalles(venta.id)}
                        >
                          <i className="fa-regular fa-pen-to-square"></i>
                        </StyledButton>
                      ) : (
                        <i
                          style={{ marginLeft: "10px" }}
                          className="fa-solid fa-lock"
                        ></i>
                      )}
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </TableStyled>
        </Col>
      </Row>
    </Container>
  );
};

const obtenerFecha = (date) => {
  const ventaDate = new Date(date);

  // Extracting fecha (date)
  const fecha = ventaDate.toLocaleDateString(); // Adjusts to the user's local time zone

  return fecha;
};

const obtenerHora = (date) => {
  const ventaDate = new Date(date);

  const hora = ventaDate.toLocaleTimeString();

  return hora;
};

const truncateClienteNombre = (clienteNombre) => {
  if (clienteNombre.length > 10) {
    return clienteNombre.substring(0, 10) + "...";
  }
  return clienteNombre;
};

export default TablaVentas;
