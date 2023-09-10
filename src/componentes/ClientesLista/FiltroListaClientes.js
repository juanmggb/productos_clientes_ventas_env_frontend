// Importar modulos
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  StyledFormGroup,
  StyledBoton,
  StyledBotonContainer,
} from "./styles/FiltroListaClientes.styles";
import { useNavigate } from "react-router-dom";
import {
  guardarFiltros,
  obtenerValoresFiltroClientes,
} from "./utilis/FiltroListaClientes.utilis";
const FiltroListaClientes = () => {
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
    } = obtenerValoresFiltroClientes();

    setValue("buscar", buscarInicial);

    setValue("filtrarPor", filtrarPorInicial);

    setValue("ordenarPor", ordenarPorInicial);
  }, []);

  // Observar el valor de las entradas del formulario
  const { buscar, filtrarPor, ordenarPor } = watch();

  const onSubmit = (data) => {
    const url = `/clientes?clientefiltrarpor=${filtrarPor}&clientebuscar=${buscar}&clienteordenarpor=${ordenarPor}`;

    guardarFiltros(buscar, filtrarPor, ordenarPor);

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
                {...register("filtrarPor", {})}
              >
                <option value="nombre">Por nombre cliente</option>
                <option value="contacto">Por nombre de contacto</option>
                <option value="tipopago">Por tipo de pago</option>
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
                {...register("ordenarPor", {})}
              >
                <option value="defecto">Por defecto</option>
                <option value="nombre">Por nombre cliente</option>
                <option value="contacto">Por nombre contacto</option>
              </Form.Control>
            </StyledFormGroup>

            <StyledBotonContainer>
              <StyledBoton type="submit">Actualizar Lista</StyledBoton>
            </StyledBotonContainer>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FiltroListaClientes;
