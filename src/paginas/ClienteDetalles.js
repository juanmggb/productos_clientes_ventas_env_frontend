import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-hot-toast';
import styled from "styled-components";
import {
  actualizarCliente,
  obtenerClienteDetalles,
} from "../actions/clienteActions";
import Loader from "../componentes/Loader";
import {
  RESET_CLIENTE_ACTUALIZAR,
  RESET_CLIENTE_DETALLES,
} from "../constantes/clienteConstantes";

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

  & h1, h3 {
    color: white;
  }

  & button {
    margin: 10px 0px;
  }

  // Estilos para smarthphone
  @media (max-width: 480px) and (orientation: portrait) {
    height: 90svh;
    gap: 0px;

    & h1 {
    font-weight: bold;
    }

    & h3 {
      font-weight: bold;
      margin: 20px 0px 10px 0px;
    }
  }

  // Estilos pc
  @media (min-width: 480px) {

    & button {
      width: 200px;
    }
  }
`;

// Estilos Form.Group
const FormGroupStyled = styled(Form.Group)`
  display: flex;
  flex-direction:column;
  gap: 5px;
  margin-bottom: 5px;

  & label {
     color: white;
     font-weight: bold;
  }

  & input, select {
     color: black;
     font-weight: bold;
  }
`;


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

 // useEffect para mostrar las alertas
  useEffect(() => {

    if (loadingActualizar) {
      toast.loading('Actualizando cliente');
    }

    if (successActualizar) {
      toast.remove();
      toast.success('Cliente actualizado');
    }
    
    if (errorActualizar) {
      toast.dismiss();
      toast.error('Error al actualizar cliente');
    }

  }, [successActualizar, errorActualizar, loadingActualizar]) 

  useEffect(() => {
    // Si la actualizacion fue correcta, reset clienteActualizar y redireccionar a la pagina de clientes
    if (successActualizar) {
      dispatch({ type: RESET_CLIENTE_ACTUALIZAR });
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
    <Principal><Loader/></Principal>
  ) : error ? (
      <Principal>{toast.error('Error en el servidor')}</Principal>
  ) : (
    cliente && (
      <Principal>
        {/* Esta es la parte que cambia en las paginas */}
        <h1>Cliente #{cliente.id}</h1>
        <Button variant="primary" onClick={manejarRegresar}>
          Regresar
            </Button>
        <Container>
        <Form onSubmit={manejarActualizarCliente}>
          <Row>
            <Col sm={12} md={4}>
              <h3>Datos del cliente</h3>
              <FormGroupStyled controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                ></Form.Control>
              </FormGroupStyled>

              {/* Contacto */}
              <FormGroupStyled controlId="contacto">
                <Form.Label>Contacto</Form.Label>
                <Form.Control
                  required
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
                  type="text"
                  value={codigoPostal}
                  onChange={(e) => setCodigoPostal(e.target.value)}
                ></Form.Control>
              </FormGroupStyled>
            </Col>

            <Col sm={12} md={4}>
              <h3>Datos de los precios</h3>
              {preciosCliente.map((p) => (
                <FormGroupStyled controlId={p.producto_nombre} key={p.id}>
                  <Form.Label>Producto: {p.producto_nombre}</Form.Label>
                  <Form.Control
                    type="number"
                    value={p.PRECIO}
                    onChange={(e) =>
                      manejarCambioPrecio(Number(e.target.value), Number(p.id))
                    }
                  ></Form.Control>
                </FormGroupStyled>
              ))}
            </Col>
          </Row>
          <Button className="mt-3" type="submit">Actualizar cliente</Button>
          </Form>
        </Container>
      </Principal>
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
