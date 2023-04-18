import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registrarProducto } from "../actions/productoActions";
import Loader from "../componentes/Loader";
import Mensaje from "../componentes/Mensaje";
import { RESET_PRODUCTO_REGISTRAR } from "../constantes/productoConstantes";
import { RESET_USUARIO_REGISTRAR } from "../constantes/usuarioConstantes";
import { registrarUsuario } from "../actions/usuarioActions";

const RegistrarUsuario = () => {
  // Funcion para disparar acciones
  const dispatch = useDispatch();

  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Obtener el estado desde el Redux store
  const usuarioRegistrar = useSelector((state) => state.usuarioRegistrar);
  const {
    loading: loadingRegistrar,
    success: succcessRegistrar,
    error: errorRegistrar,
  } = usuarioRegistrar;

  const [nombre, setNombre] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [imagen, setImagen] = useState(null);

  useEffect(() => {
    // Si el registro fue correcto, reset productoRegistrar y redireccionar a la pagina de productos
    if (succcessRegistrar) {
      dispatch({ type: RESET_USUARIO_REGISTRAR });
      alert("El registro fue exitoso");
      navigate("/usuarios");
    }
  }, [navigate, succcessRegistrar, dispatch]);

  const manejarRegistrarUsuario = (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      window.confirm("Las contraseñas deben ser iguales");
    } else {
      const formData = new FormData();

      formData.append("name", nombre);
      formData.append("username", nombreUsuario);
      formData.append("is_admin", isAdmin);
      formData.append("password1", password1);
      formData.append("password2", password2);
      if (imagen) {
        formData.append("IMAGEN", imagen);
      }

      // Disparar la accion de actualizar producto
      dispatch(registrarUsuario(formData));
    }
  };

  // Aqui no es necesario empezar con loading porque no hay un estado necesario al cargar el componente.
  return (
    <div style={{ padding: "25px", width: "50%" }}>
      {loadingRegistrar && <Loader />}
      {errorRegistrar && <Mensaje variant="danger">{errorRegistrar}</Mensaje>}
      {/* Esta es la parte que cambia en las paginas */}
      <h1>Registrar usuario</h1>
      <Form onSubmit={manejarRegistrarUsuario}>
        <Form.Group controlId="nombre">
          <Form.Label>NOMBRE</Form.Label>
          <Form.Control
            required
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="nombreUsuario">
          <Form.Label>NOMBRE DE USUARIO</Form.Label>
          <Form.Control
            required
            type="text"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password1">
          <Form.Label>CONTRASEÑA</Form.Label>
          <Form.Control
            required
            type="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password2">
          <Form.Label>CONFIRMAR CONTRASEÑA</Form.Label>
          <Form.Control
            required
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
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

        {/* <Form.Group controlId="formImage">
          <Form.Label>IMAGEN</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImagen(e.target.files[0])}
          />
        </Form.Group> */}

        <Button className="mt-3" type="submit">
          Registrar usuario
        </Button>
      </Form>
    </div>
  );
};

export default RegistrarUsuario;
