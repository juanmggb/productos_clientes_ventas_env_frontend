import React, { useEffect, useState } from "react";
import { Button, Form, Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-hot-toast';
import styled from 'styled-components';
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

// Estilos CSS con styled components
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
  padding: 30px;
  user-select: none;

  display: flex;
  flex-direction: column;
  align-items: center;

  & h1 {
    color: white;
  }

  & button {
    margin: 10px 0px;
  }

  // Estilos para smarthphone
  @media (max-width: 480px) and (orientation: portrait) {
    height: 90svh;

    & h1 {
    font-weight: bold;
    }
  }

  // Estilos pc
  @media (min-width: 480px) {

    & button {
      width: 200px;
    }

    & div {
      width: 50vw;
    }
  }
`;

// Estilos Form.Group
const FormGroupStyled = styled(Form.Group)`
  display: flex;
  flex-direction:column;
  gap: 5px;
  margin-bottom: 5px;

  & label {
     color: white;
     font-weight: bold;
  }

  & input, select {
     color: black;
     font-weight: bold;
  }
`;

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

  // useEffect para mostrar las alertas
  useEffect(() => {
  
    if (loadingActualizar) {
      toast.remove();
      toast.loading('Actualizando usuario');
    }

    if (successActualizar) {
      toast.remove();
      toast.success('Usuario actualizado');
    }
    
    if (errorActualizar) {
      toast.dismiss();
      toast.error('Error al actualizar usuario');
    }
    }, [successActualizar, errorActualizar, loadingActualizar])

  useEffect(() => {
    // Si la actualizacion fue correcta, reset productoActualizar y redireccionar a la pagina de productos
    if (successActualizar) {
      dispatch({ type: RESET_USUARIO_ACTUALIZAR });
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
    <Principal><Loader /></Principal>
  ) : error ? (
      <Principal>{ toast.error('Error en el servidor') }</Principal>
  ) : (
    usuario && (
      <Principal>
        {/* Esta es la parte que cambia en las paginas */}
        <h1>Usuario #{usuario.id}</h1>
        <Button variant="primary" onClick={manejarRegresar}>
          Regresar
        </Button>
        <Container centered>
        <Form onSubmit={manejarActualizarUsuario}>
        <Row>
          <Col>
          <FormGroupStyled controlId="nombre">
            <Form.Label>NOMBRE</Form.Label>
            <Form.Control
              readOnly
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            ></Form.Control>
          </FormGroupStyled>

          <FormGroupStyled controlId="nombreUsuario">
            <Form.Label>NOMBRE DE USUARIO</Form.Label>
            <Form.Control
              readOnly
              type="text"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
            ></Form.Control>
          </FormGroupStyled>

          <FormGroupStyled controlId="isAdmin">
            <Form.Label>PERMISOS</Form.Label>
            <Form.Select
              value={isAdmin}
              onChange={(e) => setIsAdmin(e.target.value)}
            >
              <option value={true}>ADMINISTRADOR</option>
              <option value={false}>NO ES ADMINISTRADOR</option>
            </Form.Select>
          </FormGroupStyled>

          <Button className="mt-3" type="submit">
            Actualizar usuario
          </Button>
          </Col>
          </Row>
        </Form>
        </Container>
      </Principal>
    )
  );
};

export default UsuarioDetalles;
