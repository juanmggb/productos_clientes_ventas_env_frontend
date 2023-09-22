import { useEffect, useState } from "react";
import { pedirProductosLista } from "../../actions/productoActions";

export const useProductos = (productos, dispatch) => {
  const [productosCliente, setProductosCliente] = useState([]);

  // Hook para mostrar precios del cliente
  const [mostrarPrecios, setMostrarPrecios] = useState(false);

  const manejarCambioPrecio = (nuevo_precio, productoId) => {
    // Obtener el index del producto cuyo precio hay que cambiar
    const indexProducto = productosCliente.findIndex(
      (producto) => producto.id === productoId
    );

    // Crear una copia del arreglo de precios
    const nuevosProductosCliente = [...productosCliente];

    // Actualizar el precio con el index seleccionado
    nuevosProductosCliente[indexProducto] = {
      ...productosCliente[indexProducto],
      PRECIO: nuevo_precio,
    };

    setProductosCliente(nuevosProductosCliente);
  };

  // useEffect para obtener productos del Redux Store
  useEffect(() => {
    if (!productos) {
      // navigate("/registrar-producto");
      dispatch(pedirProductosLista());
    } else {
      // Esto permite que el nuevo cliente tenga el precio por defecto de todos los productos en la base de datos
      setProductosCliente(productos);
    }
  }, [productos, dispatch, setProductosCliente]);

  return {
    productosCliente,
    manejarCambioPrecio,
    mostrarPrecios,
    setMostrarPrecios,
  };
};

export const crearPreciosCliente = (productosCliente) => {
  const preciosCliente = productosCliente.map((productoCliente) => {
    const productoId = productoCliente.id;
    const precioCliente = productoCliente.PRECIO;

    return { productoId, precioCliente };
  });

  return preciosCliente;
};
