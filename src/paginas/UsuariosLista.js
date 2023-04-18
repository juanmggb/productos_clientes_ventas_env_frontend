import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

  useEffect(() => {
    if (successBorrar) {
      dispatch({ type: RESET_USUARIO_BORRAR });
      alert("La eliminación fue exitosa");
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

  return loading ? (
    <Loader />
  ) : error ? (
    <Mensaje variant="danger">{error}</Mensaje>
  ) : (
    usuarios && (
      <div style={{ padding: "25px" }}>
        {loadingBorrar && <Loader />}
        {errorBorrar && <Mensaje variant="danger">{errorBorrar}</Mensaje>}
        {/* Esta el la parte que cambia en las paginas */}
        <h1>Usuarios</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOMBRE DE USUARIO</th>
              {shouldShow ? (
                <>
                  <th>IMAGEN</th>
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
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  {shouldShow ? (
                    <>
                      <td>
                        <ImagenObjeto
                          src={`http://127.0.0.1:8000/${u.empleado.IMAGEN}`}
                          alt={u.name}
                        />
                      </td>
                      <td>{u.name}</td>
                      <td>
                        {u.is_admin ? "AMINISTRADOR" : "NO ES ADMINISTRADOR"}
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
                      onClick={() => manejarBorrarUsuario(u.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    )
  );
};

export default UruariosLista;
