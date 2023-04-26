import axios from "axios";
import { RESET_CLIENTE_LISTA } from "../constantes/clienteConstantes";
import { RESET_PRODUCTO_LISTA } from "../constantes/productoConstantes";
import {
  FAIL_VENTA_ACTUALIZAR,
  FAIL_VENTA_DETALLES,
  FAIL_VENTA_LISTA,
  FAIL_VENTA_REGISTRAR,
  REQUEST_VENTA_ACTUALIZAR,
  REQUEST_VENTA_DETALLES,
  REQUEST_VENTA_LISTA,
  REQUEST_VENTA_REGISTRAR,
  RESET_VENTA_DETALLES,
  RESET_VENTA_LISTA,
  SUCCESS_VENTA_ACTUALIZAR,
  SUCCESS_VENTA_DETALLES,
  SUCCESS_VENTA_LISTA,
  SUCCESS_VENTA_REGISTRAR,
} from "../constantes/ventaConstantes";

// Creador de acciones para pedir los ventas del backend
export const pedirVentasLista = () => async (dispatch, getState) => {
  dispatch({ type: REQUEST_VENTA_LISTA });

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

    const { data } = await axios.get(
      "http://127.0.0.1:8000/api/ventas/",
      config
    );

    dispatch({ type: SUCCESS_VENTA_LISTA, payload: data });
    // Guardar los ventas en el localStorage
    localStorage.setItem("ventas", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: FAIL_VENTA_LISTA, payload: error.message });
  }
};

// Creador de acciones para pedir el venta con el id del backend
export const obtenerVentaDetalles = (id) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_VENTA_DETALLES });

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
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/ventas/${id}/`,
      config
    );

    dispatch({ type: SUCCESS_VENTA_DETALLES, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_VENTA_DETALLES, payload: error.message });
  }
};

// Creador de acciones para actualizar venta del backend
export const actualizarVenta = (venta) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_VENTA_ACTUALIZAR });

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

    const { data } = await axios.put(
      `http://127.0.0.1:8000/api/modificar-venta/${venta.id}/`,
      venta,
      config
    );

    dispatch({ type: SUCCESS_VENTA_ACTUALIZAR, payload: data });
    // dispatch({ type: RESET_VENTA_DETALLES });
    dispatch({ type: RESET_VENTA_LISTA });
    dispatch({ type: RESET_PRODUCTO_LISTA });
    dispatch({ type: RESET_CLIENTE_LISTA });
  } catch (error) {
    dispatch({ type: FAIL_VENTA_ACTUALIZAR, payload: error.message });
  }
};

// Creador de acciones para registrar un nuevo venta en el backend
export const registrarVenta = (venta) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_VENTA_REGISTRAR });

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

    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/crear-venta/",
      venta,
      config
    );

    dispatch({ type: SUCCESS_VENTA_REGISTRAR, payload: data });
    dispatch({ type: RESET_VENTA_LISTA });
    dispatch({ type: RESET_PRODUCTO_LISTA });
    dispatch({ type: RESET_CLIENTE_LISTA });
  } catch (error) {
    dispatch({ type: FAIL_VENTA_REGISTRAR, payload: error.message });
  }
};
