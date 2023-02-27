import axios from "axios";
import {
  REQUEST_LOGIN_USUARIO,
  SUCCESS_LOGIN_USUARIO,
  FAIL_LOGIN_USUARIO,
} from "../constantes/usuarioConstantes";

export const login = (username, password) => async (dispatch) => {
  dispatch({ type: REQUEST_LOGIN_USUARIO });

  try {
    const { data } = await axios.post("http://127.0.0.1:8000/api/token/", {
      username,
      password,
    });
    dispatch({ type: SUCCESS_LOGIN_USUARIO, payload: data });
    localStorage.setItem("tokens", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: FAIL_LOGIN_USUARIO, payload: error.message });
  }
};
