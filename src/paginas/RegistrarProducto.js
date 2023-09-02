import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { registrarProducto } from "../actions/productoActions";
import { RESET_PRODUCTO_REGISTRAR } from "../constantes/productoConstantes";
import { useForm } from "react-hook-form";
import {
  StyledBoton,
  StyledCol,
  StyledContainer,
  StyledFormGroup,
  StyledRow,
} from "./styles/RegistrarProducto.styles";

const RegistrarProducto = () => {
  // Funcion para disparar acciones
  const dispatch = useDispatch();

  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Obtener el estado registrar producto del Redux
  const productoRegistrar = useSelector((state) => state.productoRegistrar);
  const {
    loading: loadingRegistrar,
    success: successRegistrar,
    error: errorRegistrar,
  } = productoRegistrar;

  // useForm para validar formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // useEffect para mostrar las alertas de registrar producto
  useEffect(() => {
    if (loadingRegistrar) {
      toast.loading("Registrando producto");
    }

    if (successRegistrar) {
      toast.remove();
      toast.success("Producto registrado");
      // Reset producto registrar para que no se ejecute este bloque de codigo cada vez que se entra a registrar producto
      dispatch({ type: RESET_PRODUCTO_REGISTRAR });
      navigate("/productos");
    }

    if (errorRegistrar) {
      toast.dismiss();
      toast.error("Error al registrar producto");
    }
  }, [successRegistrar, errorRegistrar, loadingRegistrar, dispatch, navigate]);

  // useEffect para mostrar las alertas de validacion del formulario
  useEffect(() => {
    if (errors.precio) {
      toast.dismiss();
      toast.error(errors.precio.message);
    }

    if (errors.cantidad) {
      toast.dismiss();
      toast.error(errors.cantidad.message);
    }
    if (errors.nombre) {
      toast.dismiss();
      toast.error(errors.nombre.message);
    }
  }, [errors.nombre, errors.cantidad, errors.precio]);

  // Funcion para registrar producto
  const manejarRegistrarProducto = (data) => {
    const formData = new FormData();

    formData.append("NOMBRE", data.nombre);
    formData.append("CANTIDAD", data.cantidad);
    formData.append("PRECIO", data.precio);
    if (data.imagen[0]) {
      formData.append("IMAGEN", data.imagen[0]);
    }

    // Print formData data
    // for (const entry of formData.entries()) {
    //   console.log(entry[0], entry[1]);
    // }

    // Disparar la accion de actualizar producto
    dispatch(registrarProducto(formData));
  };

  return (
    <StyledContainer fluid>
      <h1>Registrar producto</h1>
      <Form onSubmit={handleSubmit(manejarRegistrarProducto)}>
        <StyledRow>
          <StyledCol md={6}>
            <StyledFormGroup controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                {...register("nombre", {
                  required: "Por favor, introduce el nombre del producto",
                })}
                autoComplete="off"
                type="text"
              ></Form.Control>
            </StyledFormGroup>

            <StyledFormGroup controlId="cantidad">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                {...register("cantidad", {
                  required: "Por favor, introduce la cantidad de producto",
                })}
                type="number"
                step="any"
              ></Form.Control>
            </StyledFormGroup>
          </StyledCol>

          <StyledCol md={6}>
            <StyledFormGroup controlId="precio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                {...register("precio", {
                  required: "Por favor, introduce el precio del producto",
                })}
                type="number"
                step="any"
              ></Form.Control>
            </StyledFormGroup>

            <StyledFormGroup controlId="formImage">
              <Form.Label>Imagen</Form.Label>
              <Form.Control {...register("imagen")} type="file" />
            </StyledFormGroup>
          </StyledCol>
        </StyledRow>
        <StyledRow>
          <StyledCol>
            <StyledBoton type="submit">Registrar producto</StyledBoton>
          </StyledCol>
        </StyledRow>
      </Form>
    </StyledContainer>
  );
};

export default RegistrarProducto;
