import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  RESET_PRODUCTO_BORRAR,
  RESET_PRODUCTO_DETALLES,
} from "../constantes/productoConstantes";
import Loader from "../componentes/general/Loader";
import VentanaMostrarProducto from "../componentes/ProductosLista/VentanaMostrarProducto";
import Mensaje from "../componentes/general/Mensaje";
import ConfirmarBorrarObjeto from "../componentes/general/ConfirmarBorrarObjeto";
import {
  StyledCol,
  StyledContainer,
  StyledRow,
} from "./styles/ProductosLista.styles";
import TablaProductos from "../componentes/ProductosLista/TablaProductos";
import { useMostrarDetallesProducto } from "./utilis/ProductosLista.utilis";

const ProductosLista = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();
  // Funcion para nevagar en la aplicacion
  const navigate = useNavigate();
  // Obtener lista de productos del Redux
  const productoLista = useSelector((state) => state.productoLista);
  const { loading, productos, error } = productoLista;

  // Obtener el estado borrar producto del Redux
  const productoBorrar = useSelector((state) => state.productoBorrar);
  const {
    loading: loadingBorrar,
    success: successBorrar,
    error: errorBorrar,
  } = productoBorrar;

  const {
    mostrarProducto,
    producto,
    manejarCerrarVentana,
    manejarMostrarDetallesProducto,
  } = useMostrarDetallesProducto(dispatch, productos);

  // useEffect para mostrar las alertas de borrar producto
  useEffect(() => {
    if (loadingBorrar) {
      toast.loading("Eliminando producto");
    }

    if (successBorrar) {
      toast.dismiss();
      toast.success("Producto eliminado exitosamente", {
        duration: 2000,
      });
      // Reset producto borrar para no ejecutar este bloque de codigo cada vez que se ingresa a lista de productos
      dispatch({ type: RESET_PRODUCTO_BORRAR });
    }

    if (errorBorrar) {
      toast.remove();
      toast.error("Error al eliminar producto", {
        duration: 4000,
      });
    }
  }, [successBorrar, errorBorrar, loadingBorrar, dispatch]);

  // Funcion para redireccionar a la pagina del producto
  const manejarProductoDetalles = (id) => {
    // Resetar informacion de detalles del producto antes de redireccionar
    dispatch({ type: RESET_PRODUCTO_DETALLES });
    navigate(`/productos/${id}`);
  };

  // Funcion para borrar el producto
  const manejarBorrarProducto = (e, id) => {
    e.stopPropagation();
    toast((t) => <ConfirmarBorrarObjeto id={id} t={t} objeto={"producto"} />, {
      duration: 5000,
    });
  };

  // Renderizar loading si se estan cargando los productos
  if (loading)
    return (
      <StyledContainer fluid>
        <StyledRow>
          <StyledCol>
            <Loader />
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    );

  // Renderizar mensaje de errors si el servidor regresa un error al pedir la lista de productos
  if (error)
    return (
      <StyledContainer fluid>
        <StyledRow>
          <StyledCol>
            <Mensaje variant="danger">
              Hubo un error al cargar la lista de productos
            </Mensaje>
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    );

  // Si se obtienen los productos renderizar la tabla de productos
  return (
    productos && (
      <>
        <StyledContainer fluid>
          <h1>Productos</h1>
          <StyledRow>
            <StyledCol>
              {/* Tabla de productos */}
              <TablaProductos
                productos={productos}
                manejarMostrarDetallesProducto={manejarMostrarDetallesProducto}
                manejarProductoDetalles={manejarProductoDetalles}
                manejarBorrarProducto={manejarBorrarProducto}
              />
            </StyledCol>
          </StyledRow>
        </StyledContainer>

        {/* Mostrar ventana con detalles del producto */}
        {mostrarProducto && (
          <VentanaMostrarProducto
            producto={producto}
            mostrarProducto={mostrarProducto}
            manejarCerrarVentana={manejarCerrarVentana}
          />
        )}
      </>
    )
  );
};

export default ProductosLista;
