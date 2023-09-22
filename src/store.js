import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { cuentaActualizarReducer } from "./reducers/cuentaReducers";

import {
  usuarioListaReducer,
  usuarioDetallesReducer,
  usuarioActualizarReducer,
  usuarioRegistrarReducer,
  usuarioBorrarReducer,
} from "./reducers/usuarioReducers";
import {
  productoListaReducer,
  productoDetallesReducer,
  productoActualizarReducer,
  productoRegistrarReducer,
  productoBorrarReducer,
} from "./reducers/productoReducers";

import { usuarioInfoReducer } from "./reducers/sesionReducers";

import {
  clienteListaReducer,
  clienteDetallesReducer,
  clienteActualizarReducer,
  clienteRegistrarReducer,
  clienteBorrarReducer,
  clienteVentaListaReducer,
} from "./reducers/clienteReducers";

import {
  ventaListaReducer,
  ventaDetallesReducer,
  ventaActualizarReducer,
  ventaRegistrarReducer,
  ventaReporteListaReducer,
} from "./reducers/ventaReducers";

import { rutaListaReducer } from "./reducers/rutaReducers";

const reducer = combineReducers({
  // Cuenta reducers
  cuentaActualizar: cuentaActualizarReducer,

  // Usuario reducers
  usuarioInfo: usuarioInfoReducer,
  usuarioLista: usuarioListaReducer,
  usuarioDetalles: usuarioDetallesReducer,
  usuarioActualizar: usuarioActualizarReducer,
  usuarioRegistrar: usuarioRegistrarReducer,
  usuarioBorrar: usuarioBorrarReducer,

  // Producto reducers
  productoLista: productoListaReducer,
  productoDetalles: productoDetallesReducer,
  productoActualizar: productoActualizarReducer,
  productoRegistrar: productoRegistrarReducer,
  productoBorrar: productoBorrarReducer,

  // Cliente reducers
  clienteLista: clienteListaReducer,
  clienteDetalles: clienteDetallesReducer,
  clienteActualizar: clienteActualizarReducer,
  clienteRegistrar: clienteRegistrarReducer,
  clienteBorrar: clienteBorrarReducer,
  clienteVentaLista: clienteVentaListaReducer,
  rutaLista: rutaListaReducer,

  // Venta reducers
  ventaLista: ventaListaReducer,
  ventaDetalles: ventaDetallesReducer,
  ventaActualizar: ventaActualizarReducer,
  ventaRegistrar: ventaRegistrarReducer,
  ventaReporteLista: ventaReporteListaReducer,
});

const middleware = [thunk];

// Al establecer el valor inicial del token utilizando el valor almacenado en el localStorage, permites que el token se recupere y persista incluso después de recargar la aplicación o cerrar y volver a abrir la ventana del navegador.

// El localStorage es una forma de almacenamiento local en el navegador que retiene los datos incluso cuando la página web se cierra o se recarga. Al guardar el token en el localStorage, puedes acceder a él en el futuro y utilizarlo para establecer el estado inicial del Redux store.

// Establecer el valor inicial del token utilizando el contenido del localStorage es una forma eficaz de mantener y persistir los datos relevantes, como la sesión del usuario, en la aplicación, incluso después de eventos como recargar la página o cerrar y volver a abrir la ventana del navegador.

const token = localStorage.getItem("accessToken")
  ? JSON.parse(localStorage.getItem("accessToken"))
  : null;

const initialState = {
  usuarioInfo: {
    token,
  },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
