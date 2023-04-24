import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';
import { actualizarVenta, obtenerVentaDetalles } from "../actions/ventaActions";
import VentanaMostrarVentaActualizar from "../componentes/VentanaMostrarVentaActualizar";
import {
  RESET_VENTA_ACTUALIZAR,
  RESET_VENTA_DETALLES,
} from "../constantes/ventaConstantes";

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

  width: 100vw;
  height: 90vh;
  padding: 30px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  & h1 {
    color: white;
  }

  // Estilos para smarthphone
  @media (max-width: 480px) and (orientation: portrait) {
  align-items: center;
  gap: 30px;

  & h1 {
    font-weight: bold;
  }
  }
`;

// Estilos de los botones
const ButtonStyled = styled(Button)`
  height: 70px;
  width: 180px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgb(217, 227, 241);
  box-shadow: 4px 3px 10px 3px rgba(81, 141, 197, 0.6);

  &:hover:enabled {
    background-color: white;
    color: black;
    box-shadow: 4px 3px 10px 3px rgba(81, 141, 197, 0.6);
  }

  // Estilos para smarthphone
  @media (max-width: 480px) and (orientation: portrait) {
    height: 50px;
    width: 120px
  }
`;

// Estilos del formulario
const FormStyled = styled(Form)`
  height: 200px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  // Estilos para smarthphone
  @media (max-width: 480px) and (orientation: portrait) {
    height: 150px;

    & button{
      height: 50px;
      width: 50vw;
    }
  }

`;

// Estilos del select del formulario
const FormSelectStyled = styled(Form.Select)`
  width: 50vw;

  color: black;
  font-weight: bold;

  box-shadow: none;

  // Estilos para smarthphone
  @media (max-width: 480px) and (orientation: portrait) {
    width: 70vw;
  }
`;

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

  // Toast components
  // Modificar toast en caso de que sea exitosa la actualizacion
  const actualizacionExitosa = () => {
    toast.remove();
    toast.success('Actualizacion exitosa', {
        id: 'toastActualizando'
      });
  }

  useEffect(() => {
    // Si la actualizacion fue correcta, reset productoActualizar y redireccionar a la pagina de productos
    if (reporteActualizar) {
      setMostrarReporte(true);
      actualizacionExitosa();
    }
    
    // Si no hay venta o la venta no es la que seleccione, disparar la accion de
    // obtener venta
    if (!venta || venta.id !== Number(ventaId)) {
      dispatch(obtenerVentaDetalles(ventaId));
    } else if (venta.STATUS === "CANCELADO" || venta.STATUS === "REALIZADO") {
      alert("No es posible modificar el STATUS de la venta");
      navigate("/ventas");
    } else {
      setStatus(venta.STATUS);
    }
  }, [dispatch, venta, ventaId, reporteActualizar, navigate]);

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
    dispatch({ type: RESET_VENTA_ACTUALIZAR });
    navigate("/ventas");
  };

  const manejarRegresar = () => {
    // Redireccionar a la pagina de ventas
    dispatch({ type: RESET_VENTA_DETALLES });
    navigate("/ventas");
  };

  return loading ? (
    <Principal>
    </Principal>
  ) : error ? (
        <Principal>
          {toast.error('Error en el servidor')}
        </Principal>
  ) : (
        venta && (
        <Principal>
            {loadingActualizar && (
              toast.loading('Actualizando venta', {id: 'toastActualizando'})
            )}
            {errorActualizar && (
              toast.error('Error al actualizar venta', {id: 'toastActualizando'})
            )}
        {/* Esta es la parte que cambia en las paginas */}
          <h1>Venta #{venta.id}</h1>
          <ButtonStyled variant="primary" onClick={manejarRegresar}>
            Regresar
          </ButtonStyled>
          <FormStyled onSubmit={manejarActualizarVenta}>
            <Form.Group controlId="status">
                  <Form.Label style={{color: "white"}}>STATUS</Form.Label>
              <FormSelectStyled
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="PENDIENTE">Pendiente</option>
                <option value="REALIZADO">Realizado</option>
                <option value="CANCELADO">Cancelado</option>
              </FormSelectStyled>
            </Form.Group>

            <ButtonStyled type="submit">Actualizar venta</ButtonStyled>
          </FormStyled>

            {/* Mostrar venta */}
            {mostrarReporte && (
              <VentanaMostrarVentaActualizar
                reporteActualizar={reporteActualizar}
                mostrarReporte={mostrarReporte}
                manejarCerrarVentana={manejarCerrarVentana}
              />
            )}
       </Principal>
    )
  );
};

export default VentaDetalles;
