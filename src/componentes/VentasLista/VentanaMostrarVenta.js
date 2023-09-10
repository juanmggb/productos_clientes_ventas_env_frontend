import { Modal } from "react-bootstrap";
import {
  StyledButton,
  StyledModalBody,
  StyledModalFooter,
  StyledModalHeader,
  TablaEstilo,
} from "./styles/VentanaMostrarVenta.styles";

import { obtenerFecha, obtenerHora } from "./TablaVentas";

const VentanaMostrarVenta = ({ venta, mostrarVenta, manejarCerrarVentana }) => {
  const { productos, total, observacion, descuento, status } = venta;

  return (
    venta &&
    venta.productos && (
      <Modal centered show={mostrarVenta} onHide={manejarCerrarVentana}>
        <StyledModalHeader>
          <h4>Detalle de la Venta #{venta.id}</h4>
        </StyledModalHeader>

        <StyledModalBody>
          <h5>DATOS GENERALES:</h5>
          <h5>Cliente:</h5> <p>{venta.cliente}</p>
          <h5>Fecha de Venta:</h5>
           <p>{obtenerFecha(venta.fecha)} --<span> {obtenerHora(venta.fecha)}</span></p>
          <h5>Vendedor:</h5> <p>{venta.vendedor}</p>
          <h5>Tipo de Venta:</h5> <p>{venta.tipo}</p>
          <h5>Tipo de Pago:</h5> <p>{venta.pago}</p>
          {console.log(venta)}
          <h5>Tabla de Productos:</h5>
          <TablaEstilo>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio al cliente</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto, index) => (
                <tr key={index}>
                  <td>{producto.NOMBRE_PRODUCTO}</td>
                  <td>{producto.CANTIDAD_VENTA}</td>
                  <td>
                    $
                    {(producto.PRECIO_VENTA / producto.CANTIDAD_VENTA).toFixed(
                      2
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </TablaEstilo>
          <h5>Porcentaje de descuento:</h5> <p>{descuento}%</p>
          <h5>Monto total:</h5>
          <p>${total.toFixed(2)}</p>
          <h5>Status:</h5>
          <p>{status}</p>
          <h5>Observaciones:</h5>
          <p>{observacion}</p>
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

export default VentanaMostrarVenta;
