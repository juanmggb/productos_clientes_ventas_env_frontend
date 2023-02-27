import {
  REQUEST_PRODUCTO_LISTA,
  SUCCESS_PRODUCTO_LISTA,
  FAIL_PRODUCTO_LISTA,
  RESET_PRODUCTO_LISTA,
  REQUEST_PRODUCTO_DETALLES,
  SUCCESS_PRODUCTO_DETALLES,
  FAIL_PRODUCTO_DETALLES,
  RESET_PRODUCTO_DETALLES,
  REQUEST_PRODUCTO_ACTUALIZAR,
  SUCCESS_PRODUCTO_ACTUALIZAR,
  FAIL_PRODUCTO_ACTUALIZAR,
  REQUEST_PRODUCTO_REGISTRAR,
  SUCCESS_PRODUCTO_REGISTRAR,
  FAIL_PRODUCTO_REGISTRAR,
  RESET_PRODUCTO_ACTUALIZAR,
  RESET_PRODUCTO_REGISTRAR,
  REQUEST_PRODUCTO_BORRAR,
  SUCCESS_PRODUCTO_BORRAR,
  FAIL_PRODUCTO_BORRAR,
  RESET_PRODUCTO_BORRAR,
} from "../constantes/productoConstantes";

// Exito contiene informacion del backend
export const productoListaReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_PRODUCTO_LISTA:
      return { loading: true };

    case SUCCESS_PRODUCTO_LISTA:
      return { loading: false, productos: action.payload };

    case FAIL_PRODUCTO_LISTA:
      return { loading: false, error: action.payload };

    case RESET_PRODUCTO_LISTA:
      return {};

    default:
      return state;
  }
};

// Exito contiene informacion del backend
export const productoDetallesReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_PRODUCTO_DETALLES:
      return { loading: true };

    case SUCCESS_PRODUCTO_DETALLES:
      return { loading: false, producto: action.payload };

    case FAIL_PRODUCTO_DETALLES:
      return { loading: false, error: action.payload };

    case RESET_PRODUCTO_DETALLES:
      return {};

    default:
      return state;
  }
};

//  No es necesario informacion del backend en exito
// En la venta exito si contiene informacion del backend
export const productoActualizarReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_PRODUCTO_ACTUALIZAR:
      return { loading: true };

    case SUCCESS_PRODUCTO_ACTUALIZAR:
      return { loading: false, success: true };

    case FAIL_PRODUCTO_ACTUALIZAR:
      return { loading: false, error: action.payload };

    case RESET_PRODUCTO_ACTUALIZAR:
      return {};

    default:
      return state;
  }
};

// No es necesario informacion del backend en exito
// En la venta exito si contiene informacion del backend
export const productoRegistrarReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_PRODUCTO_REGISTRAR:
      return { loading: true };

    case SUCCESS_PRODUCTO_REGISTRAR:
      return { loading: false, success: true };

    case FAIL_PRODUCTO_REGISTRAR:
      return { loading: false, error: action.payload };

    case RESET_PRODUCTO_REGISTRAR:
      return {};

    default:
      return state;
  }
};

//  No es necesario informacion del backend en exito
// En la venta borrar no es posible
export const productoBorrarReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_PRODUCTO_BORRAR:
      return { loading: true };

    case SUCCESS_PRODUCTO_BORRAR:
      return { loading: false, success: true };

    case FAIL_PRODUCTO_BORRAR:
      return { loading: false, error: action.payload };

    case RESET_PRODUCTO_BORRAR:
      return {};

    default:
      return state;
  }
};
