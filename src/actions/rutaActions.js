import axios from "axios";
import {
  FAIL_RUTA_LISTA,
  REQUEST_RUTA_LISTA,
  SUCCESS_RUTA_LISTA,
} from "../constantes/rutaConstantes";

// Creador de acciones para pedir las rutas del backend
export const pedirRutasLista = () => async (dispatch, getState) => {
  dispatch({ type: REQUEST_RUTA_LISTA });

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

    const { data } = await axios.get("/api/rutas-registrar-cliente/", config);

    dispatch({ type: SUCCESS_RUTA_LISTA, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_RUTA_LISTA, payload: error.message });
  }
};
