import axios from "axios";
import {
  FAIL_CUENTA_UPDATE,
  REQUEST_CUENTA_UPDATE,
  SUCCESS_CUENTA_UPDATE,
} from "../constantes/cuentaConstantes";
import { actualizarAccessToken } from "./sesionActions";
import { BASE_URL } from "../constantes/constantes";

export const actualizarCuenta = (formData) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_CUENTA_UPDATE });

  try {
    const {
      usuarioInfo: { token },
    } = getState();

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `${BASE_URL}api/modificar-cuenta/`,
      formData,
      config
    );

    dispatch({ type: SUCCESS_CUENTA_UPDATE, payload: data });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch(actualizarAccessToken(actualizarCuenta, formData));
    } else {
      dispatch({ type: FAIL_CUENTA_UPDATE, payload: error.message });
    }
  }
};
