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

export const obtenerValoresFiltroVentas = () => {
  const buscar =
    localStorage.getItem("buscar") !== null
      ? JSON.parse(localStorage.getItem("buscar"))
      : "";

  const filtrarPor = localStorage.getItem("filtrarPor")
    ? JSON.parse(localStorage.getItem("filtrarPor"))
    : "cliente";

  const ordenarPor = localStorage.getItem("ordenarPor")
    ? JSON.parse(localStorage.getItem("ordenarPor"))
    : "fecha_recientes";

  const fechaInicio = localStorage.getItem("fechaInicio")
    ? JSON.parse(localStorage.getItem("fechaInicio"))
    : "";

  const fechaFinal = localStorage.getItem("fechaFinal")
    ? JSON.parse(localStorage.getItem("fechaFinal"))
    : obtenerFechaActual();

  return {
    buscar,
    filtrarPor,
    ordenarPor,
    fechaInicio,
    fechaFinal,
  };
};

export const guardarFiltros = (
  buscar,
  filtrarPor,
  ordenarPor,
  fechaInicio,
  fechaFinal,
  horaInicio,
  horaFinal
) => {
  localStorage.setItem("buscar", JSON.stringify(buscar));
  localStorage.setItem("filtrarPor", JSON.stringify(filtrarPor));
  localStorage.setItem("ordenarPor", JSON.stringify(ordenarPor));
  localStorage.setItem("fechaInicio", JSON.stringify(fechaInicio));
  localStorage.setItem("fechaFinal", JSON.stringify(fechaFinal));
};
