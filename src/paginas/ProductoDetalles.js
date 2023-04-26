import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import styled from "styled-components";
import {
  actualizarProducto,
  obtenerProductoDetalles,
} from "../actions/productoActions";
import {
  RESET_PRODUCTO_ACTUALIZAR,
  RESET_PRODUCTO_DETALLES,
} from "../constantes/productoConstantes";
import Loader from "../componentes/Loader";

// Estilos CSS con styled components
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

  & h1 {
    color: white;
  }

  & button {
    margin: 10px 0px;
  }

  // Estilos para smarthphone
  @media (max-width: 480px) and (orientation: portrait) {
    height: 90svh;

    & h1 {
      font-weight: bold;
    }
  }

  // Estilos pc
  @media (min-width: 480px) {
    gap: 30px;

    & button {
      width: 200px;
    }
  }
`;

// Estilos Form.Group
const FormGroupStyled = styled(Form.Group)`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 5px;
`;

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
  const [cantidadInicial, setCantidadInicial] = useState();
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [imagen, setImagen] = useState(null);

  // useEffect para mostrar las alertas
  useEffect(() => {
    if (loadingActualizar) {
      toast.remove();
      toast.loading("Actualizando producto");
    }

    if (successActualizar) {
      toast.remove();
      toast.success("Producto actualizado");
    }

    if (errorActualizar) {
      toast.dismiss();
      toast.error("Error al actualizar");
    }
  }, [successActualizar, errorActualizar, loadingActualizar]);

  useEffect(() => {
    // Si la actualizacion fue correcta, reset productoActualizar y redireccionar a la pagina de productos
    if (successActualizar) {
      dispatch({ type: RESET_PRODUCTO_ACTUALIZAR });
      navigate("/productos");
    }

    // Si no hay producto o el producto no es el que seleccione, disparar la accion de
    // obtener producto
    if (!producto || producto.id !== Number(productoId)) {
      dispatch(obtenerProductoDetalles(productoId));
    } else {
      setNombre(producto.NOMBRE);
      setCantidad(producto.CANTIDAD);
      setCantidadInicial(producto.CANTIDAD);
      setPrecio(producto.PRECIO);
    }
  }, [dispatch, producto, productoId, successActualizar, navigate]);

  // Get admin permision
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  const manejarActualizarProducto = (e) => {
    e.preventDefault();
    // Disparar la accion de actualizar producto

    if (!isAdmin && cantidad < cantidadInicial) {
      alert(
        `Solo un administrador puede reducir el número de productos. Ingresa un valo superior a la cantidad inicial ${cantidadInicial}`
      );
    } else {
      const formData = new FormData();

      formData.append("NOMBRE", nombre);
      formData.append("CANTIDAD", cantidad);
      formData.append("PRECIO", precio);
      if (imagen) {
        formData.append("IMAGEN", imagen);
      }
      dispatch(actualizarProducto(productoId, formData));
    }
  };

  const manejarRegresar = () => {
    // Redireccionar a la pagina de productos
    dispatch({ type: RESET_PRODUCTO_DETALLES });
    navigate("/productos");
  };

  return loading ? (
    <Principal>
      <Loader />
    </Principal>
  ) : error ? (
    <Principal>{toast.error("Error en el servidor")}</Principal>
  ) : (
    producto && (
      <Principal>
        {/* Esta es la parte que cambia en las paginas */}
        <h1>Producto #{producto.id}</h1>
        <Button onClick={manejarRegresar}>Regresar</Button>
        {isAdmin ? (
          <Container>
            <Form onSubmit={manejarActualizarProducto}>
              <Row>
                <Col lg={true} md={4}>
                  <FormGroupStyled controlId="nombre">
                    <Form.Label style={{ color: "white", fontWeight: "bold" }}>
                      Nombre
                    </Form.Label>
                    <Form.Control
                      style={{ color: "black", fontWeight: "bold" }}
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    ></Form.Control>
                  </FormGroupStyled>

                  <FormGroupStyled controlId="cantidad">
                    <Form.Label style={{ color: "white", fontWeight: "bold" }}>
                      Cantidad
                    </Form.Label>
                    <Form.Control
                      style={{ color: "black", fontWeight: "bold" }}
                      type="number"
                      value={cantidad}
                      onChange={(e) => setCantidad(e.target.value)}
                    ></Form.Control>
                  </FormGroupStyled>
                </Col>

                <Col lg={true} md={4}>
                  <FormGroupStyled controlId="precio">
                    <Form.Label style={{ color: "white", fontWeight: "bold" }}>
                      Precio
                    </Form.Label>
                    <Form.Control
                      style={{ color: "black", fontWeight: "bold" }}
                      type="number"
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                    ></Form.Control>
                  </FormGroupStyled>

                  <FormGroupStyled controlId="imagen">
                    <Form.Label style={{ color: "white", fontWeight: "bold" }}>
                      Imagen
                    </Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => setImagen(e.target.files[0])}
                    ></Form.Control>
                  </FormGroupStyled>

                  <Button type="submit">Actualizar producto</Button>
                </Col>
              </Row>
            </Form>
          </Container>
        ) : (
          <Form onSubmit={manejarActualizarProducto}>
            <Row>
              <Col ms={12}>
                <FormGroupStyled controlId="cantidad">
                  <Form.Label
                    style={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Cantidad
                  </Form.Label>
                  <Form.Control
                    style={{ color: "black", fontWeight: "bold" }}
                    type="number"
                    value={cantidad}
                    min={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                  ></Form.Control>
                </FormGroupStyled>
                <Button type="submit">Actualizar producto</Button>
              </Col>
            </Row>
          </Form>
        )}
      </Principal>
    )
  );
};

export default ProductoDetalles;
