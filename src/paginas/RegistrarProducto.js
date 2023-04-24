import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import styled from 'styled-components';
import { registrarProducto } from "../actions/productoActions";
import { RESET_PRODUCTO_REGISTRAR } from "../constantes/productoConstantes";
import Loader from '../componentes/Loader';

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
  gap: 30px;

  & h1 {
    color: white;
  }

  // Estilos para smarthphone
  @media (max-width: 480px) and (orientation: portrait) {
    height: 90svh;

    & h1 {
      font-weight: bold;
    }
  }
`;

// Estilos Form.Group
const FormGroupStyled = styled(Form.Group)`
  display: flex;
  flex-direction:column;
  gap: 5px;
  margin-bottom: 5px;
`;

const RegistrarProducto = () => {
  // Funcion para disparar acciones
  const dispatch = useDispatch();

  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Obtener el estado desde el Redux store
  const productoRegistrar = useSelector((state) => state.productoRegistrar);
  const {
    loading: loadingRegistrar,
    success: successRegistrar,
    error: errorRegistrar,
  } = productoRegistrar;

  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [imagen, setImagen] = useState(null);

  // useEffect para mostrar las alertas
  useEffect(() => {

    if (loadingRegistrar) {
      toast.loading('Registrando producto');
    }

    if (successRegistrar) {
      toast.remove();
      toast.success('Producto registrado');
    }
    
    if (errorRegistrar) {
      toast.dismiss();
      toast.error('Error al registrar producto');
    }

  }, [successRegistrar, errorRegistrar, loadingRegistrar])

  useEffect(() => {
    // Si el registro fue correcto, reset productoRegistrar y redireccionar a la pagina de productos
    if (successRegistrar) {
      dispatch({ type: RESET_PRODUCTO_REGISTRAR });
      navigate("/productos");
    }
  }, [navigate, successRegistrar, dispatch]);

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
    <Principal>
      {/* Esta es la parte que cambia en las paginas */}
      <h1>Registrar producto</h1>
      <Container>
      <Form style = {{marginTop: '10px'}} onSubmit={manejarRegistrarProducto}>
        <Row>
          <Col lg={true} md={4}>
          <FormGroupStyled controlId="nombre">
            <Form.Label style = {{color: 'white', fontWeight: 'bold'}}>Nombre</Form.Label>
            <Form.Control
            style = {{color: 'black',
                      fontWeight: 'bold'}}
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            ></Form.Control>
         </FormGroupStyled>

          <FormGroupStyled controlId="cantidad">
            <Form.Label style = {{color: 'white', fontWeight: 'bold'}}>Cantidad</Form.Label>
            <Form.Control
            style = {{color: 'black',
                      fontWeight: 'bold'}}
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            ></Form.Control>
            </FormGroupStyled>
        </Col>
        
        <Col lg={true} md={4}>   
        <FormGroupStyled controlId="precio">
          <Form.Label style = {{color: 'white', fontWeight: 'bold'}}>Precio</Form.Label>
          <Form.Control
            style = {{color: 'black',
                      fontWeight: 'bold'}}
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          ></Form.Control>
        </FormGroupStyled>

        <FormGroupStyled controlId="formImage">
          <Form.Label style = {{color: 'white', fontWeight: 'bold'}}>Imagen</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImagen(e.target.files[0])}
          />
        </FormGroupStyled>

        <Button className="mt-3" type="submit">
          Registrar producto
              </Button>
          </Col> 
          </Row>
        </Form>
      </Container>    
    </Principal>
  );
};

export default RegistrarProducto;
