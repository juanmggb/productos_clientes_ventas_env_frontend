import { useEffect, useState } from "react";
import { pedirClientesVentaLista } from "../../actions/clienteActions";
import { toast } from "react-hot-toast";

export const useCliente = (clientesVenta, dispatch, navigate) => {
  const [cliente, setCliente] = useState({});
  const [productosCliente, setProductosCliente] = useState([]);

  // Use effect para seleccionar cliente inicial y su lista de precios, y para fijar el vendedor
  useEffect(() => {
    if (!clientesVenta) {
      dispatch(pedirClientesVentaLista());
    } else if (clientesVenta.length > 0) {
      setCliente(clientesVenta[0]);
      setProductosCliente(clientesVenta[0].precios_cliente);
    }
  }, [clientesVenta, navigate, dispatch]);

  const manejarCambiarCliente = (clienteId) => {
    const clienteSeleccionado = {
      ...clientesVenta.find((c) => c.id === clienteId),
    };

    setCliente(clienteSeleccionado);

    setProductosCliente(clienteSeleccionado.precios_cliente);
  };

  return {
    cliente,
    productosCliente,
    setProductosCliente,
    manejarCambiarCliente,
  };
};

export const useProductosVenta = (productosCliente, setProductosCliente) => {
  const [productosVenta, setProductosVenta] = useState([]);

  const [deshabilitarVenta, setDesabilitarVenta] = useState(true);

  const manejarSeleccionarProducto = (productoId) => {
    const productoSeleccionado = productosCliente.find(
      (p) => p.id === productoId
    );

    const productoActualizado = {
      ...productoSeleccionado,
      confirmado: false,
      cantidadVenta: 1,
    };

    const nuevosProductosCliente = productosCliente.filter(
      (p) => p.id !== productoId
    );
    setProductosCliente(nuevosProductosCliente);

    const nuevosProductosVenta = [productoActualizado, ...productosVenta];
    setProductosVenta(nuevosProductosVenta);

    setDesabilitarVenta(true);
  };

  const manejarCambioCantidad = (e, nuevaCantidad, productoId) => {
    e.stopPropagation();
    // Obtener el index del producto cuya camtodad hay que cambiar

    const productoSeleccionado = productosVenta.find(
      (pv) => pv.id === productoId
    );

    const cantidadDisponible = productoSeleccionado.producto_cantidad;

    if (nuevaCantidad > cantidadDisponible) {
      toast.error(
        `La cantidad seleccionada debe ser inferior o igual a ${productoSeleccionado.producto_cantidad}`,
        { duration: 4000 }
      );
    } else {
      if (nuevaCantidad <= 0) {
        nuevaCantidad = 1;
      } else {
        const indexProducto = productosVenta.findIndex(
          (producto) => producto.id === productoId
        );

        // Crear una copia del arreglo de productos
        const nuevosProductosVenta = [...productosVenta];

        // Actualizar el precio con el index seleccionado
        nuevosProductosVenta[indexProducto] = {
          ...productosVenta[indexProducto],
          cantidadVenta: nuevaCantidad,
        };

        setProductosVenta(nuevosProductosVenta);
      }
    }
  };

  const manejarDesabilitarVenta = (nuevosProductosVenta) => {
    setDesabilitarVenta(
      !(
        nuevosProductosVenta.length > 0 &&
        nuevosProductosVenta.every((p) => p.confirmado) &&
        nuevosProductosVenta.every((p) => p.cantidadVenta > 0)
      )
    );
  };

  const manejarConfirmarProducto = (e, productoId) => {
    e.stopPropagation();
    const nuevosProductosVenta = productosVenta.map((p) => {
      if (p.id === productoId) {
        p.confirmado = !p.confirmado;
      }
      return p;
    });

    setProductosVenta(nuevosProductosVenta);

    manejarDesabilitarVenta(nuevosProductosVenta);
  };

  const manejarCancelarProducto = (e, productoId) => {
    e.stopPropagation();
    const productoSeleccionado = {
      ...productosVenta.find((p) => p.id === productoId),
    };

    const nuevosProductosVenta = productosVenta.filter(
      (p) => p.id !== productoId
    );
    setProductosVenta(nuevosProductosVenta);

    const nuevosProductosCliente = [productoSeleccionado, ...productosCliente];
    setProductosCliente(nuevosProductosCliente);

    manejarDesabilitarVenta(nuevosProductosVenta);
  };

  return {
    productosVenta,
    deshabilitarVenta,
    setProductosVenta,
    manejarSeleccionarProducto,
    manejarCambioCantidad,
    manejarConfirmarProducto,
    manejarCancelarProducto,
  };
};

export const crearProductosVenta = (productosVenta) => {
  const nuevosProductosVenta = productosVenta.map((pv) => {
    const productoId = pv.PRODUCTO;

    const cantidadVenta = pv.cantidadVenta;

    const precioVenta = pv.PRECIO * pv.cantidadVenta;

    return { productoId, cantidadVenta, precioVenta };
  });

  return nuevosProductosVenta;
};

export const calcularMonto = (tipoPago, nuevosProductosVenta) => {
  if (tipoPago === "CORTESIA") {
    return 0;
  } else {
    const monto = nuevosProductosVenta.reduce(
      (total, pv) => pv.precioVenta + total,
      0
    );

    return monto;
  }
};
