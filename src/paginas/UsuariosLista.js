import React, { useEffect } from "react";
import { Button, Table, Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import { Icono } from "../styledComponents/alertaEliminar";
import {
  borrarProducto,
  pedirProductosLista,
} from "../actions/productoActions";
import Loader from "../componentes/Loader";
import Mensaje from "../componentes/Mensaje";
import {
  RESET_PRODUCTO_BORRAR,
  RESET_PRODUCTO_DETALLES,
} from "../constantes/productoConstantes";
import ImagenProducto from "../componentes/ImagenObjeto";
import { useMediaQuery } from "react-responsive";
import { borrarUsuario, pedirUsuariosLista } from "../actions/usuarioActions";
import {
  RESET_USUARIO_BORRAR,
  RESET_USUARIO_DETALLES,
} from "../constantes/usuarioConstantes";
import ImagenObjeto from "../componentes/ImagenObjeto";

// Estilos de la página principal
const Principal = styled.div`
  position: fixed;
  background: linear-gradient(
    rgb(54, 54, 82),
    15%,
    rgb(84, 106, 144),
    60%,
    rgb(68, 111, 151)
  );

  height: 90vh;
  width: 100vw;
  padding: 0px 10px;
  user-select: none;

  display: flex;
  flex-direction: column;
  align-items: center;

  & div {
    font-size: 1.8em;
    height: 10vh;
    padding-top: 10px;
    color: white;
  }
  // Estilos para smarthphone
  @media (max-width: 480px) and (orientation: portrait) {
    height: 90svh;

    & div {
      height: 10vsh;
      font-weight: bold;
    }
  }
`;

// Estilos de la tabla
const TableStyled = styled(Table)`
  & tbody {
    height: 75svh;
    display: block;

    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;

    color: white;
  }

  & thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed; /* even columns width , fix width of table too*/

    color: white;
  }

  & th {
    text-align: center;
    vertical-align: middle;
  }

  & td {
    text-align: center;
    vertical-align: middle;
  }
`;

const UruariosLista = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();
  // Funcion para nevagar en la aplicacion
  const navigate = useNavigate();
  // Obtener el estado desde el Redux store
  const usuarioLista = useSelector((state) => state.usuarioLista);
  const { loading, usuarios, error } = usuarioLista;

  // Obtener el estado desde el Redux sotore
  const usuarioBorrar = useSelector((state) => state.usuarioBorrar);
  const {
    loading: loadingBorrar,
    success: successBorrar,
    error: errorBorrar,
  } = usuarioBorrar;

  const isSmallViewport = useMediaQuery({ maxWidth: 768 });
  const shouldShow = !isSmallViewport;

  // useEffect para mostrar las alertas
  useEffect(() => {
    if (loadingBorrar) {
      toast.loading("Eliminando usuario");
    }

    if (successBorrar) {
      toast.dismiss();
      toast.success("Usuario eliminado exitosamente", {
        duration: 2000,
      });
    }

    if (errorBorrar) {
      toast.dismiss();
      toast.error("Error al eliminar usuario", {
        duration: 2000,
      });
    }
  }, [successBorrar, errorBorrar, loadingBorrar]);

  useEffect(() => {
    if (successBorrar) {
      dispatch({ type: RESET_USUARIO_BORRAR });
    }

    // Si no hay usuarios, disparar la accion de pedir usuarios
    if (!usuarios) {
      dispatch(pedirUsuariosLista());
    }
  }, [dispatch, usuarios, successBorrar]);
  //   successBorrar

  const manejarUsuarioDetalles = (id) => {
    // Redireccionar a la pagina del usuario
    dispatch({ type: RESET_USUARIO_DETALLES });
    navigate(`/usuarios/${id}`);
  };

  const manejarBorrarUsuario = (id) => {
    if (window.confirm("¿Está seguro de eliminar este usuario")) {
      dispatch(borrarUsuario(id));
    } else {
      alert("Operación cancelada");
    }
  };

  // Funcion para mostrar la alerta de eliminar producto
  const alertaBorrarUsuario = (id) => {
    toast(
      (t) => (
        <Container>
          <Row>Estás seguro de eliminar el usuario?</Row>
          <Row>
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "5px",
              }}
            >
              <Icono
                onClick={() => {
                  dispatch(borrarUsuario(id));
                  toast.dismiss(t.id);
                }}
              >
                <i
                  class="fa-solid fa-circle-check fa-2xl"
                  style={{ color: "#67ce00" }}
                ></i>
              </Icono>
            </Col>
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "5px",
              }}
            >
              <Icono
                onClick={() => {
                  toast.dismiss(t.id);
                  toast.error("Operacion cancelada", { duration: 2000 });
                }}
              >
                <i
                  class="fa-sharp fa-solid fa-circle-xmark fa-2xl"
                  style={{ color: "#ff0000" }}
                ></i>
              </Icono>
            </Col>
          </Row>
        </Container>
      ),
      { duration: 5000 }
    );
  };

  return loading ? (
    <Principal>
      <Loader />
    </Principal>
  ) : error ? (
    <Principal>{toast.error("Error en el servidor")}</Principal>
  ) : (
    usuarios && (
      <Principal>
        {/* Esta el la parte que cambia en las paginas */}
        <div>Usuarios</div>
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
              .filter(
                (u) => u.id !== JSON.parse(localStorage.getItem("usuarioId"))
              )
              .map((u) => (
                <tr key={u.id}>
                  <td style={{ color: "white" }}>{u.id}</td>
                  <td style={{ color: "white" }}>
                    <ImagenObjeto
                      src={`http://89.116.52.95:8080/${u.empleado.IMAGEN}`}
                      alt={u.name}
                    />
                  </td>
                  {shouldShow ? (
                    <>
                      <td style={{ color: "white" }}>{u.username}</td>

                      <td style={{ color: "white" }}>{u.name}</td>
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
                      onClick={() => alertaBorrarUsuario(u.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </TableStyled>
      </Principal>
    )
  );
};

export default UruariosLista;
