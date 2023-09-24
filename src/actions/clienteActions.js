import axios from "axios";
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
  RESET_CLIENTE_LISTA,
  RESET_CLIENTE_VENTA_LISTA,
  SUCCESS_CLIENTE_ACTUALIZAR,
  SUCCESS_CLIENTE_BORRAR,
  SUCCESS_CLIENTE_DETALLES,
  SUCCESS_CLIENTE_LISTA,
  SUCCESS_CLIENTE_REGISTRAR,
  SUCCESS_CLIENTE_VENTA_LISTA,
} from "../constantes/clienteConstantes";
import { RESET_VENTA_LISTA } from "../constantes/ventaConstantes";
import { actualizarAccessToken } from "./sesionActions";
import { BASE_URL } from "../constantes/constantes";

// Creador de acciones para pedir los clientes del backend
export const pedirClientesLista =
  (search = "") =>
  async (dispatch, getState) => {
    dispatch({ type: REQUEST_CLIENTE_LISTA });

    // Intentar pedir lista de productos al backend
    try {
      // Obtener el token desde el Redux store
      const {
        usuarioInfo: { token },
      } = getState();

      // Crear header con el tipo de datos que se envia y el token para autenticacio
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Recibir la respuesta del backend y guardarla en data
      const { data } = await axios.get(
        `${BASE_URL}api/clientes${search}`,
        config
      );

      dispatch({ type: SUCCESS_CLIENTE_LISTA, payload: data });
    } catch (error) {
      // Si el backend responde con un error 401 (no autorizado) intentar actualizar el token
      if (error.response && error.response.status === 401) {
        dispatch(actualizarAccessToken(pedirClientesLista));
      } else {
        dispatch({ type: FAIL_CLIENTE_LISTA, payload: error.message });
      }
    }
  };

// Creador de acciones para pedir los clientes del backend
export const pedirClientesVentaLista = () => async (dispatch, getState) => {
  dispatch({ type: REQUEST_CLIENTE_VENTA_LISTA });

  // Intentar pedir lista de productos al backend
  try {
    // Obtener el token desde el Redux store
    const {
      usuarioInfo: { token },
    } = getState();

    // Crear header con el tipo de datos que se envia y el token para autenticacio
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };


    // Recibir la respuesta del backend y guardarla en data
    const { data } = await axios.get(`${BASE_URL}api/clientes-venta/`, config);


    dispatch({ type: SUCCESS_CLIENTE_VENTA_LISTA, payload: data });
  } catch (error) {
    // Si el backend responde con un error 401 (no autorizado) intentar actualizar el token
    if (error.response && error.response.status === 401) {
      dispatch(actualizarAccessToken(pedirClientesVentaLista));
    } else {
      dispatch({ type: FAIL_CLIENTE_VENTA_LISTA, payload: error.message });
    }
  }
};

// Creador de acciones para pedir el cliente con el id del backend
export const obtenerClienteDetalles = (id) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_CLIENTE_DETALLES });

  // Intentar pedir cliente al backend
  try {
    // Obtener token del Redux store
    const {
      usuarioInfo: { token },
    } = getState();

    // Crear header con tipo de datos que se envia y token para autenticacion
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };


    // Recibir respuesta del backend y guardar en data
    const { data } = await axios.get(`${BASE_URL}api/clientes/${id}/`, config);


    dispatch({ type: SUCCESS_CLIENTE_DETALLES, payload: data });
  } catch (error) {
    // Si el backend responde con error de tipo 401 (no autorizado) intentar actualizar el access token
    if (error.response && error.response.status === 401) {
      dispatch(actualizarAccessToken(obtenerClienteDetalles, id));
    } else {
      dispatch({ type: FAIL_CLIENTE_DETALLES, payload: error.message });
    }
  }
};

