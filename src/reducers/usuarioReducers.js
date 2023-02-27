import {
  REQUEST_LOGIN_USUARIO,
  SUCCESS_LOGIN_USUARIO,
  FAIL_LOGIN_USUARIO,
  LOGOUT_USUARIO,
} from "../constantes/usuarioConstantes";

export const usuarioInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_LOGIN_USUARIO:
      return { loading: true };

    case SUCCESS_LOGIN_USUARIO:
      return { loading: false, tokens: action.payload };

    case FAIL_LOGIN_USUARIO:
      return { loading: false, error: action.payload };

    case LOGOUT_USUARIO:
      return {};

    default:
      return state;
  }
};
