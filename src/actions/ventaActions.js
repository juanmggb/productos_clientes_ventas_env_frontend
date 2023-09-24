import axios from "axios";
import { RESET_CLIENTE_LISTA } from "../constantes/clienteConstantes";
import { RESET_PRODUCTO_LISTA } from "../constantes/productoConstantes";
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
  RESET_VENTA_LISTA,
  SUCCESS_VENTA_ACTUALIZAR,
  SUCCESS_VENTA_DETALLES,
  SUCCESS_VENTA_LISTA,
  SUCCESS_VENTA_REGISTRAR,
  SUCCESS_VENTA_REPORTE_LISTA,
} from "../constantes/ventaConstantes";
import { actualizarAccessToken } from "./sesionActions";
import { BASE_URL } from "../constantes/constantes";
import { modifyJSON } from "../paginas/utilis/VentasLista.utilis";
import * as XLSX from "xlsx";

// Creador de acciones para pedir los ventas del backend
export const pedirVentasLista =
  (search = "") =>
  async (dispatch, getState) => {
    dispatch({ type: REQUEST_VENTA_LISTA });

    // Intentar pedir al backend lista de ventas
    try {
      // Obtener token del Redux store
      const {
        usuarioInfo: { token },
      } = getState();

      // Crear header con tipo de datos a enviar y token para autenticacion
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Recibir respuesta del backend y guardarla en data
      const { data } = await axios.get(
        `${BASE_URL}api/ventas${search}`,
        config
      );

      dispatch({ type: SUCCESS_VENTA_LISTA, payload: data });
    } catch (error) {
      // Si el backend responde con error de tipo 401 (no autenticado) intentar actualizar el token
      if (error.response && error.response.status === 401) {
        dispatch(actualizarAccessToken(pedirVentasLista));
      } else {
        dispatch({ type: FAIL_VENTA_LISTA, payload: error.message });
      }
    }
  };

// Creador de acciones para pedir los ventas del backend
export const pedirVentasReporteLista =
  (search = "") =>
  async (dispatch, getState) => {
    dispatch({ type: REQUEST_VENTA_REPORTE_LISTA });

    // Intentar pedir al backend lista de ventas
    try {
      // Obtener token del Redux store
      const {
        usuarioInfo: { token },
      } = getState();

      // Crear header con tipo de datos a enviar y token para autenticacion
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Recibir respuesta del backend y guardarla en data
      const { data } = await axios.get(
        `${BASE_URL}api/ventas-reporte${search}`,
        config
      );

      dispatch({ type: SUCCESS_VENTA_REPORTE_LISTA, payload: data });

      // Modify the JSON data
      const ventas = modifyJSON(data);

      // Convert JSON to worksheet
      const worksheet = XLSX.utils.json_to_sheet(ventas);

      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

      // Write the workbook to a file
      XLSX.writeFile(workbook, "ventas.xlsx");
    } catch (error) {
      // Si el backend responde con error de tipo 401 (no autenticado) intentar actualizar el token
      if (error.response && error.response.status === 401) {
        dispatch(actualizarAccessToken(pedirVentasReporteLista));
      } else {
        dispatch({ type: FAIL_VENTA_REPORTE_LISTA, payload: error.message });
      }
    }
  };


// Creador de acciones para pedir el venta con el id del backend
export const obtenerVentaDetalles = (id) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_VENTA_DETALLES });

  // Intentar obtener venta del backend
  try {
    // Obtener token del Redux store
    const {
      usuarioInfo: { token },
    } = getState();

    // Crear header con tipo de datos a enviar y token para autenticacion
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // Recibir respuesta del backend y guardarla en data
    const { data } = await axios.get(`${BASE_URL}api/ventas/${id}/`, config);


    dispatch({ type: SUCCESS_VENTA_DETALLES, payload: data });
  } catch (error) {
    // Si el backend responde con error de tipo 401 (no autorizado) intentar actualizar el token
    if (error.response && error.response.status === 401) {
      dispatch(actualizarAccessToken(obtenerVentaDetalles, id));
    } else {
      dispatch({ type: FAIL_VENTA_DETALLES, payload: error.message });
    }
  }
};

// Creador de acciones para actualizar venta del backend
export const actualizarVenta = (venta) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_VENTA_ACTUALIZAR });

  // Intentar pedir al backend actualizar la venta
  try {
    // Obtener el token del Redux store
    const {
      usuarioInfo: { token },
    } = getState();

    // Crear header con tipo de datos a enviar y token para autenticacion
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // Recibir respuesta del backend y guardarla en data
    const { data } = await axios.put(

      `${BASE_URL}api/modificar-venta/${venta.id}/`,

      venta,
      config
    );

    dispatch({ type: SUCCESS_VENTA_ACTUALIZAR, payload: data });
    dispatch({ type: RESET_VENTA_LISTA });
    // Si el status de la venta se cambia a realizado, se descuenta producto y por lo tanto hay que actualizar la lista de productos
    dispatch({ type: RESET_PRODUCTO_LISTA });
  } catch (error) {
    // si el backend responde con error de tipo 401 (no autenticado) intentar actualizar el token
    if (error.response && error.response.status === 401) {
      dispatch(actualizarAccessToken(actualizarVenta, venta));
    } else {
      dispatch({ type: FAIL_VENTA_ACTUALIZAR, payload: error.message });
    }
  }
};

// Creador de acciones para registrar un nuevo venta en el backend
export const registrarVenta = (venta) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_VENTA_REGISTRAR });

  // Intentar pedir al backend registrar venta
  try {
    // Obtener token del Redux store
    const {
      usuarioInfo: { token },
    } = getState();

    // Crear header con tipo de datos a enviar y token para autenticacion
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // recibir respuesta del backend y guardarla en data
    const { data } = await axios.post(

      `${BASE_URL}api/crear-venta/`,

      venta,
      config
    );

    dispatch({ type: SUCCESS_VENTA_REGISTRAR, payload: data });
    dispatch({ type: RESET_VENTA_LISTA });
    // Si la venta de genera con un status de realizado, se descuenta producto del almacen y hay que actualizar la lista de productos
    dispatch({ type: RESET_PRODUCTO_LISTA });
    // por que????????
    // dispatch({ type: RESET_CLIENTE_LISTA });
  } catch (error) {
    // Si el backend responde con error de tipo 401 (no autenticado) intentar actualizar el token
    if (error.response && error.response.status === 401) {
      dispatch(actualizarAccessToken(registrarVenta, venta));
    } else {
      dispatch({ type: FAIL_VENTA_REGISTRAR, payload: error.message });
    }
  }
};
