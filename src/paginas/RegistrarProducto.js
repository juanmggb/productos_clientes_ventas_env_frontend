import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registrarProducto } from "../actions/productoActions";
import Loader from "../componentes/Loader";
import Mensaje from "../componentes/Mensaje";
import { RESET_PRODUCTO_REGISTRAR } from "../constantes/productoConstantes";

const RegistrarProducto = () => {
  // Funcion para disparar acciones
  const dispatch = useDispatch();

  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Obtener el estado desde el Redux store
  const productoRegistrar = useSelector((state) => state.productoRegistrar);
  const {
    loading: loadingRegistrar,
    success: succcessRegistrar,
    error: errorRegistrar,
  } = productoRegistrar;

  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [imagen, setImagen] = useState(null);

  useEffect(() => {
    // Si el registro fue correcto, reset productoRegistrar y redireccionar a la pagina de productos
    if (succcessRegistrar) {
      dispatch({ type: RESET_PRODUCTO_REGISTRAR });
      alert("El registro fue exitoso");
      navigate("/productos");
    }
  }, [navigate, succcessRegistrar, dispatch]);

  const manejarRegistrarProducto = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("NOMBRE", nombre);
    formData.append("CANTIDAD", cantidad);
    formData.append("PRECIO", precio);
    if (imagen) {
      formData.append("IMAGEN", imagen);
    }

    // Disparar la accion de actualizar producto
    dispatch(registrarProducto(formData));
  };

  // Aqui no es necesario empezar con loading porque no hay un estado necesario al cargar el componente.
  return (
    <div style={{ padding: "25px", width: "50%" }}>
      {loadingRegistrar && <Loader />}
      {errorRegistrar && <Mensaje variant="danger">{errorRegistrar}</Mensaje>}
      {/* Esta es la parte que cambia en las paginas */}
      <h1>Registrar producto</h1>
      <Form onSubmit={manejarRegistrarProducto}>
        <Form.Group controlId="nombre">
          <Form.Label>NOMBRE</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="cantidad">
          <Form.Label>CANTIDAD</Form.Label>
          <Form.Control
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="precio">
          <Form.Label>PRECIO</Form.Label>
          <Form.Control
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>IMAGEN</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImagen(e.target.files[0])}
          />
        </Form.Group>

        <Button className="mt-3" type="submit">
          Registrar producto
        </Button>
      </Form>
    </div>
  );
};

export default RegistrarProducto;
