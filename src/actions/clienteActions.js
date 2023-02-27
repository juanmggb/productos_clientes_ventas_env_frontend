import axios from "axios";
import {
  FAIL_CLIENTE_ACTUALIZAR,
  FAIL_CLIENTE_BORRAR,
  FAIL_CLIENTE_DETALLES,
  FAIL_CLIENTE_LISTA,
  FAIL_CLIENTE_REGISTRAR,
  REQUEST_CLIENTE_ACTUALIZAR,
  REQUEST_CLIENTE_BORRAR,
  REQUEST_CLIENTE_DETALLES,
  REQUEST_CLIENTE_LISTA,
  REQUEST_CLIENTE_REGISTRAR,
  RESET_CLIENTE_DETALLES,
  RESET_CLIENTE_LISTA,
  SUCCESS_CLIENTE_ACTUALIZAR,
  SUCCESS_CLIENTE_BORRAR,
  SUCCESS_CLIENTE_DETALLES,
  SUCCESS_CLIENTE_LISTA,
  SUCCESS_CLIENTE_REGISTRAR,
} from "../constantes/clienteConstantes";
import { RESET_VENTA_LISTA } from "../constantes/ventaConstantes";

// Creador de acciones para pedir los clientes del backend
export const pedirClientesLista = () => async (dispatch, getState) => {
  dispatch({ type: REQUEST_CLIENTE_LISTA });

  try {
    const {
      usuarioInfo: { tokens },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokens.access}`,
      },
    };

    const { data } = await axios.get(
      "http://127.0.0.1:8000/api/clientes/",
      config
    );

    dispatch({ type: SUCCESS_CLIENTE_LISTA, payload: data });
    // Guardar los clientes en el localStorage
    localStorage.setItem("clientes", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: FAIL_CLIENTE_LISTA, payload: error.message });
  }
};

// Creador de acciones para pedir el cliente con el id del backend
export const obtenerClienteDetalles = (id) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_CLIENTE_DETALLES });

  try {
    const {
      usuarioInfo: { tokens },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokens.access}`,
      },
    };
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/clientes/${id}/`,
      config
    );

    dispatch({ type: SUCCESS_CLIENTE_DETALLES, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_CLIENTE_DETALLES, payload: error.message });
  }
};

// Creador de acciones para actualizar cliente del backend
export const actualizarCliente = (cliente) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_CLIENTE_ACTUALIZAR });

  try {
    const {
      usuarioInfo: { tokens },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokens.access}`,
      },
    };

    const { data } = await axios.put(
      `http://127.0.0.1:8000/api/modificar-cliente/${cliente.id}/`,
      cliente,
      config
    );

    dispatch({ type: SUCCESS_CLIENTE_ACTUALIZAR });
    dispatch({ type: RESET_CLIENTE_LISTA });
    dispatch({ type: RESET_VENTA_LISTA });
  } catch (error) {
    dispatch({ type: FAIL_CLIENTE_ACTUALIZAR, payload: error.message });
  }
};

// Creador de acciones para registrar un nuevo cliente en el backend
export const registrarCliente = (cliente) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_CLIENTE_REGISTRAR });

  try {
    const {
      usuarioInfo: { tokens },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokens.access}`,
      },
    };

    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/crear-cliente/",
      cliente,
      config
    );

    dispatch({ type: SUCCESS_CLIENTE_REGISTRAR });
    dispatch({ type: RESET_CLIENTE_LISTA });
  } catch (error) {
    dispatch({ type: FAIL_CLIENTE_REGISTRAR, payload: error.message });
  }
};

// Creador de acciones para borrar un cliente en el backend
export const borrarCliente = (id) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_CLIENTE_BORRAR });

  try {
    const {
      usuarioInfo: { tokens },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokens.access}`,
      },
    };

    const { data } = await axios.delete(
      `http://127.0.0.1:8000/api/modificar-cliente/${id}/`,
      config
    );

    dispatch({ type: SUCCESS_CLIENTE_BORRAR });
    dispatch({ type: RESET_CLIENTE_LISTA });
    dispatch({ type: RESET_VENTA_LISTA });
  } catch (error) {
    dispatch({ type: FAIL_CLIENTE_BORRAR, payload: error.message });
  }
};
