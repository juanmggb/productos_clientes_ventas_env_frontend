import React, { Fragment } from "react";
import { Table } from "react-bootstrap";
import { toast } from 'react-hot-toast';
import { ModalBodyStyled, ModalFooterStyled, ModalHeaderStyled, ModalStyled } from "../styledComponents/ModalStyled";

const VentanaMostrarVentaActualizar = ({
  reporteActualizar,
  mostrarReporte,
  manejarCerrarVentana,
}) => {

  // Remover la notificacion de actualizando venta
  return (
    reporteActualizar && (
      <ModalStyled centered show={mostrarReporte} onHide={manejarCerrarVentana}>
        <ModalHeaderStyled closeButton>
          <h4>Detalles de actualización</h4>
        </ModalHeaderStyled>
        <ModalBodyStyled>
          <Table>
            <thead>
              <tr>
                <th></th>
                <th>ANTES</th>
                <th>DESPUES</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(reporteActualizar).map((llave, indice) => (
                <tr key={indice}>
                  <td style={{fontWeight: 'bold'}}>{llave}</td>
                  <td>{reporteActualizar[llave]["ANTES"]}</td>
                  <td>{reporteActualizar[llave]["DESPUES"]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ModalBodyStyled>
        <ModalFooterStyled>
        </ModalFooterStyled>
      </ModalStyled>
    )
  );
};

export default VentanaMostrarVentaActualizar;
