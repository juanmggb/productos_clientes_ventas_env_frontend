import axios from "axios";
import {
  FAIL_CUENTA_DETALLES,
  FAIL_CUENTA_UPDATE,
  REQUEST_CUENTA_DETALLES,
  REQUEST_CUENTA_UPDATE,
  SUCCESS_CUENTA_DETALLES,
  SUCCESS_CUENTA_UPDATE,
} from "../constantes/cuentaConstantes";

export const obtenerCuentaDetalles = () => async (dispatch, getState) => {
  dispatch({ type: REQUEST_CUENTA_DETALLES });

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
      `http://89.116.52.95:8080/api/cuenta-detalles/`,
      config
    );

    dispatch({ type: SUCCESS_CUENTA_DETALLES, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_CUENTA_DETALLES, payload: error.message });
  }
};

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
      `http://89.116.52.95:8080/api/modificar-cuenta/`,
      formData,
      config
    );

    dispatch({ type: SUCCESS_CUENTA_UPDATE, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_CUENTA_UPDATE, payload: error.message });
  }
};
