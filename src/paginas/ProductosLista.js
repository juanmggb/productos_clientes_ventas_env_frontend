import React, { useEffect, useState } from "react";
import { Button, Table, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import styled from "styled-components";
import {
  borrarProducto,
  pedirProductosLista,
} from "../actions/productoActions";
import { Icono } from "../styledComponents/alertaEliminar";
import {
  RESET_PRODUCTO_BORRAR,
  RESET_PRODUCTO_DETALLES,
} from "../constantes/productoConstantes";
import ImagenObjeto from "../componentes/ImagenObjeto";
import { useMediaQuery } from "react-responsive";
import Loader from "../componentes/Loader";
import VentanaMostrarProducto from "../componentes/VentanaMostrarProducto";

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
  padding: 0px 10px;
  user-select: none;

  display: flex;
  flex-direction: column;
  align-items: center;

  & div {
    font-size: 1.8em;
    height: 10vh;
    padding-top: 10px;
    color: white;
  }
  // Estilos para smarthphone
  @media (max-width: 480px) and (orientation: portrait) {
    height: 90svh;

    & div {
      height: 10vsh;
      font-weight: bold;
    }
  }
`;

// Estilos de la tabla
const TableStyled = styled(Table)`
  & tbody {
    height: 75svh;
    display: block;

    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;

    color: white;
  }

  & thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed; /* even columns width , fix width of table too*/

    color: white;
  }

  & th {
    text-align: center;
    vertical-align: middle;
  }

  & td {
    text-align: center;
    vertical-align: middle;
  }
`;

const ProductosLista = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();
  // Funcion para nevagar en la aplicacion
  const navigate = useNavigate();
  // Obtener el estado desde el Redux store
  const productoLista = useSelector((state) => state.productoLista);
  const { loading, productos, error } = productoLista;

  // Obtener el estado desde el Redux sotore
  const productoBorrar = useSelector((state) => state.productoBorrar);
  const {
    loading: loadingBorrar,
    success: successBorrar,
    error: errorBorrar,
  } = productoBorrar;

  const isSmallViewport = useMediaQuery({ maxWidth: 768 });
  const shouldShow = !isSmallViewport;

  const [mostrarProducto, setMostrarProducto] = useState(false);
  const [producto, setProducto] = useState({});

  // Get admin permision
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  // useEffect para mostrar las alertas
  useEffect(() => {
    if (loadingBorrar) {
      toast.loading("Eliminando producto");
    }

    if (successBorrar) {
      toast.dismiss();
      toast.success("Producto eliminado exitosamente", {
        duration: 2000,
      });
    }

    if (errorBorrar) {
      toast.dismiss();
      toast.error("Error al eliminar producto", {
        duration: 2000,
      });
    }
  }, [successBorrar, errorBorrar, loadingBorrar]);

  // Si se eliminó el producto
  useEffect(() => {
    if (successBorrar) {
      dispatch({ type: RESET_PRODUCTO_BORRAR });
    }

    // Si no hay productos, disparar la accion de pedir productos
    if (!productos) {
      dispatch(pedirProductosLista());
    }
  }, [dispatch, productos, successBorrar]);

  const manejarCerrarVentana = () => {
    setMostrarProducto(false);
  };

  const manejarMostrarDetallesProducto = (productoId) => {
    const clienteSeleccionado = {
      ...productos.find((c) => c.id === productoId),
    };
    setProducto(clienteSeleccionado);
    setMostrarProducto(true);
  };

  const manejarProductoDetalles = (id) => {
    // Redireccionar a la pagina del producto
    dispatch({ type: RESET_PRODUCTO_DETALLES });
    navigate(`/productos/${id}`);
  };

  // Funcion para mostrar la alerta de eliminar producto
  const alertaBorrarProducto = (e, id) => {
    e.stopPropagation();
    toast(
      (t) => (
        <Container>
          <Row>Estás seguro de eliminar el producto?</Row>
          <Row>
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "5px",
              }}
            >
              <Icono
                onClick={() => {
                  dispatch(borrarProducto(id));
                  toast.dismiss(t.id);
                }}
              >
                <i
                  class="fa-solid fa-circle-check fa-2xl"
                  style={{ color: "#67ce00" }}
                ></i>
              </Icono>
            </Col>
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "5px",
              }}
            >
              <Icono
                onClick={() => {
                  toast.dismiss(t.id);
                  toast.error("Operacion cancelada", { duration: 2000 });
                }}
              >
                <i
                  class="fa-sharp fa-solid fa-circle-xmark fa-2xl"
                  style={{ color: "#ff0000" }}
                ></i>
              </Icono>
            </Col>
          </Row>
        </Container>
      ),
      { duration: 5000 }
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
        <div>Productos</div>
        <TableStyled striped hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>IMAGEN</th>

              {shouldShow ? (
                <>
                  <th>NOMBRE</th>
                  <th>CANTIDAD</th>
                  <th>PRECIO</th>
                </>
              ) : null}

              <th>EDITAR</th>
              {isAdmin && <th>BORRAR</th>}
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr
                key={p.id}
                onClick={() => manejarMostrarDetallesProducto(p.id)}
              >
                <td style={{ color: "white" }}>{p.id}</td>
                <td style={{ color: "white" }}>
                  <ImagenObjeto
                    src={`http://127.0.0.1:8000/${p.IMAGEN}`}
                    alt={p.NOMBRE}
                  />
                </td>
                {shouldShow ? (
                  <>
                    <td style={{ color: "white" }}>{p.NOMBRE}</td>

                    {/* <td>{`http:/127.0.0.1:8000${p.IMAGEN}`}</td> */}
                    <td style={{ color: "white" }}>{p.CANTIDAD}</td>
                    <td style={{ color: "white" }}>{p.PRECIO}</td>
                  </>
                ) : null}

                <td>
                  <Button onClick={() => manejarProductoDetalles(p.id)}>
                    <i className="fa-solid fa-circle-info"></i>
                  </Button>
                </td>
                {isAdmin && (
                  <td>
                    <Button
                      variant="danger"
                      onClick={(e) => {
                        alertaBorrarProducto(e, p.id);
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </TableStyled>

        {/* Mostrar venta */}
        {mostrarProducto && (
          <VentanaMostrarProducto
            producto={producto}
            mostrarProducto={mostrarProducto}
            manejarCerrarVentana={manejarCerrarVentana}
          />
        )}
      </Principal>
    )
  );
};

export default ProductosLista;
