import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Encabezado from "./componentes/general/Encabezado";
import ClienteDetalles from "./paginas/ClienteDetalles";
import ClientesLista from "./paginas/ClientesLista";
import Home from "./paginas/Home";
import InicioSesion from "./paginas/InicioSesion";
import ProductoDetalles from "./paginas/ProductoDetalles";
import ProductosLista from "./paginas/ProductosLista";
import RealizarVenta from "./paginas/RealizarVenta";
import RegistrarCliente from "./paginas/RegistrarCliente";
import RegistrarProducto from "./paginas/RegistrarProducto";
import VentaDetalles from "./paginas/VentaDetalles";
import VentasLista from "./paginas/VentasLista";
import UsuariosLista from "./paginas/UsuariosLista";
import UsuarioDetalles from "./paginas/UsuarioDetalles";
import RegistrarUsuario from "./paginas/RegistrarUsuario";
import CuentaDetalles from "./paginas/CuentaDetalles";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import GlobalStyles from "./GlobalStyles";

function App() {
  // Obtener informacion del usuario desde el Redux store
  const usuarioInfo = useSelector((state) => state.usuarioInfo);
  const { token } = usuarioInfo;

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  return (
    <div className="App">
      <GlobalStyles />
      <BrowserRouter>
        <Encabezado />
        <Routes>
          {isAuthenticated ? (
            <>
              {/* Home */}
              <Route path="/" element={<Home />} />

              {/* Productos */}
              <Route path="/productos" element={<ProductosLista />} />
              <Route path="/productos/:id" element={<ProductoDetalles />} />
              <Route
                path="/registrar-producto"
                element={<RegistrarProducto />}
              />

              {/* Clientes */}
              <Route path="/clientes" element={<ClientesLista />} />
              <Route path="/clientes/:id" element={<ClienteDetalles />} />
              <Route path="/registrar-cliente" element={<RegistrarCliente />} />

              {/* Ventas */}
              <Route path="/ventas" element={<VentasLista />} />
              <Route path="/ventas/:id" element={<VentaDetalles />} />
              <Route path="/realizar-venta" element={<RealizarVenta />} />

              {/* Usuarios */}
              <Route path="/usuarios" element={<UsuariosLista />} />
              <Route path="/usuarios/:id" element={<UsuarioDetalles />} />
              <Route path="/registrar-usuario" element={<RegistrarUsuario />} />

              {/* Cuenta */}
              <Route path="/cuenta" element={<CuentaDetalles />} />
            </>
          ) : (
            // Inicio sesion
            <Route path="/login" element={<InicioSesion />} />
          )}
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
