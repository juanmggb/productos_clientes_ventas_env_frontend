// Importar modulos
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  StyledBoton,
  StyledBotonContainer,
  StyledFormControlContainer,
  StyledFormGroup,
} from "./styles/FiltroListaVentas.styles";
import { useNavigate } from "react-router-dom";
import {
  guardarFiltros,
  obtenerValoresFiltroVentas,
} from "./utilis/FiltroListaVentas.utilis";

const FiltroListaVentas = () => {
  // Funcion para navegar de regreso a la pagina de clientes con el url modificado
  const navigate = useNavigate();

  // Establecer valore por defecto del formulario
  const { register, handleSubmit, watch, setValue } = useForm({});

  useEffect(() => {
    // Obtener valores del filtro desde el localstorage
    const {
      buscar: buscarInicial,
      filtrarPor: filtrarPorInicial,
      ordenarPor: ordenarPorInicial,
      fechaInicio: fechaInicioInicial,
      fechaFinal: fechaFinalInicial,
      horaInicio: horaInicioInicial,
      horaFinal: horaFinalInicial,
    } = obtenerValoresFiltroVentas();

    setValue("buscar", buscarInicial);
    console.log("buscarInicial->", buscarInicial);
    setValue("filtrarPor", filtrarPorInicial);
    console.log("filtrarPorInicial->", filtrarPorInicial);
    setValue("ordenarPor", ordenarPorInicial);
    console.log("ordenarPorInicial->", ordenarPorInicial);
    setValue("fechaInicio", fechaInicioInicial);
    console.log("fechaInicioInicial->", fechaInicioInicial);
    setValue("fechaFinal", fechaFinalInicial);
    console.log("fechaFinalInicial->", fechaFinalInicial);
    setValue("horaInicio", horaInicioInicial);
    console.log("horaInicioInicial->", horaInicioInicial);
    setValue("horaFinal", horaFinalInicial);
    console.log("horaFinalInicial->", horaFinalInicial);
  }, []);

  // Observar el valor de las entradas del formulario
  const {
    buscar,
    filtrarPor,
    ordenarPor,
    fechaInicio,
    fechaFinal,
    horaInicio,
    horaFinal,
  } = watch();

  // Usamos la data en el formulario para cambiar el estado de filtros cada vez que la data cambia
  // useEffect(() => {
  //   manejarFiltros(
  //     buscar,
  //     filtrarPor,
  //     ordenarPor,
  //     fechaInicio,
  //     fechaFinal,
  //     horaInicio,
  //     horaFinal
  //   );
  // }, [
  //   buscar,
  //   filtrarPor,
  //   ordenarPor,
  //   fechaInicio,
  //   fechaFinal,
  //   horaInicio,
  //   horaFinal,
  // ]);

  const onSubmit = (data) => {
    const url = `/ventas?filtrarpor=${filtrarPor}&buscar=${buscar}&ordernarpor=${ordenarPor}&fechainicio=${fechaInicio}&fechafinal=${fechaFinal}`;

    guardarFiltros(
      buscar,
      filtrarPor,
      ordenarPor,
      fechaInicio,
      fechaFinal,
      horaInicio,
      horaFinal
    );

    // console.log(data, url);
    navigate(url);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Buscar por campo seleccionado */}
            <StyledFormGroup>
              <Form.Label htmlFor="filtrarPor">
                BUSCAR COINCIDENCIA:{" "}
              </Form.Label>
              <Form.Control
                as="select"
                id="filtrarPor"
                {...register("filtrarPor", {
                  // valueAsNumber: true,
                })}
              >
                <option value="cliente">Por nombre cliente</option>
                <option value="tipoventa">Por tipo de venta</option>
                <option value="tipopago">Por tipo de pago</option>
                <option value="status">Por status</option>
                <option value="vendedor">Por nombre vendedor</option>
              </Form.Control>
              <Form.Control
                type="text"
                {...register("buscar")}
                autoComplete="off"
              ></Form.Control>
            </StyledFormGroup>

            {/* Ordenar por campo seleccionado */}
            <StyledFormGroup>
              <Form.Label htmlFor="ordenarPor">ORDENAR TABLA:</Form.Label>
              <Form.Control
                as="select"
                id="ordenarPor"
                {...register("ordenarPor", {
                  // valueAsNumber: true,
                })}
              >
                {/* <option value="defecto">Por defecto</option> */}
                <option value="fecha_recientes">
                  Por fecha (Más recientes primero)
                </option>
                <option value="fecha_antiguos">
                  Por fecha (Más antiguas primero)
                </option>
                <option value="cliente">Por nombre cliente</option>
                <option value="vendedor">Por nombre vendedor</option>
              </Form.Control>
            </StyledFormGroup>

            {/* Filtrar por rango de fechas */}
            <StyledFormGroup>
              <Form.Label>FILTRAR ENTRE RANGOS DE FECHAS</Form.Label>
              <StyledFormControlContainer>
                <Form.Control
                  type="date"
                  id="fechaInicio"
                  {...register("fechaInicio")}
                />
                <Form.Control
                  type="date"
                  id="fechaFinal"
                  {...register("fechaFinal")}
                  // value={fechaFinal}
                />
              </StyledFormControlContainer>
            </StyledFormGroup>
            {/* Filtrar por rango de hora */}
            {/* <StyledFormGroup>
              <Form.Label>FILTRAR POR HORA</Form.Label>

              <StyledFormControlContainer>
                <Form.Control
                  type="time"
                  id="horaInicio"
                  {...register("horaInicio")}
                />
                <Form.Control
                  type="time"
                  id="horaFinal"
                  {...register("horaFinal")}
                />
              </StyledFormControlContainer>
            </StyledFormGroup> */}

            <StyledBotonContainer>
              <StyledBoton className="btn btn-primary" type="submit">
                Actualizar Lista
              </StyledBoton>
            </StyledBotonContainer>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FiltroListaVentas;
