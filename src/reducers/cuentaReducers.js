import {
  FAIL_CUENTA_UPDATE,
  REQUEST_CUENTA_UPDATE,
  RESET_CUENTA_UPDATE,
  SUCCESS_CUENTA_UPDATE,
} from "../constantes/cuentaConstantes";

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
