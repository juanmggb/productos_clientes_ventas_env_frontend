import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actualizarCuenta } from "../actions/cuentaActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { logout } from "../actions/sesionActions";

import { RESET_CUENTA_UPDATE } from "../constantes/cuentaConstantes";
import { useForm } from "react-hook-form";
import {
  StyledButton,
  StyledButtonContainer,
  StyledCol,
  StyledContainer,
  StyledFormGroup,
  StyledImageUser,
  StyledRow,
} from "./styles/CuentaDetalles.styles";
import { BASE_URL } from "../constantes/constantes";

function CuentaDetalles() {
  // Function para disparar las acciones
  const dispatch = useDispatch();

  // Funcion para navegar en la app
  const navigate = useNavigate();

  // useForm para validar formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: JSON.parse(localStorage.getItem("username")),
      nombre: JSON.parse(localStorage.getItem("name")),
    },
  });

  // Obtener actualizar cuenta desde el Redux
  const cuentaActualizar = useSelector((state) => state.cuentaActualizar);
  const {
    loading: loadingActualizar,
    success: successActualizar,
    error: errorActualizar,
  } = cuentaActualizar;

  // useEffect para mostrar las alertas de actualizacion
  useEffect(() => {
    if (loadingActualizar) {
      toast.loading("Actualizando cuenta");
    }

    if (successActualizar) {
      toast.remove();
      toast.success("Cuenta actualizada");
    }

    if (errorActualizar) {
      toast.dismiss();
      toast.error("Error al actualizar cuenta");
    }
  }, [successActualizar, errorActualizar, loadingActualizar]);

  // useEffect para mostrar las alertas de validacion del formulario
  useEffect(() => {
    if (errors.nombre) {
      toast.dismiss();
      toast.error(errors.nombre.message);
    }

    if (errors.username) {
      toast.dismiss();
      toast.error(errors.username.message);
    }
  }, [errors.nombre, errors.username]);

  const [imagenCuenta, setImagenCuenta] = useState("");

  // useEffect para obtener imagen de la cuenta al cargar el componente por primera vez
  useEffect(() => {
    // Obtener imagen del usuario desde el loccalStorage
    setImagenCuenta(JSON.parse(localStorage.getItem("imagen")));
  }, []);

  // useEffect para redireccionar usuario si la cuenta ha sido actualizada
  useEffect(() => {
    if (successActualizar) {
      dispatch({ type: RESET_CUENTA_UPDATE });
      dispatch(logout());
    }
  }, [dispatch, navigate, successActualizar]);

  const manejarActualizarCuenta = (data) => {
    if (data.password1 !== data.password2) {
      toast.dismiss();
      toast.error("Las contraseñas deben ser iguales");
    } else {
      const formData = new FormData();

      formData.append("username", data.username);
      formData.append("name", data.nombre);
      if (data.imagen[0]) {
        formData.append("IMAGEN", data.imagen[0]);
      }

      if (data.password1) {
        formData.append("password", data.password1);
      }
      // Disparar la accion para actualizar cuenta
      dispatch(actualizarCuenta(formData));
    }
  };

  return (
    <StyledContainer fluid>
      <StyledRow>
        <StyledCol md={6}>
          <StyledImageUser
            src={`${BASE_URL}${imagenCuenta}`}
            alt="Imagen de cuenta"
          />
        </StyledCol>

        <StyledCol md={6}>
          <Form onSubmit={handleSubmit(manejarActualizarCuenta)}>
            <StyledFormGroup controlId="username">
              <Form.Label>NOMBRE DE USUARIO</Form.Label>
              <Form.Control
                {...register("username", {
                  required: "Por favor, introduce el nombre de usuario",
                })}
                type="text"
                autoComplete="off"
              ></Form.Control>
            </StyledFormGroup>

            <StyledFormGroup controlId="nombre">
              <Form.Label>NOMBRE</Form.Label>
              <Form.Control
                {...register("nombre", {
                  required: "Por favor, introduce el nombre",
                })}
                type="text"
                autoComplete="off"
              ></Form.Control>
            </StyledFormGroup>

            <StyledFormGroup controlId="password1">
              <Form.Label>CONTRASEÑA (OPCIONAL)</Form.Label>
              <Form.Control
                {...register("password1")}
                type="password"
              ></Form.Control>
            </StyledFormGroup>

            <StyledFormGroup controlId="password2">
              <Form.Label>CONFIRMAR CONTRASEÑA (OPCIONAL)</Form.Label>
              <Form.Control
                {...register("password2")}
                type="password"
              ></Form.Control>
            </StyledFormGroup>

            <StyledFormGroup controlId="formImage">
              <Form.Label>IMAGEN (OPCIONAL)</Form.Label>
              <Form.Control {...register("imagen")} type="file" />
            </StyledFormGroup>

            <StyledButtonContainer>
              <StyledButton type="submit">Actualizar Cuenta</StyledButton>
            </StyledButtonContainer>
          </Form>
        </StyledCol>
      </StyledRow>
    </StyledContainer>
  );
}

export default CuentaDetalles;
