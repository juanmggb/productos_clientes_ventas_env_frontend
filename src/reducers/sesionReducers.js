import {
  FAIL_LOGIN_USUARIO,
  LOGOUT_USUARIO,
  REQUEST_LOGIN_USUARIO,
  SUCCESS_LOGIN_USUARIO,
} from "../constantes/sesionConstantes";

export const usuarioInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_LOGIN_USUARIO:
      return { loading: true };

    case SUCCESS_LOGIN_USUARIO:
      return { loading: false, token: action.payload };

    case FAIL_LOGIN_USUARIO:
      return { loading: false, error: action.payload };

    case LOGOUT_USUARIO:
      return {};

    // case UPDATE_USUARIO_INFO:
    //   return { loading: false, token: action.payload };

    default:
      return state;
  }
};
