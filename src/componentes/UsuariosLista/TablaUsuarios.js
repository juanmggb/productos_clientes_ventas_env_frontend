import React from "react";
import { Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import ImagenObjeto from "../general/ImagenObjecto";
import { TableStyled } from "./styles/TablaUsuarios.styles";
import { BASE_URL } from "../../constantes/constantes";
import UseScreenSize from "../../paginas/utilis/UseScreenSize";

const TablaUsuarios = ({
  usuarios,
  manejarUsuarioDetalles,
  manejarBorrarUsuario,
}) => {
  const isSmallViewport = useMediaQuery({ maxWidth: 768 });
  const shouldShow = !isSmallViewport;
  const {alto, ancho} = UseScreenSize();

  return (
    <TableStyled striped hover>
      <thead>
        <tr>
          <th>ID</th>
          {ancho > 720 ? (<th>IMAGEN</th>) : null}
          <th>USUARIO</th>
          
          {ancho > 870 ? (<th>NOMBRE</th>) : null}
          {ancho > 480 ? (<th>PERMISOS</th>) : null}
          
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
              {ancho > 720 ? (
                <td>
                  <ImagenObjeto
                    src={`${BASE_URL}${u.empleado.IMAGEN}`}
                    alt={u.name}
                 />
                </td>) : null}
              
              {ancho > 870 ? (
                <td style={{ color: "white" }}>
                  {truncateTexto(u.username)}
                </td>) : null}

              <td style={{ color: "white" }}>{truncateTexto(u.name)}</td>
              {ancho > 480 ? (
              <td style={{ color: "white" }}>
                {(ancho > 620) ? (u.is_admin ? "ADMINISTRADOR" : "NO ES ADMINISTRADOR") :
                  u.is_admin ? "ADM" : "NO ADM"
                }
              </td>) : null}

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
