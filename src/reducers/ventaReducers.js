import {
  FAIL_VENTA_ACTUALIZAR,
  FAIL_VENTA_DETALLES,
  FAIL_VENTA_LISTA,
  FAIL_VENTA_REGISTRAR,
  FAIL_VENTA_REPORTE_LISTA,
  REQUEST_VENTA_ACTUALIZAR,
  REQUEST_VENTA_DETALLES,
  REQUEST_VENTA_LISTA,
  REQUEST_VENTA_REGISTRAR,
  REQUEST_VENTA_REPORTE_LISTA,
  RESET_VENTA_ACTUALIZAR,
  RESET_VENTA_DETALLES,
  RESET_VENTA_LISTA,
  RESET_VENTA_REGISTRAR,
  RESET_VENTA_REPORTE_LISTA,
  SUCCESS_VENTA_ACTUALIZAR,
  SUCCESS_VENTA_DETALLES,
  SUCCESS_VENTA_LISTA,
  SUCCESS_VENTA_REGISTRAR,
  SUCCESS_VENTA_REPORTE_LISTA,
} from "../constantes/ventaConstantes";

// Exito contiene informacion del backend
export const ventaListaReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_VENTA_LISTA:
      return { loading: true };

    case SUCCESS_VENTA_LISTA:
      return {
        loading: false,
        ventas: action.payload.ventas,
        page: action.payload.page,
        pages: action.payload.pages,
      };

    case FAIL_VENTA_LISTA:
      return { loading: false, error: action.payload };

    case RESET_VENTA_LISTA:
      return {};

    default:
      return state;
  }
};

export const ventaReporteListaReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_VENTA_REPORTE_LISTA:
      return { loading: true };

    case SUCCESS_VENTA_REPORTE_LISTA:
      return {
        loading: false,
        ventasReporte: action.payload,
      };

    case FAIL_VENTA_REPORTE_LISTA:
      return { loading: false, error: action.payload };

    case RESET_VENTA_REPORTE_LISTA:
      return {};

    default:
      return state;
  }
};

// Exito contiene informacion del backend
export const ventaDetallesReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_VENTA_DETALLES:
      return { loading: true };

    case SUCCESS_VENTA_DETALLES:
      return { loading: false, venta: action.payload };

    case FAIL_VENTA_DETALLES:
      return { loading: false, error: action.payload };

    case RESET_VENTA_DETALLES:
      return {};

    default:
      return state;
  }
};

// En la venta exito si contiene informacion del backend
export const ventaActualizarReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_VENTA_ACTUALIZAR:
      return { loading: true };

    case SUCCESS_VENTA_ACTUALIZAR:
      return { loading: false, reporte: action.payload };

    case FAIL_VENTA_ACTUALIZAR:
      return { loading: false, error: action.payload };

    case RESET_VENTA_ACTUALIZAR:
      return {};

    default:
      return state;
  }
};

// En la venta exito si contiene informacion del backend
export const ventaRegistrarReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_VENTA_REGISTRAR:
      return { loading: true };

    case SUCCESS_VENTA_REGISTRAR:
      return { loading: false, venta: action.payload };

    case FAIL_VENTA_REGISTRAR:
      return { loading: false, error: action.payload };

    case RESET_VENTA_REGISTRAR:
      return {};

    default:
      return state;
  }
};

// En la venta borrar no es posible
