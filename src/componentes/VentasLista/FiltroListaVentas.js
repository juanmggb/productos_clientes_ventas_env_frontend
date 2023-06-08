// Importar modulos
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import {
  StyledFormControlContainer,
  StyledFormGroup,
} from "./styles/FiltroListaVentas.styles";

const FiltroListaVentas = ({ manejarFiltros }) => {
  // Obtener la fecha actual
  const hoy = obtenerFechaActual();

  // Establecer valore por defecto del formulario
  const { register, watch } = useForm({
    defaultValues: {
      buscar: "",
      filtrarPor: 1,
      ordenarPor: 0,
      fechaInicio: "",
      fechaFinal: hoy,
      horaInicio: "",
      horaFinal: "",
    },
  });

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
  useEffect(() => {
    manejarFiltros(
      buscar,
      filtrarPor,
      ordenarPor,
      fechaInicio,
      fechaFinal,
      horaInicio,
      horaFinal
    );
  }, [
    buscar,
    filtrarPor,
    ordenarPor,
    fechaInicio,
    fechaFinal,
    horaInicio,
    horaFinal,
  ]);

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            {/* Buscar por campo seleccionado */}
            <StyledFormGroup>
              <Form.Label htmlFor="filtrarPor">
                BUSCAR COINCIDENCIA:{" "}
              </Form.Label>
              <Form.Control
                as="select"
                id="filtrarPor"
                {...register("filtrarPor", {
                  valueAsNumber: true,
                })}
              >
                <option value="0">Por nombre cliente</option>
                <option value="1">Por tipo de venta</option>
                <option value="2">Por tipo de pago</option>
                <option value="3">Por status</option>
                <option value="4">Por nombre vendedor</option>
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
                  valueAsNumber: true,
                })}
              >
                <option value="0">Por defecto</option>
                <option value="1">Por nombre cliente</option>
                <option value="2">Por fecha</option>
                <option value="3">Por hora</option>
                <option value="4">Por nombre vendedor</option>
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
                  value={fechaFinal}
                />
              </StyledFormControlContainer>
            </StyledFormGroup>
            {/* Filtrar por rango de hora */}
            <StyledFormGroup>
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
            </StyledFormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const obtenerFechaActual = () => {
  const date = new Date();
  let dia = date.getDate();
  dia = String(dia).padStart(2, "0");
  let mes = date.getMonth() + 1;
  mes = String(mes).padStart(2, "0");
  const anio = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  return `${anio}-${mes}-${dia}`;
};

export default FiltroListaVentas;
