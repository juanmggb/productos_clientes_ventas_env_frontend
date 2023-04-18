import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  actualizarProducto,
  obtenerProductoDetalles,
} from "../actions/productoActions";
import Loader from "../componentes/Loader";
import Mensaje from "../componentes/Mensaje";
import {
  RESET_PRODUCTO_ACTUALIZAR,
  RESET_PRODUCTO_DETALLES,
} from "../constantes/productoConstantes";
import {
  actualizarUsuario,
  obtenerUsuarioDetalles,
} from "../actions/usuarioActions";
import {
  RESET_USUARIO_ACTUALIZAR,
  RESET_USUARIO_DETALLES,
} from "../constantes/usuarioConstantes";

const UsuarioDetalles = ({ match }) => {
  // Obtener el id del usuario
  const params = useParams(match);
  const usuarioId = params.id;

  // Funcion para disparar las acciones
  const dispatch = useDispatch();

  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Obtener el estado desde el Redux store
  const usuarioDetalles = useSelector((state) => state.usuarioDetalles);
  const { loading, usuario, error } = usuarioDetalles;

  // Obtener el estado desde el Redux store
  const usuarioActualizar = useSelector((state) => state.usuarioActualizar);
  const {
    loading: loadingActualizar,
    success: successActualizar,
    error: errorActualizar,
  } = usuarioActualizar;

  const [nombre, setNombre] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Si la actualizacion fue correcta, reset productoActualizar y redireccionar a la pagina de productos
    if (successActualizar) {
      dispatch({ type: RESET_USUARIO_ACTUALIZAR });
      alert("La actualización fue exitosa");
      navigate("/usuarios");
    }

    // Si no hay producto o el producto no es el que seleccione, disparar la accion de
    // obtener usuario
    if (!usuario || usuario.id !== Number(usuarioId)) {
      dispatch(obtenerUsuarioDetalles(usuarioId));
    } else {
      setNombre(usuario.name);
      setNombreUsuario(usuario.username);
      setIsAdmin(usuario.is_admin);
    }
  }, [dispatch, usuario, usuarioId, navigate, successActualizar]);
  // successActualizar

  const manejarActualizarUsuario = (e) => {
    e.preventDefault();
    // Disparar la accion de actualizar producto

    // formData.append("PRECIO", precio);
    // if (imagen) {
    //   formData.append("IMAGEN", imagen);
    // }
    dispatch(
      actualizarUsuario({
        id: usuario.id,
        is_admin: isAdmin,
      })
    );
  };

  const manejarRegresar = () => {
    // Redireccionar a la pagina de usuarios
    dispatch({ type: RESET_USUARIO_DETALLES });
    navigate("/usuarios");
  };

  // console.log(imagen ? "Exist" : "No exist");

  return loading ? (
    <Loader />
  ) : error ? (
    <Mensaje variant="danger">{error}</Mensaje>
  ) : (
    usuario && (
      <div style={{ padding: "25px", width: "50%" }}>
        {loadingActualizar && <Loader />}
        {errorActualizar && (
          <Mensaje variant="danger">{errorActualizar}</Mensaje>
        )}
        {/* Esta es la parte que cambia en las paginas */}
        <h1>Usuario #{usuario.id}</h1>
        <Button variant="primary" onClick={manejarRegresar}>
          Regresar
        </Button>
        <Form onSubmit={manejarActualizarUsuario}>
          <Form.Group controlId="nombre">
            <Form.Label>NOMBRE</Form.Label>
            <Form.Control
              readOnly
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="nombreUsuario">
            <Form.Label>NOMBRE DE USUARIO</Form.Label>
            <Form.Control
              readOnly
              type="text"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="isAdmin">
            <Form.Label>PERMISOS</Form.Label>
            <Form.Select
              value={isAdmin}
              onChange={(e) => setIsAdmin(e.target.value)}
            >
              <option value={true}>ADMINISTRADOR</option>
              <option value={false}>NO ES ADMINISTRADOR</option>
            </Form.Select>
          </Form.Group>

          <Button className="mt-3" type="submit">
            Actualizar usuario
          </Button>
        </Form>
      </div>
    )
  );
};

export default UsuarioDetalles;
