import axios from "axios";
import {
  REQUEST_USUARIO_LISTA,
  SUCCESS_USUARIO_LISTA,
  FAIL_USUARIO_LISTA,
  REQUEST_USUARIO_DETALLES,
  SUCCESS_USUARIO_DETALLES,
  FAIL_USUARIO_DETALLES,
  REQUEST_USUARIO_REGISTRAR,
  SUCCESS_USUARIO_REGISTRAR,
  RESET_USUARIO_LISTA,
  FAIL_USUARIO_REGISTRAR,
  REQUEST_USUARIO_ACTUALIZAR,
  SUCCESS_USUARIO_ACTUALIZAR,
  FAIL_USUARIO_ACTUALIZAR,
  REQUEST_USUARIO_BORRAR,
  SUCCESS_USUARIO_BORRAR,
  FAIL_USUARIO_BORRAR,
} from "../constantes/usuarioConstantes";
import { actualizarAccessToken } from "./sesionActions";
import { BASE_URL } from "../constantes/constantes";

// Estos si se quedan aqui
export const pedirUsuariosLista = () => async (dispatch, getState) => {
  dispatch({ type: REQUEST_USUARIO_LISTA });

  try {

    const {
      usuarioInfo: { token },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}api/usuarios/`, config);

    dispatch({ type: SUCCESS_USUARIO_LISTA, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_USUARIO_LISTA, payload: error.message });

    // Redirect user to "/" page if error is due to expired token
    if (error.response && error.response.status === 401) {
      dispatch(actualizarAccessToken(pedirUsuariosLista));
    }
  }
};

// Creador de acciones para pedir el producto con el id del backend
export const obtenerUsuarioDetalles = (id) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_USUARIO_DETALLES });

  try {
    const {
      usuarioInfo: { token },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}api/usuarios/${id}/`, config);

    dispatch({ type: SUCCESS_USUARIO_DETALLES, payload: data });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch(actualizarAccessToken(obtenerUsuarioDetalles, id));
    } else {
      dispatch({ type: FAIL_USUARIO_DETALLES, payload: error.message });
    }
  }
};

export const actualizarUsuario = (usuario) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_USUARIO_ACTUALIZAR });

  try {
    const {
      usuarioInfo: { token },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${BASE_URL}api/modificar-usuario/${usuario.id}/`,
      usuario,
      config
    );

    dispatch({ type: SUCCESS_USUARIO_ACTUALIZAR });
    dispatch({ type: RESET_USUARIO_LISTA });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch(actualizarAccessToken(actualizarUsuario, usuario));
    } else {
      dispatch({ type: FAIL_USUARIO_ACTUALIZAR, payload: error.message });
    }
  }
};

// Creador de acciones para registrar un nuevo producto en el backend
export const registrarUsuario = (formData) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_USUARIO_REGISTRAR });

  try {
    const {
      usuarioInfo: { token },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}api/crear-cuenta/`,
      formData,
      config
    );

    dispatch({ type: SUCCESS_USUARIO_REGISTRAR });
    dispatch({ type: RESET_USUARIO_LISTA });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch(actualizarAccessToken(registrarUsuario, formData));
    } else {
      dispatch({ type: FAIL_USUARIO_REGISTRAR, payload: error.message });
    }
  }
};

export const borrarUsuario = (id) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_USUARIO_BORRAR });

  try {
    const {
      usuarioInfo: { token },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(
      `${BASE_URL}api/modificar-usuario/${id}/`,
      config
    );

    dispatch({ type: SUCCESS_USUARIO_BORRAR });
    dispatch({ type: RESET_USUARIO_LISTA });

  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch(actualizarAccessToken(borrarUsuario, id));
    } else {
      dispatch({ type: FAIL_USUARIO_BORRAR, payload: error.message });
    }
  }
};
