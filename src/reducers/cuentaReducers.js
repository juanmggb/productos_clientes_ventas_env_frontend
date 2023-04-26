import {
  FAIL_CUENTA_DETALLES,
  FAIL_CUENTA_UPDATE,
  REQUEST_CUENTA_DETALLES,
  REQUEST_CUENTA_UPDATE,
  RESET_CUENTA_DETALLES,
  RESET_CUENTA_UPDATE,
  SUCCESS_CUENTA_DETALLES,
  SUCCESS_CUENTA_UPDATE,
} from "../constantes/cuentaConstantes";

// Exito contiene informacion del backend
export const cuentaDetallesReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_CUENTA_DETALLES:
      return { loading: true };

    case SUCCESS_CUENTA_DETALLES:
      return { loading: false, cuenta: action.payload };

    case FAIL_CUENTA_DETALLES:
      return { loading: false, error: action.payload };

    case RESET_CUENTA_DETALLES:
      return {};

    default:
      return state;
  }
};

export const cuentaActualizarReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_CUENTA_UPDATE:
      return { loading: true };

    case SUCCESS_CUENTA_UPDATE:
      return { loading: false, success: true };

    case FAIL_CUENTA_UPDATE:
      return { loading: false, error: action.payload };

    case RESET_CUENTA_UPDATE:
      return {};

    default:
      return state;
  }
};
