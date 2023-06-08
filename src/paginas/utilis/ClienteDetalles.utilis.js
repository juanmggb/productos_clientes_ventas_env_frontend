import { useState } from "react";

export const usePrecios = () => {
  // const [nombre, setNombre] = useState("");
  const [preciosCliente, setPreciosCliente] = useState([]);
  // Esta funcion es necesaria debido a que el estado preciosCliente es una array y no es posible usar setPreciosCliente de forma directa en el formulario
  const manejarCambioPrecio = (nuevoPrecio, precioId) => {
    // Obtener el index del producto cuyo precio hay que cambiar
    const indexPrecio = preciosCliente.findIndex(
      (precio) => precio.id === precioId
    );

    // Crear una copia del arreglo de precios
    const nuevosPreciosCliente = [...preciosCliente];

    // Actualizar el precio con el index seleccionado
    nuevosPreciosCliente[indexPrecio] = {
      ...preciosCliente[indexPrecio],
      PRECIO: nuevoPrecio,
    };

    setPreciosCliente(nuevosPreciosCliente);
  };

  return { preciosCliente, setPreciosCliente, manejarCambioPrecio };
};

export const crearNuevosPreciosCliente = (preciosCliente) => {
  const nuevosPreciosCliente = preciosCliente.map((precioCliente) => {
    const precioClienteId = precioCliente.id;
    const nuevoPrecioCliente = precioCliente.PRECIO;

    return { precioClienteId, nuevoPrecioCliente };
  });

  return nuevosPreciosCliente;
};

export const cambiarCampoNombrePrecios = (preciosCliente) => {
  const nuevosPreciosCliente = preciosCliente.map((p) => {
    p.NOMBRE = p.producto_nombre;

    return p;
  });

  return nuevosPreciosCliente;
};
