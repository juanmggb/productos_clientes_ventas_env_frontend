import React from "react";

import ImagenObjeto from "../general/ImagenObjecto";
import { useMediaQuery } from "react-responsive";
import { Button } from "react-bootstrap";
import { TableStyled } from "./styles/TablaProductos.styles";
import { BASE_URL } from "../../constantes/constantes";

const TablaProductos = ({
  productos,
  manejarMostrarDetallesProducto,
  manejarProductoDetalles,
  manejarBorrarProducto,
}) => {
  // Determinar si el ancho de la pantalla es small o menor
  const isSmallViewport = useMediaQuery({ maxWidth: 768 });
  const shouldShow = !isSmallViewport;

  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  // Renderizar tabla de productos
  return (
    <TableStyled striped hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>IMAGEN</th>

          {shouldShow ? (
            <>
              <th>NOMBRE</th>
              <th>CANTIDAD</th>
              <th>PRECIO</th>
            </>
          ) : null}

          <th>EDITAR</th>
          {isAdmin && <th>BORRAR</th>}
        </tr>
      </thead>
      <tbody>
        {productos.map((p) => (
          <tr key={p.id} onClick={() => manejarMostrarDetallesProducto(p.id)}>
            <td>{p.id}</td>
            <td>
              <ImagenObjeto src={`${BASE_URL}${p.IMAGEN}`} alt={p.NOMBRE} />
            </td>
            {shouldShow ? (
              <>
                <td>{p.NOMBRE}</td>
                <td>{p.CANTIDAD}</td>
                <td>{p.PRECIO}</td>
              </>
            ) : null}

            <td>
              <Button onClick={() => manejarProductoDetalles(p.id)}>
                <i className="fa-solid fa-circle-info"></i>
              </Button>
            </td>
            {/* Solo un admi puede borrar un producto */}
            {isAdmin && (
              <td>
                <Button
                  variant="danger"
                  onClick={(e) => {
                    manejarBorrarProducto(e, p.id);
                  }}
                >
                  <i className="fa-solid fa-trash"></i>
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </TableStyled>
  );
};

export default TablaProductos;
