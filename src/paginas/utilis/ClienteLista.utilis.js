import { useEffect, useState } from "react";
import { pedirClientesLista } from "../../actions/clienteActions";

// Función para crear estado filter y su API
export const useFiltros = () => {
  // Crear estado filtros
  const [filtros, setFiltros] = useState({
    buscar: "",
    filtrarPor: 0,
    ordenarPor: 0,
  });

  // Funcion para modificar el estado filtros
  const manejarFiltros = (buscar, filtrarPor, ordenarPor) => {
    setFiltros({
      buscar,
      filtrarPor,
      ordenarPor,
    });
  };

  return {
    ...filtros,
    manejarFiltros,
  };
};

// Funcion para filtrar ventas por campo seleccionado
const filtrarClientesPorCampo = (clientes, campo, buscar) => {
  // Si no hay nombre para buscar, regresa todos las ventas
  // Regresamos una copia para tener una función pura
  if (!buscar) {
    return [...clientes];
  }

  // Pasa el valor de buscar a minúsculas
  const minusculaBusqueda = buscar.toLowerCase();

  // Filtra ventas por el campo seleccionado y el valor de búsqueda
  switch (campo) {
    case 0:
      // Filtrar ventas por nombre del cliente
      return clientes.filter((cliente) =>
        cliente.NOMBRE.toLowerCase().startsWith(minusculaBusqueda)
      );
    case 1:
      // Filtrar ventas por tipo de venta
      return clientes.filter((cliente) =>
        cliente.CONTACTO.toLowerCase().startsWith(minusculaBusqueda)
      );
    case 2:
      // Filtrar ventas por tipo de pago
      return clientes.filter((cliente) =>
        cliente.TIPO_PAGO.toLowerCase().startsWith(minusculaBusqueda)
      );

    default:
      return clientes;
  }
};

// Función para ordenar las ventas
const ordenarClientes = (clientes, ordenarPor) => {
  // Crear una copia de las ventas para mantener el arreglo original inmutable
  const clientesOrdenados = [...clientes];

  switch (ordenarPor) {
    case 1:
      // Ordenar tabla de ventas por nombre de cliente
      return clientesOrdenados.sort((a, b) => {
        if (a.NOMBRE > b.NOMBRE) return 1;
        if (a.NOMBRE < b.NOMBRE) return -1;
        return 0;
      });

    case 2:
      return clientesOrdenados.sort((a, b) => {
        if (a.CONTACTO === "" && b.CONTACTO !== "") return 1;
        if (a.CONTACTO !== "" && b.CONTACTO === "") return -1;
        if (a.CONTACTO > b.CONTACTO) return 1;
        if (a.CONTACTO < b.CONTACTO) return -1;
        return 0;
      });

    case 3:
      // Ordenar tabla de ventas por nombre de repartidor
      return clientesOrdenados.sort((a, b) => {
        if (a.TIPO_PAGO > b.TIPO_PAGO) return 1;
        if (a.TIPO_PAGO < b.TIPO_PAGO) return -1;
        return 0;
      });

    default:
      // Si no se especifica un criterio de ordenamiento válido, regresar el arreglo original
      return clientesOrdenados;
  }
};

export const filtrarClientes = (clientes, filtrarPor, buscar, ordenarPor) => {
  let clientesFiltrados = [...clientes].reverse();

  clientesFiltrados = filtrarClientesPorCampo(
    clientesFiltrados,
    filtrarPor,
    buscar
  );

  clientesFiltrados = ordenarClientes(clientesFiltrados, ordenarPor);
  return clientesFiltrados;
};

export const useMostrarDetallesCliente = (
  dispatch,
  navigate,
  clientes,
  search
) => {
  const [mostrarCliente, setMostrarCliente] = useState(false);
  const [cliente, setCliente] = useState({});

  useEffect(() => {
    // Si no hay clientes, disparar la accion de pedir clientes
    if (!clientes) {
      dispatch(pedirClientesLista(search));
    }
  }, [dispatch, search, clientes, navigate]);

  useEffect(() => {
    dispatch(pedirClientesLista(search));
  }, [dispatch, search]);

  const manejarCerrarVentana = () => {
    setMostrarCliente(false);
  };

  const manejarMostrarDetallesCliente = (clienteId) => {
    const clienteSeleccionado = { ...clientes.find((c) => c.id === clienteId) };
    setCliente(clienteSeleccionado);
    setMostrarCliente(true);
  };

  return {
    mostrarCliente,
    cliente,
    manejarCerrarVentana,
    manejarMostrarDetallesCliente,
  };
};
