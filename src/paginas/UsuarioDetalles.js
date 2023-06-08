import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import Loader from "../componentes/general/Loader";
import {
  actualizarUsuario,
  obtenerUsuarioDetalles,
} from "../actions/usuarioActions";
import {
  RESET_USUARIO_ACTUALIZAR,
  RESET_USUARIO_DETALLES,
} from "../constantes/usuarioConstantes";
import Mensaje from "../componentes/general/Mensaje";
import {
  StyledBoton,
  StyledCol,
  StyledContainer,
  StyledFormGroup,
  StyledRow,
} from "./styles/UsuarioDetalles.styles";

const UsuarioDetalles = ({ match }) => {
  // Obtener el id del usuario
  const params = useParams(match);
  const usuarioId = params.id;

  // Funcion para disparar las acciones
  const dispatch = useDispatch();

  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Obtener la informacion del usuario del Redux
  const usuarioDetalles = useSelector((state) => state.usuarioDetalles);
  const { loading, usuario, error } = usuarioDetalles;

  // Obtener el estado de actualizar cliente del Redux
  const usuarioActualizar = useSelector((state) => state.usuarioActualizar);
  const {
    loading: loadingActualizar,
    success: successActualizar,
    error: errorActualizar,
  } = usuarioActualizar;

  //
  const [nombre, setNombre] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // useEffect para mostrar las alertas
  useEffect(() => {
    if (loadingActualizar) {
      toast.remove();
      toast.loading("Actualizando usuario");
    }

    if (successActualizar) {
      toast.remove();
      toast.success("Usuario actualizado");
      dispatch({ type: RESET_USUARIO_ACTUALIZAR });
      navigate("/usuarios");
    }

    if (errorActualizar) {
      toast.dismiss();
      toast.error("Error al actualizar usuario");
    }
  }, [
    successActualizar,
    errorActualizar,
    loadingActualizar,
    dispatch,
    navigate,
  ]);

  // Si no hay producto o el producto no es el que seleccione, disparar la accion de
  // obtener usuario
  useEffect(() => {
    if (!usuario || usuario.id !== Number(usuarioId)) {
      dispatch(obtenerUsuarioDetalles(usuarioId));
    } else {
      setNombre(usuario.name);
      setNombreUsuario(usuario.username);
      setIsAdmin(usuario.is_admin);
    }
  }, [dispatch, usuario, usuarioId]);

  const manejarActualizarUsuario = (e) => {
    e.preventDefault();

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

  if (loading)
    return (
      <StyledContainer fluid>
        <StyledRow style={{ height: "80%" }}>
          <StyledCol>
            <Loader />
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    );

  if (error)
    return (
      <StyledContainer fluid>
        <StyledRow style={{ height: "80%" }}>
          <StyledCol>
            <Mensaje variant="danger">
              Hubo un problema al cargar la informacion del usuario
            </Mensaje>
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    );

  return (
    usuario && (
      <StyledContainer fluid>
        <StyledRow>
          <StyledCol>
            <h1>Usuario #{usuario.id}</h1>
            <StyledBoton variant="primary" onClick={manejarRegresar}>
              Regresar
            </StyledBoton>
          </StyledCol>
        </StyledRow>
        <Form onSubmit={manejarActualizarUsuario}>
          <StyledRow>
            <StyledCol md={8}>
              <StyledFormGroup controlId="nombre">
                <Form.Label>NOMBRE</Form.Label>
                <Form.Control
                  readOnly
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                ></Form.Control>
              </StyledFormGroup>

              <StyledFormGroup controlId="nombreUsuario">
                <Form.Label>NOMBRE DE USUARIO</Form.Label>
                <Form.Control
                  readOnly
                  type="text"
                  value={nombreUsuario}
                  onChange={(e) => setNombreUsuario(e.target.value)}
                ></Form.Control>
              </StyledFormGroup>

              <StyledFormGroup controlId="isAdmin">
                <Form.Label>PERMISOS</Form.Label>
                <Form.Select
                  value={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.value)}
                >
                  <option value={true}>ADMINISTRADOR</option>
                  <option value={false}>NO ES ADMINISTRADOR</option>
                </Form.Select>
              </StyledFormGroup>

              <StyledBoton type="submit">Actualizar usuario</StyledBoton>
            </StyledCol>
          </StyledRow>
        </Form>
      </StyledContainer>
    )
  );
};

export default UsuarioDetalles;
