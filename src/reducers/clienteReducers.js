import {
  FAIL_CLIENTE_ACTUALIZAR,
  FAIL_CLIENTE_BORRAR,
  FAIL_CLIENTE_DETALLES,
  FAIL_CLIENTE_LISTA,
  FAIL_CLIENTE_REGISTRAR,
  FAIL_CLIENTE_VENTA_LISTA,
  REQUEST_CLIENTE_ACTUALIZAR,
  REQUEST_CLIENTE_BORRAR,
  REQUEST_CLIENTE_DETALLES,
  REQUEST_CLIENTE_LISTA,
  REQUEST_CLIENTE_REGISTRAR,
  REQUEST_CLIENTE_VENTA_LISTA,
  RESET_CLIENTE_ACTUALIZAR,
  RESET_CLIENTE_BORRAR,
  RESET_CLIENTE_DETALLES,
  RESET_CLIENTE_LISTA,
  RESET_CLIENTE_REGISTRAR,
  RESET_CLIENTE_VENTA_LISTA,
  SUCCESS_CLIENTE_ACTUALIZAR,
  SUCCESS_CLIENTE_BORRAR,
  SUCCESS_CLIENTE_DETALLES,
  SUCCESS_CLIENTE_LISTA,
  SUCCESS_CLIENTE_REGISTRAR,
  SUCCESS_CLIENTE_VENTA_LISTA,
} from "../constantes/clienteConstantes";

// Exito contiene informacion del backend
export const clienteListaReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_CLIENTE_LISTA:
      return { loading: true };

    case SUCCESS_CLIENTE_LISTA:
      return {
        loading: false,
        clientes: action.payload.clientes,
        page: action.payload.page,
        pages: action.payload.pages,
      };

    case FAIL_CLIENTE_LISTA:
      return { loading: false, error: action.payload };

    case RESET_CLIENTE_LISTA:
      return {};

    default:
      return state;
  }
};

export const clienteVentaListaReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_CLIENTE_VENTA_LISTA:
      return { loading: true };

    case SUCCESS_CLIENTE_VENTA_LISTA:
      return {
        loading: false,
        clientesVenta: action.payload,
      };

    case FAIL_CLIENTE_VENTA_LISTA:
      return { loading: false, error: action.payload };

    case RESET_CLIENTE_VENTA_LISTA:
      return {};

    default:
      return state;
  }
};

// Exito contiene informacion del backend
export const clienteDetallesReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_CLIENTE_DETALLES:
      return { loading: true };

    case SUCCESS_CLIENTE_DETALLES:
      return { loading: false, cliente: action.payload };

    case FAIL_CLIENTE_DETALLES:
      return { loading: false, error: action.payload };

    case RESET_CLIENTE_DETALLES:
      return {};

    default:
      return state;
  }
};

//  No es necesario informacion del backend en exito
// En la venta exito si contiene informacion del backend
export const clienteActualizarReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_CLIENTE_ACTUALIZAR:
      return { loading: true };

    case SUCCESS_CLIENTE_ACTUALIZAR:
      return { loading: false, success: true };

    case FAIL_CLIENTE_ACTUALIZAR:
      return { loading: false, error: action.payload };

    case RESET_CLIENTE_ACTUALIZAR:
      return {};

    default:
      return state;
  }
};

// No es necesario informacion del backend en exito
// En la venta exito si contiene informacion del backend
export const clienteRegistrarReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_CLIENTE_REGISTRAR:
      return { loading: true };

    case SUCCESS_CLIENTE_REGISTRAR:
      return { loading: false, success: true };

    case FAIL_CLIENTE_REGISTRAR:
      return { loading: false, error: action.payload };

    case RESET_CLIENTE_REGISTRAR:
      return {};

    default:
      return state;
  }
};

//  No es necesario informacion del backend en exito
// En la venta borrar no es posible
export const clienteBorrarReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_CLIENTE_BORRAR:
      return { loading: true };

    case SUCCESS_CLIENTE_BORRAR:
      return { loading: false, success: true };

    case FAIL_CLIENTE_BORRAR:
      return { loading: false, error: action.payload };

    case RESET_CLIENTE_BORRAR:
      return {};

    default:
      return state;
  }
};
