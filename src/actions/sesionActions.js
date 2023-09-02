import axios from "axios";
import {
  FAIL_LOGIN_USUARIO,
  LOGOUT_USUARIO,
  REQUEST_LOGIN_USUARIO,
  SUCCESS_LOGIN_USUARIO,
} from "../constantes/sesionConstantes";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../constantes/constantes";

// Estos tres hay que separarlos (ESTOS SON LOS UNICOS QUE NO ENVIAN EL ACCESS TOKEN AL SERVIDOR)
export const login = (username, password) => async (dispatch) => {
  dispatch({ type: REQUEST_LOGIN_USUARIO });

  try {
    // En point de inicio de sesion. Este endpoint esta configurado para regresar no solo el access y refresh token, sino tambien informacion del usuario logeado. Por ejempl, sus perminos, imagen y nombre
    const { data } = await axios.post(`${BASE_URL}api/token/`, {
      username,
      password,
    });
    dispatch({ type: SUCCESS_LOGIN_USUARIO, payload: data.access });

    // Why is all information necessary in the localStorage
    localStorage.setItem("accessToken", JSON.stringify(data.access));
    localStorage.setItem("refreshToken", JSON.stringify(data.refresh));
    // Informacion del usuario
    localStorage.setItem("usuarioId", JSON.stringify(data.id));
    localStorage.setItem("isAdmin", JSON.stringify(data.is_admin));
    localStorage.setItem("name", JSON.stringify(data.name));
    localStorage.setItem("username", JSON.stringify(data.username));
    localStorage.setItem("imagen", JSON.stringify(data.empleado.IMAGEN));
  } catch (error) {
    dispatch({ type: FAIL_LOGIN_USUARIO, payload: error.message });
  }
};

export const logout = () => {
  return (dispatch) => {
    // Puedes borrar todo el contenido del localStorage usando localStorage.clear(). Este método eliminará todos los pares clave-valor almacenados en el objeto localStorage para ese dominio.
    localStorage.clear();

    dispatch({ type: LOGOUT_USUARIO });
    window.location.href = "/login";
    // navigate("/login");
  };
};

// ESTE ES EL UNICO QUE ENVIA EL REFRESH TOKEN AL SERVIDOR
export const actualizarAccessToken =
  (action, ...parametrosOpcionales) =>
  async (dispatch) => {
    try {
      // Obtener refresh token del localStorage
      const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));

      // Crear header con tipo de datos a enviar
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      // Endpoint de actualizacion de access token. Recibir respuesta del backend
      const { data } = await axios.post(
        `${BASE_URL}api/token/refresh/`,
        { refresh: refreshToken },
        config
      );
      const accessToken = data.access;

      // Guardar el accessToken actualizado en el localStorage y el Redux store
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
      dispatch({ type: SUCCESS_LOGIN_USUARIO, payload: accessToken });
      // Volver a disparar la accion en la que ocurrio el error 401
      await dispatch(action(...parametrosOpcionales));
    } catch (error) {
      toast.error("Tu sesión ha caducado. Inicia sesión de nuevo por favor", {
        duration: 5000,
      });
      dispatch(logout());
    }
  };
