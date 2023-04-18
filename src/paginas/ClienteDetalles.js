import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  actualizarCliente,
  obtenerClienteDetalles,
} from "../actions/clienteActions";
import Loader from "../componentes/Loader";
import Mensaje from "../componentes/Mensaje";
import {
  RESET_CLIENTE_ACTUALIZAR,
  RESET_CLIENTE_DETALLES,
} from "../constantes/clienteConstantes";

const ClienteDetalles = ({ match }) => {
  // Obtener el id del cliente
  const params = useParams(match);
  const clienteId = params.id;

  // Funcion para disparar las acciones
  const dispatch = useDispatch();

  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Obtener el estado desde el Redux store
  const clienteDetalles = useSelector((state) => state.clienteDetalles);
  const { loading, cliente, error } = clienteDetalles;

  // Obtener el estado desde el Redux store
  const clienteActualizar = useSelector((state) => state.clienteActualizar);
  const {
    loading: loadingActualizar,
    success: successActualizar,
    error: errorActualizar,
  } = clienteActualizar;

  const [nombre, setNombre] = useState("");
  const [preciosCliente, setPreciosCliente] = useState([]);

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
    // Si la actualizacion fue correcta, reset clienteActualizar y redireccionar a la pagina de clientes
    if (successActualizar) {
      dispatch({ type: RESET_CLIENTE_ACTUALIZAR });
      alert("La actualización fue exitosa");
      navigate("/clientes");
    }

    // Si no hay cliente o el cliente no es el que seleccione, disparar la accion de obtener cliente
    if (!cliente || cliente.id !== Number(clienteId)) {
      dispatch(obtenerClienteDetalles(clienteId));
    } else {
      setNombre(cliente.NOMBRE);

      setContacto(cliente.CONTACTO);
      setTelefono(cliente.TELEFONO);
      setCorreo(cliente.CORREO);
      setTipoPago(cliente.TIPO_PAGO);

      setCalle(cliente.DIRECCION.CALLE);
      setNumero(cliente.DIRECCION.NUMERO);
      setColonia(cliente.DIRECCION.COLONIA);
      setCiudad(cliente.DIRECCION.CIUDAD);
      setMunicipio(cliente.DIRECCION.MUNICIPIO);
      setCodigoPostal(cliente.DIRECCION.CP);
      // El estado es un arreglo igual al arreglo de envia el backend
      setPreciosCliente(cliente.precios_cliente);
    }
  }, [dispatch, cliente, clienteId, successActualizar, navigate]);

  // Esta funcion es necesaria debido a que el estado preciosCliente es una array y no es posible usar setPreciosCliente de forma directa en el formulario
  const manejarCambioPrecio = (nuevo_precio, precioId) => {
    // Obtener el index del producto cuyo precio hay que cambiar
    const indexPrecio = preciosCliente.findIndex(
      (precio) => precio.id === precioId
    );

    // Crear una copia del arreglo de precios
    const nuevosPreciosCliente = [...preciosCliente];

    // Actualizar el precio con el index seleccionado
    nuevosPreciosCliente[indexPrecio] = {
      ...preciosCliente[indexPrecio],
      PRECIO: nuevo_precio,
    };

    setPreciosCliente(nuevosPreciosCliente);
  };

  const manejarActualizarCliente = (e) => {
    e.preventDefault();
    // Disparar la accion de actualizar cliente

    // Esta funcion permite crear un array de precios con el formato que recibe el backend
    const nuevosPreciosCliente = crearNuevosPreciosCliente(preciosCliente);

    dispatch(
      actualizarCliente({
        // El id es para el endpoint, no como informacion de actualizacion
        id: clienteId,
        NOMBRE: nombre,
        CONTACTO: contacto,
        TELEFONO: telefono,
        CORREO: correo,
        TIPO_PAGO: tipoPago,
        nuevaDireccion: {
          direccionClienteId: cliente.DIRECCION.id,
          CALLE: calle,
          NUMERO: numero,
          COLONIA: colonia,
          CIUDAD: ciudad,
          MUNICIPIO: municipio,
          CP: codigoPostal,
        },
        nuevosPreciosCliente: nuevosPreciosCliente,
      })
    );
  };

  const manejarRegresar = () => {
    // Redireccionar a la pagina de clientes
    dispatch({ type: RESET_CLIENTE_DETALLES });
    navigate("/clientes");
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Mensaje variant="danger">{error}</Mensaje>
  ) : (
    cliente && (
      <div style={{ padding: "25px", width: "100%" }}>
        {loadingActualizar && <Loader />}
        {errorActualizar && (
          <Mensaje variant="danger">{errorActualizar}</Mensaje>
        )}
        {/* Esta es la parte que cambia en las paginas */}
        <h1>Cliente #{cliente.id}</h1>
        <Button variant="primary" onClick={manejarRegresar}>
          Regresar
        </Button>
        <Form onSubmit={manejarActualizarCliente}>
          <Row>
            <Col sm={12} md={4}>
              <h3>Datos del cliente</h3>
              <Form.Group controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
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
              {preciosCliente.map((p) => (
                <Form.Group controlId={p.producto_nombre} key={p.id}>
                  <Form.Label>Producto: {p.producto_nombre}</Form.Label>
                  <Form.Control
                    type="number"
                    value={p.PRECIO}
                    onChange={(e) =>
                      manejarCambioPrecio(Number(e.target.value), Number(p.id))
                    }
                  ></Form.Control>
                </Form.Group>
              ))}
            </Col>
          </Row>

          <Button type="submit">Actualizar cliente</Button>
        </Form>
      </div>
    )
  );
};

const crearNuevosPreciosCliente = (preciosCliente) => {
  const nuevosPreciosCliente = preciosCliente.map((precioCliente) => {
    const precioClienteId = precioCliente.id;
    const nuevoPrecioCliente = precioCliente.PRECIO;

    return { precioClienteId, nuevoPrecioCliente };
  });

  return nuevosPreciosCliente;
};

export default ClienteDetalles;
