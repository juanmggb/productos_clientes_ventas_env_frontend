import React, { useRef } from "react";
import styled from "styled-components";
import ReactToPrint from "react-to-print";
import TicketVenta from "./TicketVenta";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RESET_VENTA_REGISTRAR } from "../../constantes/ventaConstantes";

/*======================================== Estilos CSS de la ventana emergente ========================================*/
const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContenedorVentana = styled.div`
  position: relative;
  width: 350px;
  height: 300px;
  background-color: #ffffff;
  color: #000000;
  border-radius: 10px;
  box-shadow: 0px 7px 30px 0px rgba(0, 0, 0, 0.5);
  padding: 20px 20px 20px 20px;
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Texto = styled.div`
  font-weight: 500;
  font-size: 1.4rem;
  margin-bottom: 50px;
`;

const BotonImprimir = styled.input`
  width: 150px;
  height: 40px;
  text-align: center;
  background-color: green;
  border: none;
  color: white;
  font-weight: bold;
  align-self: center;
  justify-self: center;
  border-radius: 10px;
  &:hover:enabled {
    background-color: #00a900;
  }
  &:disabled {
    background-color: #012b00;
  }
`;

/* ===================================== Funcion JSX de la ventana emergente ===============================*/
const ImprimirTicket = ({
  datosVenta,
  DESCUENTO,
  imprimirTicket,
  setImprimirTicket,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const manejarFinalizarVenta = () => {
    dispatch({ type: RESET_VENTA_REGISTRAR });
    navigate("/ventas");
  };

  const componentRef = useRef();

  return (
    <>
      {imprimirTicket && (
        <Overlay>
          <ContenedorVentana>
            <Texto>Venta Realizada!</Texto>
            <ReactToPrint
              trigger={() => (
                <BotonImprimir value="Imprimir ticket" type="submit" />
              )}
              content={() => componentRef.current}
              onAfterPrint={() => {
                setImprimirTicket(false);
                manejarFinalizarVenta();
              }}
            />
            <div style={{ display: "none" }}>
              <TicketVenta
                ref={componentRef}
                datosVenta={datosVenta}
                DESCUENTO={DESCUENTO}
              />
            </div>
          </ContenedorVentana>
        </Overlay>
      )}
    </>
  );
};

export default ImprimirTicket;
