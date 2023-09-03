import React, { useState } from "react";
import { Form } from "react-bootstrap";

import VentanaMostrarProducto from "../ProductosLista/VentanaMostrarProducto";
import Mensaje from "../general/Mensaje";
import {
  StyledButtonsContainer,
  StyledCol,
  StyledProductoContenedor,
  StyledProductoInfoContainer,
  StyledRow,
  StyledSeleccionadorCantidad,
} from "./styles/FormularioProductosVenta.styles";
import BotonOpcionesProducto from "./BotonOpcionesProducto";
import { BASE_URL } from "../../constantes/constantes";

const FormularioProductoVenta = ({
  productos,
  manejarCambioCantidad,
  manejarConfirmarProducto,
  manejarCancelarProducto,
}) => {
  // Estado para la ventana emergente con la informacion del producto
  const [mostrarProducto, setMostrarProducto] = useState(false);

  // Hook para mostrar ventana con informacion del producto
  const [producto, setProducto] = useState({});

  // Funcion para mostrar informacion del producto
  const manejarMostrarDetallesProducto = (productoId) => {
    const productoSeleccionado = modificarProducto({
      ...productos.find((c) => c.id === productoId),
    });

    setProducto(productoSeleccionado);
    setMostrarProducto(true);
  };

  // Si no hay productos seleccionados pedir al usuario que seleccione al menos uno
  if (!productos.length)
    return (
      <StyledRow>
        <StyledCol>
          <Mensaje variant="primary">
            No hay productos agregados. Seleccione un producto para poder
            realizar la venta
          </Mensaje>
        </StyledCol>
      </StyledRow>
    );

  return (
    <>
      {productos.map((producto) => {
        return (
          <StyledProductoContenedor
            key={producto.id}
            onClick={() => manejarMostrarDetallesProducto(producto.id)}
          >
            {/* Informacion del producto */}
            <StyledProductoInfoContainer style={{fontSize: "13px"}}>
              <span>{producto.producto_nombre} </span>
              <img
                src={`${BASE_URL}${producto.producto_imagen}`}
                alt={producto.producto_nombre}
              />
            </StyledProductoInfoContainer>

            {/* Input para seleccionar cantidad */}
            <StyledSeleccionadorCantidad onClick={(e) => e.stopPropagation()}>
              <Form.Group controlId={producto.id}>
                <Form.Control
                  disabled={producto.confirmado}
                  type="number"
                  value={producto.cantidadVenta}
                  onChange={(e) =>
                    manejarCambioCantidad(
                      e,
                      Number(e.target.value),
                      producto.id
                    )
                  }
                />
              </Form.Group>
            </StyledSeleccionadorCantidad>

            {/* Botones para el producto de venta */}
            <StyledButtonsContainer>
              <BotonOpcionesProducto
                bg="green"
                producto={producto}
                onClick={manejarConfirmarProducto}
                disabled={producto.confirmado}
              >
                Confirmar
              </BotonOpcionesProducto>

              <BotonOpcionesProducto
                bg="blue"
                producto={producto}
                onClick={manejarConfirmarProducto}
                disabled={!producto.confirmado}
              >
                Modificar
              </BotonOpcionesProducto>

              <BotonOpcionesProducto
                bg="red"
                producto={producto}
                onClick={manejarCancelarProducto}
                disabled={false}
              >
                Eliminar
              </BotonOpcionesProducto>
            </StyledButtonsContainer>
          </StyledProductoContenedor>
        );
      })}

      {/* Mostrar producto */}
      {mostrarProducto && (
        <VentanaMostrarProducto
          producto={producto}
          mostrarProducto={mostrarProducto}
          manejarCerrarVentana={() => setMostrarProducto(false)}
        />
      )}
    </>
  );
};

const modificarProducto = (producto) => {
  const nuevoProducto = { ...producto };

  nuevoProducto.NOMBRE = nuevoProducto.producto_nombre;
  nuevoProducto.CANTIDAD = nuevoProducto.producto_cantidad;

  return nuevoProducto;
};

export default FormularioProductoVenta;
