import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { StyledButton, StyledButtonContainer, TableStyled } from "./styles/TablaVentas.styles";
import UseScreenSize from "../../paginas/utilis/UseScreenSize";

const TablaVentas = ({
  ventas,
  manejarMostrarDetallesVenta,
  manejarVentaDetalles,
}) => {
  const isSmallViewport = useMediaQuery({ maxWidth: 768 });
  const shouldshow = !isSmallViewport;
  const {alto, ancho} = UseScreenSize(); 

  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  return (
    <Container>
      <Row>
        <Col>
          <TableStyled striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>CLIENTE</th>

                {ancho > 500  ? (<th>FECHA</th>) : null}
                {ancho > 700  ? (<th>VENDEDOR</th>) : null}
                {ancho > 1200 ? (<th>HORA</th>) : null}
                {ancho > 500  ? (<th>TIPO DE VENTA</th>) : null}
                {ancho > 1100 ? (<th>TIPO DE PAGO</th>) : null}
                {ancho > 1200 ? (<th>STATUS</th>) : null}

                {isAdmin ? <th>EDITAR</th> : null}
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta) => (
                <tr
                  key={venta.id}
                  onClick={() => {
                    return manejarMostrarDetallesVenta(venta.id);
                  }}
                >
                  {<td>{venta.id}</td>}
                  {<td>
                    {venta.NOMBRE_CLIENTE
                      ? truncateClienteNombre(venta.NOMBRE_CLIENTE)
                      : "NO DISPONIBLE"}
                  </td>}

                  {ancho > 500  ? (<td>{obtenerFecha(venta.FECHA)}</td>) : null}
                  {ancho > 700  ? (<td>{truncateClienteNombre(venta.VENDEDOR)}</td>) : null}
                  {ancho > 1200 ? (<td>{obtenerHora(venta.FECHA)}</td>) : null}
                  {ancho > 500  ? (<td>{venta.TIPO_VENTA}</td>) : null}
                  {ancho > 1100 ? (<td>{venta.TIPO_PAGO}</td>) : null}
                  {ancho > 1200 ? (<td>{venta.STATUS}</td>) : null}

                  {isAdmin ? (
                    <td>
                      {venta.STATUS === "PENDIENTE" ? (
                        <StyledButtonContainer>
                          <StyledButton
                            shouldshow={shouldshow.toString()}
                            onClick={() => manejarVentaDetalles(venta.id)}
                          >
                            <i className="fa-regular fa-pen-to-square"></i>
                          </StyledButton>
                        </StyledButtonContainer>
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

export const obtenerFecha = (date) => {
  const ventaDate = new Date(date);

  // Extracting fecha (date)
  const fecha = ventaDate.toLocaleDateString(); // Adjusts to the user's local time zone

  return fecha;
};

export const obtenerHora = (date) => {
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
