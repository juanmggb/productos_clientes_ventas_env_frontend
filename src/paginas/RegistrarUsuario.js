import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { RESET_USUARIO_REGISTRAR } from "../constantes/usuarioConstantes";
import { registrarUsuario } from "../actions/usuarioActions";
import { useForm } from "react-hook-form";
import {
  StyledBoton,
  StyledCol,
  StyledContainer,
  StyledFormGroup,
  StyledRow,
} from "./styles/RegistrarUsuario.styles";

const RegistrarUsuario = () => {
  // Funcion para disparar acciones
  const dispatch = useDispatch();

  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Obtener el estado registrar usuario del Redux store
  const usuarioRegistrar = useSelector((state) => state.usuarioRegistrar);
  const {
    loading: loadingRegistrar,
    success: successRegistrar,
    error: errorRegistrar,
  } = usuarioRegistrar;

  // useForm para validar formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // useEffect para mostrar las alertas de registro de usuario
  useEffect(() => {
    if (loadingRegistrar) {
      toast.loading("Registrando usuario");
    }

    if (successRegistrar) {
      toast.remove();
      toast.success("Usuario registrado");
      dispatch({ type: RESET_USUARIO_REGISTRAR });
      navigate("/usuarios");
    }

    if (errorRegistrar) {
      toast.dismiss();
      toast.error("Error al registrar usuario");
    }
  }, [successRegistrar, errorRegistrar, loadingRegistrar, dispatch, navigate]);

  // useEffect para mostrar las alertas de validacion del formulario
  useEffect(() => {
    if (errors.password2) {
      toast.dismiss();
      toast.error(errors.password2.message);
    }

    if (errors.password1) {
      toast.dismiss();
      toast.error(errors.password1.message);
    }

    if (errors.nombreUsuario) {
      toast.dismiss();
      toast.error(errors.nombreUsuario.message);
    }

    if (errors.nombre) {
      toast.dismiss();
      toast.error(errors.nombre.message);
    }
  }, [errors.nombre, errors.nombreUsuario, errors.password1, errors.password2]);

  // Function para registrar usuario
  const manejarRegistrarUsuario = (data) => {
    if (data.password1 !== data.password2) {
      toast.error("Las contraseñas deben ser iguales", { duration: 4000 });
    } else {
      const formData = new FormData();

      formData.append("name", data.nombre);
      formData.append("username", data.nombreUsuario);
      formData.append("is_admin", data.isAdmin);
      formData.append("password1", data.password1);
      formData.append("password2", data.password2);
      if (data.imagen[0]) {
        formData.append("IMAGEN", data.imagen[0]);
      }

      // Print formData data
      // for (const entry of formData.entries()) {
      //   console.log(entry[0], entry[1]);
      // }

      // Disparar la accion para registrar usuario
      dispatch(registrarUsuario(formData));
    }
  };
  return (
    <StyledContainer fluid>
      <h1>Registrar usuario</h1>

      <Form onSubmit={handleSubmit(manejarRegistrarUsuario)}>
        <StyledRow>
          <StyledCol md={6}>
            <StyledFormGroup controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                {...register("nombre", {
                  required: "Por favor, introduce el nombre",
                })}
                type="text"
                autoComplete="off"
              ></Form.Control>
            </StyledFormGroup>

            <StyledFormGroup controlId="nombreUsuario">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                {...register("nombreUsuario", {
                  required: "Por favor, introduce el nombre de usuario",
                })}
                type="text"
                autoComplete="off"
              ></Form.Control>
            </StyledFormGroup>

            <StyledFormGroup controlId="password1">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                {...register("password1", {
                  required: "Por favor, introduce la contraseña",
                })}
                type="password"
              ></Form.Control>
            </StyledFormGroup>

            <StyledFormGroup controlId="password2">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control
                {...register("password2", {
                  required: "Por favor, confirma la contraseña",
                })}
                type="password"
              ></Form.Control>
            </StyledFormGroup>
          </StyledCol>
          <StyledCol md={6}>
            <StyledFormGroup controlId="isAdmin">
              <Form.Label>Permisos</Form.Label>
              <Form.Select {...register("isAdmin")}>
                <option value={true}>ADMINISTRADOR</option>
                <option value={false}>NO ES ADMINISTRADOR</option>
              </Form.Select>
            </StyledFormGroup>

            <StyledFormGroup controlId="formImage">
              <Form.Label>IMAGEN</Form.Label>
              <Form.Control
                {...register("imagen")}
                type="file"
                // onChange={(e) => setImagen(e.target.files[0])}
              />
           <StyledCol>
            <StyledBoton type="submit">Registrar usuario</StyledBoton>
           </StyledCol>
              
            </StyledFormGroup>
          </StyledCol>
        </StyledRow>
      </Form>
    </StyledContainer>
  );
};

export default RegistrarUsuario;
