import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../componentes/general/Loader";
import Mensaje from "../componentes/general/Mensaje";
import { pedirUsuariosLista } from "../actions/usuarioActions";
import {
  RESET_USUARIO_BORRAR,
  RESET_USUARIO_DETALLES,
} from "../constantes/usuarioConstantes";
import ConfirmarBorrarObjeto from "../componentes/general/ConfirmarBorrarObjeto";
import TablaUsuarios from "../componentes/UsuariosLista/TablaUsuarios";
import {
  StyledCol,
  StyledContainer,
  StyledRow,
} from "./styles/UsuariosLista.styles";

const UruariosLista = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();
  // Funcion para nevagar en la aplicacion
  const navigate = useNavigate();
  // Obtener lista de usuarios del Redux
  const usuarioLista = useSelector((state) => state.usuarioLista);
  const { loading, usuarios, error } = usuarioLista;

  // Obtener el estado borrar usuario del Redux
  const usuarioBorrar = useSelector((state) => state.usuarioBorrar);
  const {
    loading: loadingBorrar,
    success: successBorrar,
    error: errorBorrar,
  } = usuarioBorrar;

  // useEffect para mostrar las alertas de borrar usuario
  useEffect(() => {
    if (loadingBorrar) {
      toast.loading("Eliminando usuario");
    }

    if (successBorrar) {
      toast.dismiss();
      toast.success("Usuario eliminado exitosamente", {
        duration: 2000,
      });
      dispatch({ type: RESET_USUARIO_BORRAR });
    }

    if (errorBorrar) {
      toast.dismiss();
      toast.error("Error al eliminar usuario", {
        duration: 4000,
      });
    }
  }, [successBorrar, errorBorrar, loadingBorrar, dispatch]);

  // useEffect para pedir lista de usuarios al servidor
  useEffect(() => {
    // Si no hay usuarios, disparar la accion de pedir usuarios
    if (!usuarios) {
      dispatch(pedirUsuariosLista());
    }
  }, [dispatch, usuarios, navigate]);

  // Funcion para redireccionar a la pagina del usuario
  const manejarUsuarioDetalles = (id) => {
    // Redireccionar a la pagina del usuario
    dispatch({ type: RESET_USUARIO_DETALLES });
    navigate(`/usuarios/${id}`);
  };

  // Funcion para borrar usuario
  const manejarBorrarUsuario = (e, id) => {
    e.stopPropagation();
    toast((t) => <ConfirmarBorrarObjeto id={id} t={t} objeto={"usuario"} />, {
      duration: 5000,
    });
  };

  // Renderizar loading si se estan cargando los usuarios
  if (loading)
    return (
      <StyledContainer fluid>
        <StyledRow>
          <StyledCol>
            <Loader />
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    );

  // Renderizar mensaje de errors si el servidor regresa un error al pedir la lista de usuarios
  if (error)
    return (
      <StyledContainer fluid>
        <StyledRow>
          <StyledCol>
            <Mensaje variant="danger">
              Hubo un error al cargar la lista de usuarios
            </Mensaje>
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    );

  return (
    usuarios && (
      <StyledContainer fluid>
        <h1>Usuarios</h1>
        <StyledRow>
          <StyledCol>
            {/* Tabla de usuarios */}
            <TablaUsuarios
              usuarios={usuarios}
              manejarUsuarioDetalles={manejarUsuarioDetalles}
              manejarBorrarUsuario={manejarBorrarUsuario}
            />
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    )
  );
};

export default UruariosLista;
