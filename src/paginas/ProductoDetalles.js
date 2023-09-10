import React, { useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  actualizarProducto,
  obtenerProductoDetalles,
} from "../actions/productoActions";
import {
  RESET_PRODUCTO_ACTUALIZAR,
  RESET_PRODUCTO_DETALLES,
} from "../constantes/productoConstantes";
import Loader from "../componentes/general/Loader";
import Mensaje from "../componentes/general/Mensaje";
import {
  StyledBoton,
  StyledCol,
  StyledContainer,
  StyledFormGroup,
  StyledRow,
} from "./styles/ProductoDetalles.styles";

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
      // Reset producto actualizar para que no se ejecute este bloque de codigo cada vez que se entra a producto detalles
      dispatch({ type: RESET_PRODUCTO_ACTUALIZAR });
      navigate("/productos");
    }

    if (errorActualizar) {
      toast.dismiss();
      toast.error("Error al actualizar");
    }
  }, [
    successActualizar,
    errorActualizar,
    loadingActualizar,
    dispatch,
    navigate,
  ]);

  useEffect(() => {
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

  const manejarActualizarProducto = (e) => {
    e.preventDefault();
    // Disparar la accion de actualizar producto

    if (!isAdmin && cantidad < cantidadInicial) {
      toast.dismiss();
      toast.error(
        `Solo un administrador puede reducir el número de productos. Por favor ingresa un valor superior a la cantidad inicial ${cantidadInicial}`
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

  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  // const isAdmin = false;

  // Renderizar loading si se estan cargando la informacion del producto
  if (loading)
    return (
      <StyledContainer fluid>
        <StyledRow style={{ height: "80%" }}>
          <StyledCol>
            <Loader />
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    );

  // Renderizar mensaje de errors si el servidor regresa un error al pedir la informacion del producto
  if (error)
    return (
      <StyledContainer fluid>
        <StyledRow style={{ height: "80%" }}>
          <StyledCol>
            <Mensaje variant="danger">
              Hubo un error al cargar la informacion del producto
            </Mensaje>
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    );

  if (isAdmin && producto)
    return (
      <StyledContainer fluid>
        <h1>Producto #{producto.id}</h1>
        <Row>
          <StyledCol>
            <StyledBoton onClick={manejarRegresar}>Regresar</StyledBoton>
          </StyledCol>
        </Row>
        <Form onSubmit={manejarActualizarProducto}>
          <StyledRow>
            <StyledCol md={6}>
              <StyledFormGroup controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={nombre}
                  autoComplete="off"
                  onChange={(e) => setNombre(e.target.value)}
                ></Form.Control>
              </StyledFormGroup>

              <StyledFormGroup controlId="cantidad">
                <Form.Label style={{ color: "white", fontWeight: "bold" }}>
                  Cantidad
                </Form.Label>
                <Form.Control
                  style={{ color: "black", fontWeight: "bold" }}
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  step='any'
                ></Form.Control>
              </StyledFormGroup>
            </StyledCol>

            <StyledCol md={6}>
              <StyledFormGroup controlId="precio">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  step='any'
                ></Form.Control>
              </StyledFormGroup>

              <StyledFormGroup controlId="imagen">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setImagen(e.target.files[0])}
                ></Form.Control>
              </StyledFormGroup>
            </StyledCol>
          </StyledRow>
          <Row>
            <StyledCol>
              <StyledBoton type="submit">Actualizar producto</StyledBoton>
            </StyledCol>
          </Row>
        </Form>
      </StyledContainer>
    );

  if (producto)
    return (
      <StyledContainer fluid>
        <StyledRow>
          <StyledCol>
            <h1>Producto #{producto.id}</h1>
            <StyledBoton onClick={manejarRegresar}>Regresar</StyledBoton>
          </StyledCol>
        </StyledRow>

        <Form onSubmit={manejarActualizarProducto}>
          <StyledRow>
            <StyledCol>
              <StyledFormGroup controlId="cantidad">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  value={cantidad}
                  min={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                ></Form.Control>
              </StyledFormGroup>
            </StyledCol>
          </StyledRow>

          <StyledRow>
            <StyledCol>
              <StyledBoton type="submit">Actualizar producto</StyledBoton>
            </StyledCol>
          </StyledRow>
        </Form>
      </StyledContainer>
    );
};

export default ProductoDetalles;
