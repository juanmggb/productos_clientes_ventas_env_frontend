import React, { Fragment } from "react";
import { Modal, Table } from "react-bootstrap";

const VentanaMostrarVentaActualizar = ({
  reporteActualizar,
  mostrarReporte,
  manejarCerrarVentana,
}) => {
  return (
    reporteActualizar && (
      <Modal show={mostrarReporte} onHide={manejarCerrarVentana}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de actualización</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                  <td>{llave}</td>
                  <td>{reporteActualizar[llave]["ANTES"]}</td>
                  <td>{reporteActualizar[llave]["DESPUES"]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    )
  );
};

export default VentanaMostrarVentaActualizar;
