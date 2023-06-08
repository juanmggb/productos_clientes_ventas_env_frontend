// Importar modulos
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { StyledFormGroup } from "./styles/FiltroListaClientes.styles";

const FiltroListaClientes = ({ manejarFiltros }) => {
  // useForm para validar el formulario
  const { register, watch } = useForm({
    defaultValues: {
      buscar: "",
      filtrarPor: 1,
      ordenarPor: 0,
    },
  });

  // Observar el valor de las entradas del formulario
  const { buscar, filtrarPor, ordenarPor } = watch();

  // Usamos la data en el formulario para cambiar el estado de filtros cada vez que la data cambia
  useEffect(() => {
    manejarFiltros(buscar, filtrarPor, ordenarPor);
  }, [buscar, filtrarPor, ordenarPor]);

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
                <option value="1">Por nombre de contacto</option>
                <option value="2">Por tipo de pago</option>
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
                <option value="2">Por nombre contacto</option>
                <option value="3">Por tipo de pago</option>
              </Form.Control>
            </StyledFormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FiltroListaClientes;