// Creador de acciones para actualizar cliente del backend
export const actualizarCliente = (cliente) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_CLIENTE_ACTUALIZAR });

  // Intentar pedir al backend actualizar los datos del cliente
  try {
    // Obtener el token del Redux store
    const {
      usuarioInfo: { token },
    } = getState();

    // Crear header con tipo de datos que se envian y token para autenticacion
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // Recibir respuesta del backend y guardar en data
    const { data } = await axios.put(

      `${BASE_URL}api/modificar-cliente/${cliente.id}/`,

      cliente,
      config
    );

    dispatch({ type: SUCCESS_CLIENTE_ACTUALIZAR });
    // Reset lista de clientes para actualizar la lista con la nueva informacion del cliente
    dispatch({ type: RESET_CLIENTE_LISTA });

    // Reset lista de ventas para actualizar la lista con la nueva informacion del cliente
    dispatch({ type: RESET_VENTA_LISTA });
    dispatch({ type: RESET_CLIENTE_VENTA_LISTA });
  } catch (error) {
    // Si el backend responde con error de tipo 401 (no autorizado) intentar actualizar el token
    if (error.response && error.response.status === 401) {
      dispatch(actualizarAccessToken(actualizarCliente, cliente));
    } else {
      dispatch({ type: FAIL_CLIENTE_ACTUALIZAR, payload: error.message });
    }
  }
};

// Creador de acciones para registrar un nuevo cliente en el backend
export const registrarCliente = (cliente) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_CLIENTE_REGISTRAR });

  // Intenar pedir al backend registrar un nuevo cliente
  try {
    // Obtener el access token del Redux Store
    const {
      usuarioInfo: { token },
    } = getState();

    // Crear el header con el tipo de datos enviados y el access token para autenticacion
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // Recibir la respuesta del backend y guardarla en data
    const { data } = await axios.post(

      `${BASE_URL}api/crear-cliente/`,

      cliente,
      config
    );

    dispatch({ type: SUCCESS_CLIENTE_REGISTRAR });

    // Reset lista de clientes para actualizar la lista con el nuevo cliente
    dispatch({ type: RESET_CLIENTE_LISTA });
    // Reset lista de clientes venta para que aparezca el nuevo cliente al hacer la venta
    dispatch({ type: RESET_CLIENTE_VENTA_LISTA });
  } catch (error) {
    // Si el backend responde con error de tipo 401 (no autorizado) intentar actualizar el access token
    if (error.response && error.response.status === 401) {
      dispatch(actualizarAccessToken(registrarCliente, cliente));
    } else {
      dispatch({ type: FAIL_CLIENTE_REGISTRAR, payload: error.message });
    }
  }
};

// Creador de acciones para borrar un cliente en el backend
export const borrarCliente = (id) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_CLIENTE_BORRAR });

  // Intenar que el backend borre el cliente
  try {
    // Obtener el token del Redux store
    const {
      usuarioInfo: { token },
    } = getState();

    // Crear el header con el tipo de dato que se va a enviar y el token para autenticacion
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // Recibir la respuesta del backend y guardarla en data
    const { data } = await axios.delete(

      `${BASE_URL}api/modificar-cliente/${id}/`,

      config
    );

    dispatch({ type: SUCCESS_CLIENTE_BORRAR });
    // Reset lista de clientes para actualizar la lista y remover el cliente eliminado
    dispatch({ type: RESET_CLIENTE_LISTA });
    // Reset lista de clientes venta para que NO aparezca el nuevo cliente al hacer la venta
    dispatch({ type: RESET_CLIENTE_VENTA_LISTA });
    // Reset lista de ventas para eliminar el cliente de las ventas con ese cliente
    dispatch({ type: RESET_VENTA_LISTA });
  } catch (error) {
    // Si el backend responde con error de tipo 401 (no autorizado) inntentar actualizar el token
    if (error.response && error.response.status === 401) {
      dispatch(actualizarAccessToken(borrarCliente, id));
    } else {
      dispatch({ type: FAIL_CLIENTE_BORRAR, payload: error.message });
    }
  }
};
