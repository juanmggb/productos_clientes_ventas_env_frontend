import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  borrarProducto,
  pedirProductosLista,
} from "../actions/productoActions";
import Loader from "../componentes/Loader";
import Mensaje from "../componentes/Mensaje";
import {
  RESET_PRODUCTO_BORRAR,
  RESET_PRODUCTO_DETALLES,
} from "../constantes/productoConstantes";

const ProductosLista = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();
  // Funcion para nevagar en la aplicacion
  const navigate = useNavigate();
  // Obtener el estado desde el Redux store
  const productoLista = useSelector((state) => state.productoLista);
  const { loading, productos, error } = productoLista;

  // Obtener el estado desde el Redux sotore
  const productoBorrar = useSelector((state) => state.productoBorrar);
  const {
    loading: loadingBorrar,
    success: successBorrar,
    error: errorBorrar,
  } = productoBorrar;

  useEffect(() => {
    if (successBorrar) {
      dispatch({ type: RESET_PRODUCTO_BORRAR });
      alert("La eliminación fue exitosa");
    }

    // Si no hay productos, disparar la accion de pedir productos
    if (!productos) {
      dispatch(pedirProductosLista());
    }
  }, [dispatch, productos, successBorrar]);

  const manejarProductoDetalles = (id) => {
    // Redireccionar a la pagina del producto
    dispatch({ type: RESET_PRODUCTO_DETALLES });
    navigate(`/productos/${id}`);
  };

  const manejarBorrarProducto = (id) => {
    if (window.confirm("¿Está seguro de eliminar este producto")) {
      dispatch(borrarProducto(id));
    } else {
      alert("Operación cancelada");
    }
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Mensaje variant="danger">{error}</Mensaje>
  ) : (
    productos && (
      <div style={{ padding: "25px" }}>
        {loadingBorrar && <Loader />}
        {errorBorrar && <Mensaje variant="danger">{errorBorrar}</Mensaje>}
        {/* Esta el la parte que cambia en las paginas */}
        <h1>Productos</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOMBRE</th>
              <th>CANTIDAD</th>
              <th>PRECIO</th>
              <th>EDITAR</th>
              <th>BORRAR</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.NOMBRE}</td>
                <td>{p.CANTIDAD}</td>
                <td>{p.PRECIO}</td>
                <td>
                  <Button onClick={() => manejarProductoDetalles(p.id)}>
                    <i className="fa-solid fa-circle-info"></i>
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => manejarBorrarProducto(p.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  );
};

export default ProductosLista;
