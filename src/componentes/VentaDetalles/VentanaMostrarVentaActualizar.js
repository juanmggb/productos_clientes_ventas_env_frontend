import React from "react";
import { Modal, Table } from "react-bootstrap";
import {
  StyledModalBody,
  StyledModalHeader,
} from "./styles/VentanaMostrarVentaActualizar.styles";

const VentanaMostrarVentaActualizar = ({
  reporteActualizar,
  mostrarReporte,
  manejarCerrarVentana,
}) => {
  // Remover la notificacion de actualizando venta
  return (
    reporteActualizar && (
      <Modal centered show={mostrarReporte} onHide={manejarCerrarVentana}>
        <StyledModalHeader closeButton>
          <h4>Detalles de actualización</h4>
        </StyledModalHeader>
        <StyledModalBody>
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
                  <td style={{ fontWeight: "bold" }}>{llave}</td>
                  <td>{reporteActualizar[llave]["ANTES"]}</td>
                  <td>{reporteActualizar[llave]["DESPUES"]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </StyledModalBody>
      </Modal>
    )
  );
};

export default VentanaMostrarVentaActualizar;
