import React from "react";
import { Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import ImagenObjeto from "../general/ImagenObjecto";
import { TableStyled } from "./styles/TablaUsuarios.styles";
import { BASE_URL } from "../../constantes/constantes";

const TablaUsuarios = ({
  usuarios,
  manejarUsuarioDetalles,
  manejarBorrarUsuario,
}) => {
  const isSmallViewport = useMediaQuery({ maxWidth: 768 });
  const shouldShow = !isSmallViewport;

  return (
    <TableStyled striped hover>
      <thead>
        <tr>
          <th>ID</th>

          <th>IMAGEN</th>
          {shouldShow ? (
            <>
              <th>USUARIO</th>
              <th>NOMBRE</th>
              <th>PERMISOS</th>
            </>
          ) : null}

          <th>EDITAR</th>
          <th>BORRAR</th>
        </tr>
      </thead>
      <tbody>
        {usuarios
          .filter((u) => u.id !== JSON.parse(localStorage.getItem("usuarioId")))
          .map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>
                <ImagenObjeto
                  src={`${BASE_URL}${u.empleado.IMAGEN}`}
                  alt={u.name}
                />
              </td>
              {shouldShow ? (
                <>
                  <td style={{ color: "white" }}>
                    {truncateTexto(u.username)}
                  </td>

                  <td style={{ color: "white" }}>{truncateTexto(u.name)}</td>
                  <td style={{ color: "white" }}>
                    {u.is_admin ? "ADMINISTRADOR" : "NO ES ADMINISTRADOR"}
                  </td>
                </>
              ) : null}

              <td>
                <Button onClick={() => manejarUsuarioDetalles(u.id)}>
                  <i className="fa-solid fa-circle-info"></i>
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={(e) => manejarBorrarUsuario(e, u.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
      </tbody>
    </TableStyled>
  );
};

const truncateTexto = (texto) => {
  if (texto.length > 10) {
    return texto.substring(0, 10) + "...";
  }
  return texto;
};

export default TablaUsuarios;
