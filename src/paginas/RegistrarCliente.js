import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
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
      <div style={{ padding: "25px", width: "50%" }}>
        {loadingRegistrar && <Loader />}
        {errorRegistrar && <Mensaje variant="danger">{errorRegistrar}</Mensaje>}
        {/* Esta es la parte que cambia en las paginas */}
        <h1>Registrar cliente</h1>
        <Form onSubmit={manejarRegistrarCliente}>
          <Form.Group controlId="nombre">
            <Form.Label>NOMBRE</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {productosCliente.map((p) => (
            <Form.Group controlId={p.NOMBRE} key={p.id}>
              <Form.Label>PRODUCTO: {p.NOMBRE}</Form.Label>
              <Form.Control
                type="number"
                value={p.PRECIO}
                onChange={(e) =>
                  manejarCambioPrecio(Number(e.target.value), Number(p.id))
                }
              ></Form.Control>
            </Form.Group>
          ))}

          <Button type="submit">Registrar cliente</Button>
        </Form>
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
