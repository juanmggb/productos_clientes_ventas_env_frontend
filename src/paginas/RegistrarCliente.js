import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { registrarCliente } from "../actions/clienteActions";
import Loader from "../componentes/Loader";
import Mensaje from "../componentes/Mensaje";
import { RESET_CLIENTE_REGISTRAR } from "../constantes/clienteConstantes";

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

  useEffect(() => {
    // Si el registro fue correcto, reset clienteRegistrar y redireccionar a la pagina de clientes
    if (successRegistrar) {
      dispatch({ type: RESET_CLIENTE_REGISTRAR });
      alert("El registro fue exitoso");
      navigate("/clientes");
    }

    if (!productos) {
      navigate("/registrar-producto");
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
    <Loader />
  ) : error ? (
    <Mensaje variant="danger">{error}</Mensaje>
  ) : (
    productos && (
      <div style={{ padding: "25px", width: "100%" }}>
        {loadingRegistrar && <Loader />}
        {errorRegistrar && <Mensaje variant="danger">{errorRegistrar}</Mensaje>}
        {/* Esta es la parte que cambia en las paginas */}
        <h1>Registrar cliente</h1>
        <Container>
          <Form onSubmit={manejarRegistrarCliente}>
            <Row>
              <Col sm={12} md={4}>
                <h3>Datos del cliente</h3>
                {/* Nombre */}
                <Form.Group controlId="nombre">
                  <Form.Label>NOMBRE</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                {/* Contacto */}
                <Form.Group controlId="contacto">
                  <Form.Label>CONTACTO</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={contacto}
                    onChange={(e) => setContacto(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                {/* Telefono */}
                <Form.Group controlId="telefono">
                  <Form.Label>TELEFONO</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                {/* Correo */}
                <Form.Group controlId="correo">
                  <Form.Label>CORREO</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                {/* Tipo de pago */}
                <Form.Group controlId="tipoPago">
                  <Form.Label>TIPO DE PAGO</Form.Label>
                  <Form.Control
                    as="select"
                    value={tipoPago}
                    onChange={(e) => setTipoPago(e.target.value)}
                  >
                    <option value="EFECTIVO">EFECTIVO</option>
                    <option value="CREDITO">CREDITO</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col sm={12} md={4}>
                <h3>Datos de dirección</h3>
                {/* Calle */}
                <Form.Group controlId="calle">
                  <Form.Label>CALLE</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={calle}
                    onChange={(e) => setCalle(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                {/* Numero */}
                <Form.Group controlId="numero">
                  <Form.Label>NUMERO</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                {/* Colonia */}
                <Form.Group controlId="colonia">
                  <Form.Label>COLONIA</Form.Label>
                  <Form.Control
                    type="text"
                    value={colonia}
                    onChange={(e) => setColonia(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                {/* Ciudad */}
                <Form.Group controlId="ciudad">
                  <Form.Label>CIUDAD</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                {/* Municipio */}
                <Form.Group controlId="municipio">
                  <Form.Label>MUNICIPIO</Form.Label>
                  <Form.Control
                    type="text"
                    value={municipio}
                    onChange={(e) => setMunicipio(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                {/* Codigo postal */}
                <Form.Group controlId="codigoPostal">
                  <Form.Label>CODIGO POSTAL</Form.Label>
                  <Form.Control
                    type="text"
                    value={codigoPostal}
                    onChange={(e) => setCodigoPostal(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col sm={12} md={4}>
                <h3>Datos de los precios</h3>
                {productosCliente.map((p) => (
                  <Form.Group controlId={p.NOMBRE} key={p.id}>
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
                  </Form.Group>
                ))}
              </Col>
            </Row>

            <Button type="submit">Registrar cliente</Button>
          </Form>
        </Container>
      </div>
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
