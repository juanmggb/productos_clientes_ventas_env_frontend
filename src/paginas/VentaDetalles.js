import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { actualizarVenta, obtenerVentaDetalles } from "../actions/ventaActions";

import {
  RESET_VENTA_ACTUALIZAR,
  RESET_VENTA_DETALLES,
} from "../constantes/ventaConstantes";
import Mensaje from "../componentes/general/Mensaje";
import Loader from "../componentes/general/Loader";
import VentanaMostrarVentaActualizar from "../componentes/VentaDetalles/VentanaMostrarVentaActualizar";
import { toast } from "react-hot-toast";
import {
  StyledBoton,
  StyledCol,
  StyledContainer,
  StyledFormGroup,
  StyledRow,
} from "./styles/VentaDetalles.styles";
import { Form } from "react-bootstrap";

const VentaDetalles = ({ match }) => {
  // Obtener el id de la venta
  const params = useParams(match);
  const ventaId = params.id;

  // Funcion para disparar las acciones
  const dispatch = useDispatch();

  // Funcion para navegar en la pagina
  const navigate = useNavigate();

  // Obtener el estado desde el Redux store
  const ventaDetalles = useSelector((state) => state.ventaDetalles);
  const { loading, venta, error } = ventaDetalles;

  // Obtener el estado desde el Redux store
  const ventaActualizar = useSelector((state) => state.ventaActualizar);
  const {
    loading: loadingActualizar,
    reporte: reporteActualizar,
    error: errorActualizar,
  } = ventaActualizar;

  const [status, setStatus] = useState("");

  const [mostrarReporte, setMostrarReporte] = useState(false);

  // useEffect para cargar datos de venta
  useEffect(() => {
    // Si no hay venta o la venta no es la que seleccione, disparar la accion de
    // obtener venta
    if (!venta || venta.id !== Number(ventaId)) {
      dispatch(obtenerVentaDetalles(ventaId));
    } else {
      setStatus(venta.STATUS);
    }
  }, [venta, dispatch, ventaId]);

  // useEffect para mostrar reporte de actualizacion
  useEffect(() => {
    if (loadingActualizar) {
      toast.remove();
      toast.loading("Actualizando venta");
    }

    if (errorActualizar) {
      toast.dismiss();
      toast.error("Error al actualizar venta");
    }
    // Si la actualizacion fue correcta, reset productoActualizar y redireccionar a la pagina de productos
    if (reporteActualizar) {
      toast.remove();
      setMostrarReporte(true);
    }
  }, [reporteActualizar, errorActualizar, loadingActualizar]);

  const manejarActualizarVenta = (e) => {
    e.preventDefault();
    // Disparar la accion de actualizar producto
    dispatch(
      actualizarVenta({
        // El id es para el endpoint, no como informacion de actualizacion
        id: ventaId,
        STATUS: status,
      })
    );
  };

  const manejarCerrarVentana = () => {
    setMostrarReporte(false);
    // Reset venta actualizar para no mostrar VentanaMostrarVentaActualizar cada vez que se entra a venta detalles
    dispatch({ type: RESET_VENTA_ACTUALIZAR });
    navigate("/ventas");
  };

  const manejarRegresar = () => {
    // Redireccionar a la pagina de ventas
    dispatch({ type: RESET_VENTA_DETALLES });
    navigate("/ventas");
  };

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

  if (error)
    return (
      <StyledContainer fluid>
        <StyledRow>
          <StyledCol>
            <Mensaje variant="danger">
              Hubo un problema al cargar la informacion de la venta
            </Mensaje>
          </StyledCol>
        </StyledRow>
      </StyledContainer>
    );

  return (
    venta && (
      <>
        <StyledContainer fluid>
          <StyledRow>
            <StyledCol md={6}>
              <h1>Venta #{venta.id}</h1>
              <StyledBoton variant="primary" onClick={manejarRegresar}>
                Regresar
              </StyledBoton>
            </StyledCol>
          </StyledRow>
          <Form onSubmit={manejarActualizarVenta}>
            <StyledRow>
              <StyledCol>
                <StyledFormGroup controlId="status">
                  <Form.Label style={{ color: "white" }}>STATUS</Form.Label>
                  <Form.Control
                    as="select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="PENDIENTE">Pendiente</option>
                    <option value="REALIZADO">Realizado</option>
                    <option value="CANCELADO">Cancelado</option>
                  </Form.Control>
                </StyledFormGroup>
                <StyledBoton type="submit">Actualizar venta</StyledBoton>
              </StyledCol>
            </StyledRow>
          </Form>
        </StyledContainer>

        {mostrarReporte && (
          <VentanaMostrarVentaActualizar
            reporteActualizar={reporteActualizar}
            mostrarReporte={mostrarReporte}
            manejarCerrarVentana={manejarCerrarVentana}
          />
        )}
      </>
    )
  );
};

export default VentaDetalles;
