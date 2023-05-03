import axios from "axios";
import jwt_decode from "jwt-decode";

import {
  REQUEST_LOGIN_USUARIO,
  SUCCESS_LOGIN_USUARIO,
  FAIL_LOGIN_USUARIO,
  LOGOUT_USUARIO,
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

export const login = (username, password) => async (dispatch) => {
  dispatch({ type: REQUEST_LOGIN_USUARIO });

  try {
    const { data } = await axios.post("http://89.116.52.95:8080/api/token/", {
      username,
      password,
    });
    dispatch({ type: SUCCESS_LOGIN_USUARIO, payload: data.access });

    localStorage.setItem("accessToken", JSON.stringify(data.access));
    localStorage.setItem("usuarioId", JSON.stringify(data.id));
    localStorage.setItem("refreshToken", JSON.stringify(data.refresh));
    localStorage.setItem("isAdmin", JSON.stringify(data.is_admin));
    localStorage.setItem("name", JSON.stringify(data.name));
    localStorage.setItem("username", JSON.stringify(data.username));
    localStorage.setItem("imagen", JSON.stringify(data.empleado.IMAGEN));
  } catch (error) {
    dispatch({ type: FAIL_LOGIN_USUARIO, payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("usuarioId");
  localStorage.removeItem("username");
  localStorage.removeItem("name");
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("refreshToken");

  // I don't remember why i din't delete this
  localStorage.removeItem("imagen");
  localStorage.removeItem("usuarios");
  localStorage.removeItem("productos");
  localStorage.removeItem("clientes");

  dispatch({ type: LOGOUT_USUARIO });
  window.location.href = "/login";
};

export const actualizarAccessToken = (link) => async (dispatch) => {
  // console.log("Here 2", tokens.refresh);
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  try {
    // Send a post request to the backend to get a new access token using the refresh token
    const { data } = await axios.post(
      "http://89.116.52.95:8080/api/token/refresh/",
      {
        refresh: refreshToken,
      }
    );

    localStorage.setItem("accessToken", JSON.stringify(data.access));
    // Update the `accessToken` state with the new token
    dispatch({ type: SUCCESS_LOGIN_USUARIO, payload: data.access });
    window.location.href = link;
  } catch (error) {
    alert("Tu sesión ha caducado. Inicia sesión de nuevo por favor");
    dispatch(logout());
  }
};

export const isTokenValid = (accessToken) =>
  jwt_decode(accessToken).exp >= Date.now() / 1000;

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

    const { data } = await axios.get(
      "http://89.116.52.95:8080/api/usuarios/",
      config
    );

    dispatch({ type: SUCCESS_USUARIO_LISTA, payload: data });
    // Guardar los usuarios en el localStorage
    localStorage.setItem("usuarios", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: FAIL_USUARIO_LISTA, payload: error.message });

    // Redirect user to "/" page if error is due to expired token
    if (error.response && error.response.status === 401) {
      dispatch(actualizarAccessToken("/usuarios"));
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
    const { data } = await axios.get(
      `http://89.116.52.95:8080/api/usuarios/${id}/`,
      config
    );

    dispatch({ type: SUCCESS_USUARIO_DETALLES, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_USUARIO_DETALLES, payload: error.message });
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
      `http://89.116.52.95:8080/api/modificar-usuario/${usuario.id}/`,
      usuario,
      config
    );

    dispatch({ type: SUCCESS_USUARIO_ACTUALIZAR });
    dispatch({ type: RESET_USUARIO_LISTA });
    // Debo volver a pedir la lista de clientes del bakcend
    // dispatch({ type: RESET_CLIENTE_LISTA });
    // Debo volver a pedir la lista de ventas del backend
    // dispatch({ type: RESET_VENTA_LISTA });
  } catch (error) {
    dispatch({ type: FAIL_USUARIO_ACTUALIZAR, payload: error.message });
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
      "http://89.116.52.95:8080/api/crear-cuenta/",
      formData,
      config
    );

    dispatch({ type: SUCCESS_USUARIO_REGISTRAR });
    dispatch({ type: RESET_USUARIO_LISTA });
    // Debo volver a pedir la lista de clientes del bakcend
    // dispatch({ type: RESET_CLIENTE_LISTA });
    // Debo volver a pedir la lista de ventas del backend
    // dispatch({ type: RESET_VENTA_LISTA });
  } catch (error) {
    dispatch({ type: FAIL_USUARIO_REGISTRAR, payload: error.message });
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
      `http://89.116.52.95:8080/api/modificar-usuario/${id}/`,
      config
    );

    dispatch({ type: SUCCESS_USUARIO_BORRAR });
    dispatch({ type: RESET_USUARIO_LISTA });
    // Debo volver a pedir la lista de clientes del bakcend
    // dispatch({ type: RESET_CLIENTE_LISTA });
    // Debo volver a pedir la lista de ventas del backend
    // dispatch({ type: RESET_VENTA_LISTA });
  } catch (error) {
    dispatch({ type: FAIL_USUARIO_BORRAR, payload: error.message });
  }
};
