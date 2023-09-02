import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  actualizarCliente,
  obtenerClienteDetalles,
} from "../actions/clienteActions";
import Loader from "../componentes/general/Loader";
import {
  RESET_CLIENTE_ACTUALIZAR,
  RESET_CLIENTE_DETALLES,
} from "../constantes/clienteConstantes";
import Mensaje from "../componentes/general/Mensaje";
import { useForm } from "react-hook-form";
import VentanaFormularioPrecios from "../componentes/RegistrarCliente/VentanaFormularioPrecios";
import {
  StyledBoton,
  StyledCol,
  StyledContainer,
  StyledFormGroup,
  StyledRow,
} from "./styles/ClienteDetalles.styles";
import {
  cambiarCampoNombrePrecios,
  crearNuevosPreciosCliente,
  usePrecios,
} from "./utilis/ClienteDetalles.utilis";

const ClienteDetalles = ({ match }) => {
  // Obtener el id del cliente
  const params = useParams(match);
  const clienteId = params.id;

  // Funcion para disparar las acciones
  const dispatch = useDispatch();

  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Obtener el estado desde el Redux store
  const clienteDetalles = useSelector((state) => state.clienteDetalles);
  const { loading, cliente, error } = clienteDetalles;

  // Obtener el estado desde el Redux store
  const clienteActualizar = useSelector((state) => state.clienteActualizar);
  const {
    loading: loadingActualizar,
    success: successActualizar,
    error: errorActualizar,
  } = clienteActualizar;

  const { preciosCliente, setPreciosCliente, manejarCambioPrecio } =
    usePrecios();

  const [mostrarPrecios, setMostrarPrecios] = useState(false);

  // useForm para validar datos del formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // useEffect para mostrar las alertas de validacion del formulario
  useEffect(() => {
    if (errors.ciudad) {
      toast.dismiss();
      toast.error(errors.ciudad.message);
    }

    if (errors.numero) {
      toast.dismiss();
      toast.error(errors.numero.message);
    }

    if (errors.calle) {
      toast.dismiss();
      toast.error(errors.calle.message);
    }

    if (errors.telefono) {
      toast.dismiss();
      toast.error(errors.telefono.message);
    }

    if (errors.nombre) {
      toast.dismiss();
      toast.error(errors.nombre.message);
    }
  }, [
    errors.nombre,
    errors.telefono,
    errors.calle,
    errors.numero,
    errors.ciudad,
  ]);

  // useEffect para mostrar las alertas de actualizacion del cliente
  useEffect(() => {
    if (loadingActualizar) {
      toast.loading("Actualizando cliente");
    }

    if (successActualizar) {
      toast.remove();
      toast.success("Cliente actualizado");
      // Reset cliente actualizar para que no se ejecute este bloque de codigo cada vez que se ingrese a cliente detalles
      dispatch({ type: RESET_CLIENTE_ACTUALIZAR });
      navigate("/clientes");
    }

    if (errorActualizar) {
      toast.dismiss();
      toast.error("Error al actualizar cliente");
    }
  }, [
    successActualizar,
    errorActualizar,
    loadingActualizar,
    dispatch,
    navigate,
  ]);

  useEffect(() => {
    // Si no hay cliente o el cliente no es el que seleccione, disparar la accion de obtener cliente
    if (!cliente || cliente.id !== Number(clienteId)) {
      dispatch(obtenerClienteDetalles(clienteId));
    } else {
      //  reset es una función proporcionada por el useForm que puede utilizarse para establecer nuevos valores por defecto en el formulario en cualquier momento.
      reset({
        nombre: cliente.NOMBRE,
        contacto: cliente.CONTACTO,
        telefono: cliente.TELEFONO,
        correo: cliente.CORREO,
        tipoPago: cliente.TIPO_PAGO,
        calle: cliente.DIRECCION.CALLE,
        numero: cliente.DIRECCION.NUMERO,
        colonia: cliente.DIRECCION.COLONIA,
        ciudad: cliente.DIRECCION.CIUDAD,
        municipio: cliente.DIRECCION.MUNICIPIO,
        codigoPostal: cliente.DIRECCION.CP,
        observaciones: cliente.OBSERVACIONES,
      });
      setPreciosCliente(cambiarCampoNombrePrecios(cliente.precios_cliente));
    }
  }, [dispatch, cliente, clienteId, navigate, reset, setPreciosCliente]);

  const manejarActualizarCliente = (data) => {
    // Disparar la accion de actualizar cliente

    // Esta funcion permite crear un array de precios con el formato que recibe el backend
    const nuevosPreciosCliente = crearNuevosPreciosCliente(preciosCliente);

    dispatch(
      actualizarCliente({
        // El id es para el endpoint, no como informacion de actualizacion
        id: clienteId,
        NOMBRE: data.nombre,
        CONTACTO: data.contacto,
        TELEFONO: data.telefono,
        CORREO: data.correo,
        TIPO_PAGO: data.tipoPago,
        nuevaDireccion: {
          direccionClienteId: cliente.DIRECCION.id,
          CALLE: data.calle,
          NUMERO: data.numero,
          COLONIA: data.colonia,
          CIUDAD: data.ciudad,
          MUNICIPIO: data.municipio,
          CP: data.codigoPostal,
        },
        nuevosPreciosCliente: nuevosPreciosCliente,
        OBSERVACIONES: data.observaciones,
      })
    );
  };

  const manejarRegresar = () => {
    // Redireccionar a la pagina de clientes
    dispatch({ type: RESET_CLIENTE_DETALLES });
    navigate("/clientes");
  };

  // Renderizar loading si se esta cargando la informacion del cliente
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

  // Renderizar mensaje de error si el servidor regresa un error al pedir la informacion del cliente
  if (error)
    return (
      <StyledContainer fluid>
        <StyledRow style={{ height: "80%" }}>
          <StyledCol>
            <Mensaje variant="danger">
              Hubo un error al cargar la lista de clientes
            </Mensaje>
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    );

  return (
    cliente && (
      <>
        <StyledContainer fluid>
          <StyledRow>
            <StyledCol>
              <h1>Cliente #{cliente.id}</h1>
              <StyledBoton onClick={manejarRegresar}>Regresar</StyledBoton>
            </StyledCol>
          </StyledRow>

          <Form onSubmit={handleSubmit(manejarActualizarCliente)}>
            <StyledRow>
              <StyledCol md={4} style={{ marginBottom: "100px" }}>
                <StyledFormGroup controlId="nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    {...register("nombre", {
                      required: "Por favor, introduce el nombre del cliente",
                    })}
                    type="text"
                    autoComplete="off"
                  ></Form.Control>
                </StyledFormGroup>

                {/* Contacto */}
                <StyledFormGroup controlId="contacto">
                  <Form.Label>Nombre Contacto (Opcional)</Form.Label>
                  <Form.Control
                    {...register("contacto")}
                    type="text"
                    autoComplete="off"
                  ></Form.Control>
                </StyledFormGroup>

                {/* Telefono */}
                <StyledFormGroup controlId="telefono">
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control
                    {...register("telefono", {
                      required: "Por favor, introduce el teléfono del cliente",
                    })}
                    type="text"
                    autoComplete="off"
                  ></Form.Control>
                </StyledFormGroup>

                {/* Correo */}
                <StyledFormGroup controlId="correo">
                  <Form.Label>Correo (Opcional)</Form.Label>
                  <Form.Control
                    {...register("correo")}
                    type="email"
                    autoComplete="off"
                  ></Form.Control>
                </StyledFormGroup>
              </StyledCol>

              <StyledCol md={4}>
                {/* Tipo de pago */}
                <StyledFormGroup controlId="tipoPago">
                  <Form.Label>Tipo de pago</Form.Label>
                  <Form.Control {...register("tipoPago")} as="select">
                    <option value="EFECTIVO">EFECTIVO</option>
                    <option value="CREDITO">CREDITO</option>
                  </Form.Control>
                </StyledFormGroup>
                {/* Calle */}
                <StyledFormGroup controlId="calle">
                  <Form.Label>Calle</Form.Label>
                  <Form.Control
                    {...register("calle", {
                      required: "Por favor, introduce la calle del cliente",
                    })}
                    type="text"
                    autoComplete="off"
                  ></Form.Control>
                </StyledFormGroup>

                {/* Numero */}
                <StyledFormGroup controlId="numero">
                  <Form.Label>Número</Form.Label>
                  <Form.Control
                    {...register("numero", {
                      required: "Por favor, introduce el número en la calle",
                    })}
                    type="text"
                    step="any"
                  ></Form.Control>
                </StyledFormGroup>

                {/* Colonia */}
                <StyledFormGroup controlId="colonia">
                  <Form.Label>Colonia (Opcional)</Form.Label>
                  <Form.Control
                    {...register("colonia")}
                    type="text"
                    autoComplete="off"
                  ></Form.Control>
                </StyledFormGroup>

                <StyledBoton
                  onClick={() => setMostrarPrecios(true)}
                  type="button"
                >
                  Modificar precios
                </StyledBoton>
              </StyledCol>

              <StyledCol md={4}>
                {/* Ciudad */}
                <StyledFormGroup controlId="ciudad">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Control
                    {...register("ciudad", {
                      required: "Por favor, introduce la ciudad",
                    })}
                    type="text"
                    autoComplete="off"
                  ></Form.Control>
                </StyledFormGroup>

                {/* Municipio */}
                <StyledFormGroup controlId="municipio">
                  <Form.Label>Municipio (Opcional)</Form.Label>
                  <Form.Control
                    {...register("municipio")}
                    type="text"
                    autoComplete="off"
                  ></Form.Control>
                </StyledFormGroup>

                {/* Codigo postal */}
                <StyledFormGroup controlId="codigoPostal">
                  <Form.Label>C.P (Opcional)</Form.Label>
                  <Form.Control
                    {...register("codigoPostal")}
                    type="number"
                    autoComplete="off"
                  ></Form.Control>
                </StyledFormGroup>

                {/* Observaciones */}
                <StyledFormGroup controlId="observaciones">
                  <Form.Label>Observaciones (Opcional)</Form.Label>
                  <Form.Control
                    {...register("observaciones")}
                    type="text"
                    autoComplete="off"
                  ></Form.Control>
                </StyledFormGroup>

                <StyledBoton type="submit">Actualizar cliente</StyledBoton>
              </StyledCol>
            </StyledRow>
          </Form>
        </StyledContainer>

        {/* Formulario de precios del cliente */}
        <VentanaFormularioPrecios
          productos={preciosCliente}
          mostrarPrecios={mostrarPrecios}
          manejarCerrarVentana={() => setMostrarPrecios(false)}
          manejarCambioPrecio={manejarCambioPrecio}
        />
      </>
    )
  );
};

export default ClienteDetalles;
