import { useEffect, useState } from "react";
import { pedirProductosLista } from "../../actions/productoActions";

// Funcion para mostrar ventana con detalles del producto
export const useMostrarDetallesProducto = (dispatch, productos) => {
  // Estado para la ventana emergente con la informacion del producto
  const [mostrarProducto, setMostrarProducto] = useState(false);
  // Estado para guardar informacion del producto
  const [producto, setProducto] = useState({});

  // useEffect para obtener productos del Redux store
  useEffect(() => {
    // Si no hay productos, disparar la accion de pedir productos
    if (!productos) {
      dispatch(pedirProductosLista());
    }
  }, [dispatch, productos]);

  useEffect(() => {
    dispatch(pedirProductosLista());
  }, [dispatch]);

  // Funcion para cerrar la ventana de informacion del producto
  const manejarCerrarVentana = () => {
    setMostrarProducto(false);
  };

  // Funcion para mostrar ventana emergente con detalles del producto
  const manejarMostrarDetallesProducto = (productoId) => {
    const productoSeleccionado = {
      ...productos.find((c) => c.id === productoId),
    };
    setProducto(productoSeleccionado);
    setMostrarProducto(true);
  };

  return {
    mostrarProducto,
    producto,
    manejarCerrarVentana,
    manejarMostrarDetallesProducto,
  };
};
