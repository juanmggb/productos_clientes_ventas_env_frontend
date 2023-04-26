import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import styled from "styled-components";
import Loader from "../componentes/Loader";
import { registrarCliente } from "../actions/clienteActions";
import { RESET_CLIENTE_REGISTRAR } from "../constantes/clienteConstantes";
import { pedirProductosLista } from "../actions/productoActions";

// Estilos de la página principal
const Principal = styled.div`
  position: fixed;
  background: linear-gradient(
    rgb(54, 54, 82),
    15%,
    rgb(84, 106, 144),
    60%,
    rgb(68, 111, 151)
  );

  height: 90vh;
  width: 100vw;
  padding: 30px;
  user-select: none;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  & h1,
  h3 {
    color: white;
  }

  // Estilos para smarthphone
  @media (max-width: 480px) and (orientation: portrait) {
    height: 90svh;

    & h1 {
      font-weight: bold;
    }

    & h3 {
      font-weight: bold;
      margin: 20px 0px 10px 0px;
    }
  }
`;

// Estilos Form.Group
const FormGroupStyled = styled(Form.Group)`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 5px;

  & label {
    color: white;
    font-weight: bold;
  }

  & input,
  select {
    color: black;
    font-weight: bold;
  }
`;

const RegistrarCliente = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();

  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Obtener el estado desde el Redux store
  const productoLista = useSelector((state) => state.productoLista);
  const { loading, productos, error } = productoLista;

  // Obtener el estado desde el Redux store
  const clienteRegistrar = useSelector((state) => state.clienteRegistrar);
  const {
    loading: loadingRegistrar,
    success: successRegistrar,
    error: errorRegistrar,
  } = clienteRegistrar;

  const [nombre, setNombre] = useState("");
  const [productosCliente, setProductosCliente] = useState([]);

  const [contacto, setContacto] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [tipoPago, setTipoPago] = useState("EFECTIVO");
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [colonia, setColonia] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");

  // useEffect para mostrar las alertas
  useEffect(() => {
    if (loadingRegistrar) {
      toast.loading("Registrando cliente");
    }

    if (successRegistrar) {
      toast.remove();
      toast.success("Cliente registrado");
    }

    if (errorRegistrar) {
      toast.dismiss();
      toast.error("Error al registrar cliente");
    }
  }, [successRegistrar, errorRegistrar, loadingRegistrar]);

  useEffect(() => {
    // Si el registro fue correcto, reset clienteRegistrar y redireccionar a la pagina de clientes
    if (successRegistrar) {
      dispatch({ type: RESET_CLIENTE_REGISTRAR });
      navigate("/clientes");
    }

    if (!productos) {
      // navigate("/registrar-producto");
      dispatch(pedirProductosLista());
    } else {
      // Esto permite que el nuevo cliente tenga el precio por defecto de todos los productos en la base de datos
      setProductosCliente(productos);
    }
  }, [dispatch, successRegistrar, productos, navigate]);

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

  const manejarRegistrarCliente = (e) => {
    e.preventDefault();
    // Disparar la accion de actualizar cliente

    // Esta funcion permite crear un array de precios con el formato que recibe el backend
    const nuevosPreciosCliente = crearPreciosCliente(productosCliente);

    dispatch(
      registrarCliente({
        NOMBRE: nombre,
        CONTACTO: contacto,
        TELEFONO: telefono,
        CORREO: correo,
        TIPO_PAGO: tipoPago,
        direccion: {
          CALLE: calle,
          NUMERO: numero,
          COLONIA: colonia,
          CIUDAD: ciudad,
          MUNICIPIO: municipio,
          CP: codigoPostal,
        },
        preciosCliente: nuevosPreciosCliente,
      })
    );
  };

  return loading ? (
    <Principal>
      <Loader />
    </Principal>
  ) : error ? (
    <Principal>{toast.error("Error en el servidor")}</Principal>
  ) : (
    productos && (
      <Principal>
        {/* Esta es la parte que cambia en las paginas */}
        <h1>Registrar cliente</h1>
        <Container>
          <Form onSubmit={manejarRegistrarCliente}>
            <Row>
              <Col sm={12} md={4}>
                <h3>Datos del cliente</h3>
                {/* Nombre */}
                <FormGroupStyled controlId="nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  ></Form.Control>
                </FormGroupStyled>

                {/* Contacto */}
                <FormGroupStyled controlId="contacto">
                  <Form.Label>Contacto</Form.Label>
                  <Form.Control
                    type="text"
                    value={contacto}
                    onChange={(e) => setContacto(e.target.value)}
                  ></Form.Control>
                </FormGroupStyled>

                {/* Telefono */}
                <FormGroupStyled controlId="telefono">
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  ></Form.Control>
                </FormGroupStyled>

                {/* Correo */}
                <FormGroupStyled controlId="correo">
                  <Form.Label>Correo</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  ></Form.Control>
                </FormGroupStyled>

                {/* Tipo de pago */}
                <FormGroupStyled controlId="tipoPago">
                  <Form.Label>Tipo de pago</Form.Label>
                  <Form.Control
                    as="select"
                    value={tipoPago}
                    onChange={(e) => setTipoPago(e.target.value)}
                  >
                    <option value="EFECTIVO">EFECTIVO</option>
                    <option value="CREDITO">CREDITO</option>
                  </Form.Control>
                </FormGroupStyled>
              </Col>
              <Col sm={12} md={4}>
                <h3>Datos de dirección</h3>
                {/* Calle */}
                <FormGroupStyled controlId="calle">
                  <Form.Label>Calle</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={calle}
                    onChange={(e) => setCalle(e.target.value)}
                  ></Form.Control>
                </FormGroupStyled>

                {/* Numero */}
                <FormGroupStyled controlId="numero">
                  <Form.Label>Número</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                  ></Form.Control>
                </FormGroupStyled>

                {/* Colonia */}
                <FormGroupStyled controlId="colonia">
                  <Form.Label>Colonia</Form.Label>
                  <Form.Control
                    type="text"
                    value={colonia}
                    onChange={(e) => setColonia(e.target.value)}
                  ></Form.Control>
                </FormGroupStyled>

                {/* Ciudad */}
                <FormGroupStyled controlId="ciudad">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                  ></Form.Control>
                </FormGroupStyled>

                {/* Municipio */}
                <FormGroupStyled controlId="municipio">
                  <Form.Label>Municipio</Form.Label>
                  <Form.Control
                    type="text"
                    value={municipio}
                    onChange={(e) => setMunicipio(e.target.value)}
                  ></Form.Control>
                </FormGroupStyled>

                {/* Codigo postal */}
                <FormGroupStyled controlId="codigoPostal">
                  <Form.Label>C.P</Form.Label>
                  <Form.Control
                    type="number"
                    value={codigoPostal}
                    onChange={(e) => setCodigoPostal(e.target.value)}
                  ></Form.Control>
                </FormGroupStyled>
              </Col>
              <Col sm={12} md={4}>
                <h3>Datos de los precios</h3>
                {productosCliente.map((p) => (
                  <FormGroupStyled controlId={p.NOMBRE} key={p.id}>
                    <Form.Label>PRODUCTO: {p.NOMBRE}</Form.Label>
                    <Form.Control
                      type="number"
                      value={p.PRECIO}
                      onChange={(e) =>
                        manejarCambioPrecio(
                          Number(e.target.value),
                          Number(p.id)
                        )
                      }
                    ></Form.Control>
                  </FormGroupStyled>
                ))}
              </Col>
            </Row>

            <Button className="mt-3" type="submit">
              Registrar cliente
            </Button>
          </Form>
        </Container>
      </Principal>
    )
  );
};

const crearPreciosCliente = (productosCliente) => {
  const preciosCliente = productosCliente.map((productoCliente) => {
    const productoId = productoCliente.id;
    const precioCliente = productoCliente.PRECIO;

    return { productoId, precioCliente };
  });

  return preciosCliente;
};

export default RegistrarCliente;
