import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { usuarioInfoReducer } from "./reducers/usuarioReducers";
import {
  productoListaReducer,
  productoDetallesReducer,
  productoActualizarReducer,
  productoRegistrarReducer,
  productoBorrarReducer,
} from "./reducers/productoReducers";

import {
  clienteListaReducer,
  clienteDetallesReducer,
  clienteActualizarReducer,
  clienteRegistrarReducer,
  clienteBorrarReducer,
} from "./reducers/clienteReducers";

import {
  ventaListaReducer,
  ventaDetallesReducer,
  ventaActualizarReducer,
  ventaRegistrarReducer,
} from "./reducers/ventaReducers";

const reducer = combineReducers({
  // Usuario reducers
  usuarioInfo: usuarioInfoReducer,
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

  // Venta reducers
  ventaLista: ventaListaReducer,
  ventaDetalles: ventaDetallesReducer,
  ventaActualizar: ventaActualizarReducer,
  ventaRegistrar: ventaRegistrarReducer,
});

const middleware = [thunk];

const tokens = localStorage.getItem("tokens")
  ? JSON.parse(localStorage.getItem("tokens"))
  : null;

const productos = localStorage.getItem("productos")
  ? JSON.parse(localStorage.getItem("productos"))
  : null;

const clientes = localStorage.getItem("clientes")
  ? JSON.parse(localStorage.getItem("clientes"))
  : null;

const ventas = localStorage.getItem("ventas")
  ? JSON.parse(localStorage.getItem("ventas"))
  : null;

const initialState = {
  usuarioInfo: {
    tokens,
  },
  productoLista: {
    productos,
  },

  clienteLista: {
    clientes,
  },

  ventaLista: {
    ventas,
  },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
