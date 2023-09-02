export const obtenerFechaActual = () => {
  const date = new Date();
  let dia = date.getDate();
  dia = String(dia).padStart(2, "0");
  let mes = date.getMonth() + 1;
  mes = String(mes).padStart(2, "0");
  const anio = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  return `${anio}-${mes}-${dia}`;
};

export const obtenerValoresFiltroClientes = () => {
  const buscar = localStorage.getItem("clienteBuscar")
    ? JSON.parse(localStorage.getItem("clienteBuscar"))
    : "";

  const filtrarPor = localStorage.getItem("clienteFiltrarPor")
    ? JSON.parse(localStorage.getItem("clienteFiltrarPor"))
    : "nombre";

  const ordenarPor = localStorage.getItem("clienteOrdenarPor")
    ? JSON.parse(localStorage.getItem("clienteOrdenarPor"))
    : "defecto";

  return {
    buscar,
    filtrarPor,
    ordenarPor,
  };
};

export const guardarFiltros = (buscar, filtrarPor, ordenarPor) => {
  localStorage.setItem("clienteBuscar", JSON.stringify(buscar));
  localStorage.setItem("clienteFiltrarPor", JSON.stringify(filtrarPor));
  localStorage.setItem("clienteOrdenarPor", JSON.stringify(ordenarPor));
};
