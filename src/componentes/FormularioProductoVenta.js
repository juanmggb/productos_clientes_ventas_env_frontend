import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import styled from 'styled-components';

const Productos = styled.div`  
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 125px;
  grid-auto-rows: 125px;
  grid-gap: 15px;
`;

const Mensaje = styled.p`
  user-select: none;
  font-weight: bold;
  align-self: top;
`;

const ProductoContenedor = styled.div`
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.5);
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 120px 1fr 3.2fr;
  grid-template-rows: 13.5px 1fr;
  grid-template-areas: 'ImagenProducto DatosProducto DatosProducto'
                      'ImagenProducto SeleccionadorCantidad OpcionesProducto';
  border-radius: 10px;
`;

const FlexDiv = styled.div `
  padding-top: 10px;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  user-select: none;
`;

const ImagenProducto = styled(FlexDiv)`
  grid-area: ImagenProducto;
  position:  relative;
  padding: 0px;
`;

const Imagen = styled.img`
  position:absolute;
  width: 90%;
  height: 90%;
  border-radius: 5px;
`;

const DatosProducto =  styled(FlexDiv)`
  grid-area: DatosProducto;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  padding: 10px;
  padding-top: 20px;
`;

const SeleccionadorCantidad = styled(FlexDiv)`
  grid-area: SeleccionadorCantidad;
  position: relative;
  height: 100%;
  padding-top: 5px;
  padding-bottom: 2%;
  justify-content: space-around;
`;

const OpcionesProducto = styled(FlexDiv)`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    padding-top: 5px;
    padding-bottom: 1.3%;
`;

const FormularioProductoVenta = ({
  productos,
  manejarCambioCantidad,
  manejarConfirmarProducto,
  manejarCancelarProducto,
}) => {
  if(!productos.length) return <Mensaje>No hay productos agregados</Mensaje>
  return (
    <Productos>
      {
        productos.map(producto =>{
          return(
            <ProductoContenedor key={producto.id}>
            <DatosProducto>
                    CLAVE: {producto.id} | NOMBRE: {producto.producto_nombre} | PRECIO: $
                    {producto.PRECIO} | CANTIDAD DISPONIBLE: {producto.producto_cantidad}
            </DatosProducto>
            <ImagenProducto>
                <Imagen src= {'../Imagenes/'+producto.producto_nombre+'.jpg'}/>
            </ImagenProducto>
            <SeleccionadorCantidad>
                <Form.Group controlId={producto.id}>
                    <Form.Control
                    style= {{backgroundColor: 'rgba(220,220,255)', fontWeight: 'bold'}}
                    disabled={producto.confirmado}
                    type="number"
                    value={producto.cantidadVenta}
                    onChange={(e) =>
                    manejarCambioCantidad(Number(e.target.value), producto.id)
                    }/>
                </Form.Group>
            </SeleccionadorCantidad>
            <OpcionesProducto>
                <Button
                  style= {{backgroundColor: 'green', color: 'white'}}
                  disabled={producto.confirmado}
                  onClick={() => manejarConfirmarProducto(producto.id)}>
                  Confirmar
                </Button>
                <Button
                  style= {{backgroundColor: 'blue', color: 'white'}}
                  disabled={!producto.confirmado}
                  onClick={() => manejarConfirmarProducto(producto.id)}>
                  Modificar
                </Button>
                <Button 
                  style= {{backgroundColor: 'red', color: 'white'}}
                  onClick={() => manejarCancelarProducto(producto.id)}>
                  Eliminar
                </Button>
            </OpcionesProducto>
        </ProductoContenedor>
          )
        })
      }
    </Productos>
  );
};

export default FormularioProductoVenta;
