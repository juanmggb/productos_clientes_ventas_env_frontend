import { BrowserRouter, Routes, Route } from "react-router-dom";
import Encabezado from "./componentes/Encabezado";
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Encabezado />
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />
          {/* Inicio sesion */}
          <Route path="/login" element={<InicioSesion />} />
          {/* Productos */}
          <Route path="/productos" element={<ProductosLista />} />
          <Route path="/productos/:id" element={<ProductoDetalles />} />
          <Route path="/registrar-producto" element={<RegistrarProducto />} />
          {/* Clientes */}
          <Route path="/clientes" element={<ClientesLista />} />
          <Route path="/clientes/:id" element={<ClienteDetalles />} />
          <Route path="/registrar-cliente" element={<RegistrarCliente />} />
          {/* Ventas */}
          <Route path="/ventas" element={<VentasLista />} />
          <Route path="/ventas/:id" element={<VentaDetalles />} />
          <Route path="/realizar-venta" element={<RealizarVenta />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
