import axios from "axios";
import {
  RESET_CLIENTE_LISTA,
  RESET_CLIENTE_VENTA_LISTA,
} from "../constantes/clienteConstantes";
import {
  REQUEST_PRODUCTO_LISTA,
  SUCCESS_PRODUCTO_LISTA,
  FAIL_PRODUCTO_LISTA,
  REQUEST_PRODUCTO_DETALLES,
  FAIL_PRODUCTO_DETALLES,
  SUCCESS_PRODUCTO_DETALLES,
  REQUEST_PRODUCTO_ACTUALIZAR,
  FAIL_PRODUCTO_ACTUALIZAR,
  SUCCESS_PRODUCTO_ACTUALIZAR,
  RESET_PRODUCTO_LISTA,
  REQUEST_PRODUCTO_REGISTRAR,
  SUCCESS_PRODUCTO_REGISTRAR,
  FAIL_PRODUCTO_REGISTRAR,
  REQUEST_PRODUCTO_BORRAR,
  SUCCESS_PRODUCTO_BORRAR,
  FAIL_PRODUCTO_BORRAR,
} from "../constantes/productoConstantes";
import { RESET_VENTA_LISTA } from "../constantes/ventaConstantes";
import { actualizarAccessToken } from "./sesionActions";
import { BASE_URL } from "../constantes/constantes";

// Creador de acciones para pedir los productos del backend
export const pedirProductosLista = () => async (dispatch, getState) => {
  dispatch({ type: REQUEST_PRODUCTO_LISTA });

  // Intentar pedir lista de productos al backend
  try {
    // Obtener token del Redux store
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


    // Recibir respuesta del backend y guardarla en data
    const { data } = await axios.get(`${BASE_URL}api/productos/`, config);


    dispatch({ type: SUCCESS_PRODUCTO_LISTA, payload: data });
  } catch (error) {
    // Si el backend responde con error de tipo 401 (no autorizado) intentar actualizar el token
    if (error.response && error.response.status === 401) {
      dispatch(actualizarAccessToken(pedirProductosLista));
    } else {
      dispatch({ type: FAIL_PRODUCTO_LISTA, payload: error.message });
    }
  }
};

// Creador de acciones para pedir el producto con el id del backend
export const obtenerProductoDetalles = (id) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_PRODUCTO_DETALLES });

  // Intentar pedir producto al backend
  try {
    // Obtener token del Redux store
    const {
      usuarioInfo: { token },
    } = getState();

    // Crear header con tipo de datos que se envian y token para autorizacion
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };


    // Recibir respuesta del backend y guardarla en data
    const { data } = await axios.get(`${BASE_URL}api/productos/${id}/`, config);


    dispatch({ type: SUCCESS_PRODUCTO_DETALLES, payload: data });
  } catch (error) {
    // Si el backend responde con error de tipo 401 (no autorizado) intentar actualizar el token
    if (error.response && error.response.status === 401) {
      dispatch(actualizarAccessToken(obtenerProductoDetalles, id));
    } else {
      dispatch({ type: FAIL_PRODUCTO_DETALLES, payload: error.message });
    }
  }
};

// Creador de acciones para actualizar producto del backend

