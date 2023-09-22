import {
  FAIL_RUTA_LISTA,
  REQUEST_RUTA_LISTA,
  RESET_RUTA_LISTA,
  SUCCESS_RUTA_LISTA,
} from "../constantes/rutaConstantes";

// Exito contiene informacion del backend
export const rutaListaReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_RUTA_LISTA:
      return { loading: true };

    case SUCCESS_RUTA_LISTA:
      return { loading: false, rutas: action.payload };

    case FAIL_RUTA_LISTA:
      return { loading: false, error: action.payload };

    case RESET_RUTA_LISTA:
      return {};

    default:
      return state;
  }
};
