import { Modal } from "react-bootstrap";
import {
  StyledButton,
  StyledModalBody,
  StyledModalFooter,
  StyledModalHeader,
  TablaEstilo,
} from "./styles/VentanaMostrarResumenVentas.styles";

import {
  obtenerTotal,
  obtenerVentasPorTipo,
  obtenerVentasPorTipoVentaYPago,
} from "./utilis/VentanaMostrarResumenVentas.utilis";

const VentanaMostrarResumenVentas = ({
  mostrarResumen,
  manejarCerrarVentana,
  ventas,
}) => {
  // Obtener ventas clasificadas por tipo de venta y tipo de pago
  const TotalVentasPorTipoVentayPago = obtenerVentasPorTipoVentaYPago(ventas);

  const TotalVentasPorTipo = obtenerVentasPorTipo(ventas);

  return (
    ventas && (
      <Modal centered show={mostrarResumen} onHide={manejarCerrarVentana}>
        <StyledModalHeader>
          <h4>Resumen de las ventas</h4>
        </StyledModalHeader>

        <StyledModalBody>
          <TablaEstilo>
            <thead>
              <tr>
                <th>Tipo de venta</th>
                <th>Número de ventas</th>
                <th>Monto Total</th>
              </tr>
            </thead>
            <tbody>
              {TotalVentasPorTipoVentayPago.map((venta, index) => (
                <tr key={index}>
                  <td>{venta.tipo}</td>
                  <td>{venta.numeroVentas}</td>
                  <td>
                    {"$"}
                    {venta["MONTO TOTAL"]}
                  </td>
                </tr>
              ))}
            </tbody>
          </TablaEstilo>

          <TablaEstilo>
            <thead>
              <tr>
                <th>Tipo de venta</th>
                <th>Número de ventas</th>
                <th>Monto Total</th>
              </tr>
            </thead>
            <tbody>
              {TotalVentasPorTipo.map((venta, index) => (
                <tr key={index}>
                  <td>{venta.tipo}</td>
                  <td>{venta.numeroVentas}</td>
                  <td>
                    {"$"}
                    {venta["MONTO TOTAL"]}
                  </td>
                </tr>
              ))}
            </tbody>
          </TablaEstilo>

          <h5>Total:</h5>

          <p>${obtenerTotal(TotalVentasPorTipoVentayPago)}</p>
        </StyledModalBody>

        <StyledModalFooter>
          <StyledButton
            variant="secondary"
            onClick={() => {
              manejarCerrarVentana();
            }}
          >
            Cerrar
          </StyledButton>
        </StyledModalFooter>
      </Modal>
    )
  );
};

export default VentanaMostrarResumenVentas;