export const actualizarProducto =
  (id, formData) => async (dispatch, getState) => {
    dispatch({ type: REQUEST_PRODUCTO_ACTUALIZAR });

    // Intentar pedir al backend que actualice el producto
    try {
      // Obtener token del Redux store
      const {
        usuarioInfo: { token },
      } = getState();

      // Crear header con tipo de datos que se envian y token para autenticacion
      const config = {
        headers: {
          "Content-type": "multipart/form-data", // este tipo de datos se usa para enviar media files, como imagenes
          Authorization: `Bearer ${token}`,
        },
      };

      // Recibir respuesta del backend y guardarla en data
      const { data } = await axios.put(
        `${BASE_URL}api/modificar-producto/${id}/`,
        formData,
        config
      );

      dispatch({ type: SUCCESS_PRODUCTO_ACTUALIZAR });

      dispatch({ type: RESET_PRODUCTO_LISTA });
      // Debo volver a pedir la lista de clientes del backend, la razon es que si cambio el nombre del producto el nombre de ese producto en la lista de precios de todos los clientes cambia y hay que actualizar la lista
      dispatch({ type: RESET_CLIENTE_LISTA });
      dispatch({ type: RESET_CLIENTE_VENTA_LISTA });
      // Debo volver a pedir la lista de ventas del backend, la razon es que si cambio el nombre del producto, la venta debe de mostrar el nuevo nombre. Tambien debe mostrar la cantidad disponible del producto
      dispatch({ type: RESET_VENTA_LISTA });
    } catch (error) {
      // Si el backend responde con error de tipo 401 (no autorizado) intentar actualizar el token
      if (error.response && error.response.status === 401) {
        dispatch(actualizarAccessToken(actualizarProducto, id, formData));
      } else {
        dispatch({ type: FAIL_PRODUCTO_ACTUALIZAR, payload: error.message });
      }
    }
  };


// Creador de acciones para registrar un nuevo producto en el backend
export const registrarProducto = (formData) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_PRODUCTO_REGISTRAR });

  // Intentar pedir al backend registrar un nuevo cliente
  try {
    // Obtener el token del Redux store
    const {
      usuarioInfo: { token },
    } = getState();

    // Crear header con el tipo de datos que se envian y el token para autenticacion
    const config = {
      headers: {
        "Content-Type": "multipart/form-data", // este tipo de datos se usa para enviar media files, como imagenes
        Authorization: `Bearer ${token}`,
      },
    };

    // Recibir la respuesta del backend y guardarla en data
    const { data } = await axios.post(

      `${BASE_URL}api/crear-producto/`,
      formData,

      config
    );

    dispatch({ type: SUCCESS_PRODUCTO_REGISTRAR });
    dispatch({ type: RESET_PRODUCTO_LISTA });
    // Debo volver a pedir la lista de clientes del backend, la razon es que cuando se crea un nuevo producto se le asigna el precio de ese producto a todos los clientes y se debe actualizar la lista de clientes para ver estos precios
    dispatch({ type: RESET_CLIENTE_LISTA });
    dispatch({ type: RESET_CLIENTE_VENTA_LISTA });
  } catch (error) {
    // Si el backend responde con error de tipo 401 (no autenticado) intentar actualizar ek token
    if (error.response && error.response.status === 401) {
      dispatch(actualizarAccessToken(registrarProducto, formData));
    } else {
      dispatch({ type: FAIL_PRODUCTO_REGISTRAR, payload: error.message });
    }
  }
};

// Creador de acciones para borrar un producto en el backend
export const borrarProducto = (id) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_PRODUCTO_BORRAR });

  // Intentar pedir al backend borrar el producto
  try {
    // Obtener token del Redux store
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
    const { data } = await axios.delete(

      `${BASE_URL}api/modificar-producto/${id}/`,

      config
    );

    dispatch({ type: SUCCESS_PRODUCTO_BORRAR });
    dispatch({ type: RESET_PRODUCTO_LISTA });

    // Reset lista de clientes para obtener la lista de clientes actualizada sin el producto que se borro
    dispatch({ type: RESET_CLIENTE_LISTA });

    dispatch({ type: RESET_CLIENTE_VENTA_LISTA });
    // Reset lista de ventas para obtener la lista de ventas actualizada sin el producto que se borro
    dispatch({ type: RESET_VENTA_LISTA });
  } catch (error) {
    // Si el backend responde con error de tipo 401 (no autenticado) intentar actualizar el token
    if (error.response && error.response.status === 401) {
      dispatch(actualizarAccessToken(borrarProducto, id));
    } else {
      dispatch({ type: FAIL_PRODUCTO_BORRAR, payload: error.message });
    }
  }
};
