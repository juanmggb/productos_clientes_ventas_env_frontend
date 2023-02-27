import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  actualizarProducto,
  obtenerProductoDetalles,
} from "../actions/productoActions";
import Loader from "../componentes/Loader";
import Mensaje from "../componentes/Mensaje";
import {
  RESET_PRODUCTO_ACTUALIZAR,
  RESET_PRODUCTO_DETALLES,
} from "../constantes/productoConstantes";

const ProductoDetalles = ({ match }) => {
  // Obtener el id del producto
  const params = useParams(match);
  const productoId = params.id;

  // Funcion para disparar las acciones
  const dispatch = useDispatch();

  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Obtener el estado desde el Redux store
  const productoDetalles = useSelector((state) => state.productoDetalles);
  const { loading, producto, error } = productoDetalles;

  // Obtener el estado desde el Redux store
  const productoActualizar = useSelector((state) => state.productoActualizar);
  const {
    loading: loadingActualizar,
    success: successActualizar,
    error: errorActualizar,
  } = productoActualizar;

  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);

  useEffect(() => {
    // Si la actualizacion fue correcta, reset productoActualizar y redireccionar a la pagina de productos
    if (successActualizar) {
      dispatch({ type: RESET_PRODUCTO_ACTUALIZAR });
      alert("La actualización fue exitosa");
      navigate("/productos");
    }

    // Si no hay producto o el producto no es el que seleccione, disparar la accion de
    // obtener producto
    if (!producto || producto.id !== Number(productoId)) {
      dispatch(obtenerProductoDetalles(productoId));
    } else {
      setNombre(producto.NOMBRE);
      setCantidad(producto.CANTIDAD);
      setPrecio(producto.PRECIO);
    }
  }, [dispatch, producto, productoId, successActualizar, navigate]);

  const manejarActualizarProducto = (e) => {
    e.preventDefault();
    // Disparar la accion de actualizar producto
    dispatch(
      actualizarProducto({
        // El id es para el endpoint, no como informacion de actualizacion
        id: productoId,
        NOMBRE: nombre,
        CANTIDAD: cantidad,
        PRECIO: precio,
      })
    );
  };

  const manejarRegresar = () => {
    // Redireccionar a la pagina de productos
    dispatch({ type: RESET_PRODUCTO_DETALLES });
    navigate("/productos");
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Mensaje variant="danger">{error}</Mensaje>
  ) : (
    producto && (
      <div style={{ padding: "25px", width: "50%" }}>
        {loadingActualizar && <Loader />}
        {errorActualizar && (
          <Mensaje variant="danger">{errorActualizar}</Mensaje>
        )}
        {/* Esta es la parte que cambia en las paginas */}
        <h1>Producto #{producto.id}</h1>
        <Button variant="primary" onClick={manejarRegresar}>
          Regresar
        </Button>
        <Form onSubmit={manejarActualizarProducto}>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="cantidad">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="precio">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit">Actualizar producto</Button>
        </Form>
      </div>
    )
  );
};

export default ProductoDetalles;
