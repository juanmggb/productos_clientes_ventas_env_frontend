import {
  REQUEST_USUARIO_LISTA,
  SUCCESS_USUARIO_LISTA,
  FAIL_USUARIO_LISTA,
  RESET_USUARIO_LISTA,
  REQUEST_USUARIO_DETALLES,
  SUCCESS_USUARIO_DETALLES,
  FAIL_USUARIO_DETALLES,
  RESET_USUARIO_DETALLES,
  REQUEST_USUARIO_REGISTRAR,
  SUCCESS_USUARIO_REGISTRAR,
  FAIL_USUARIO_REGISTRAR,
  RESET_USUARIO_REGISTRAR,
  REQUEST_USUARIO_ACTUALIZAR,
  SUCCESS_USUARIO_ACTUALIZAR,
  FAIL_USUARIO_ACTUALIZAR,
  RESET_USUARIO_ACTUALIZAR,
  REQUEST_USUARIO_BORRAR,
  SUCCESS_USUARIO_BORRAR,
  FAIL_USUARIO_BORRAR,
  RESET_USUARIO_BORRAR,
} from "../constantes/usuarioConstantes";

export const usuarioListaReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_USUARIO_LISTA:
      return { loading: true };

    case SUCCESS_USUARIO_LISTA:
      return { loading: false, usuarios: action.payload };

    case FAIL_USUARIO_LISTA:
      return { loading: false, error: action.payload };

    case RESET_USUARIO_LISTA:
      return {};

    default:
      return state;
  }
};

// Exito contiene informacion del backend
export const usuarioDetallesReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_USUARIO_DETALLES:
      return { loading: true };

    case SUCCESS_USUARIO_DETALLES:
      return { loading: false, usuario: action.payload };

    case FAIL_USUARIO_DETALLES:
      return { loading: false, error: action.payload };

    case RESET_USUARIO_DETALLES:
      return {};

    default:
      return state;
  }
};

export const usuarioActualizarReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_USUARIO_ACTUALIZAR:
      return { loading: true };

    case SUCCESS_USUARIO_ACTUALIZAR:
      return { loading: false, success: true };

    case FAIL_USUARIO_ACTUALIZAR:
      return { loading: false, error: action.payload };

    case RESET_USUARIO_ACTUALIZAR:
      return {};

    default:
      return state;
  }
};

export const usuarioRegistrarReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_USUARIO_REGISTRAR:
      return { loading: true };

    case SUCCESS_USUARIO_REGISTRAR:
      return { loading: false, success: true };

    case FAIL_USUARIO_REGISTRAR:
      return { loading: false, error: action.payload };

    case RESET_USUARIO_REGISTRAR:
      return {};

    default:
      return state;
  }
};

export const usuarioBorrarReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_USUARIO_BORRAR:
      return { loading: true };

    case SUCCESS_USUARIO_BORRAR:
      return { loading: false, success: true };

    case FAIL_USUARIO_BORRAR:
      return { loading: false, error: action.payload };

    case RESET_USUARIO_BORRAR:
      return {};

    default:
      return state;
  }
};
