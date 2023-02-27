import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pedirVentasLista } from "../actions/ventaActions";
import Loader from "../componentes/Loader";
import Mensaje from "../componentes/Mensaje";
import VentanaMostrarVenta from "../componentes/VentanaMostrarVenta";
import { RESET_VENTA_DETALLES } from "../constantes/ventaConstantes";

// Algo importante aqui que no esta presente en las otras paginas de lista es la opcion de dar click en el renglon para obtener informacion adicional sobre la venta
// Al parecer no sera necesario ya, o si
// No, yo digo que en detalles ventas ver una ventana emergente

const VentasLista = () => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();
  // Funcion para nevagar en la aplicacion
  const navigate = useNavigate();
  // Obtener el estado desde el Redux store
  const ventaLista = useSelector((state) => state.ventaLista);
  const { loading, ventas, error } = ventaLista;

  const [mostrarVenta, setMostrarVenta] = useState(false);
  const [venta, setVenta] = useState({});

  useEffect(() => {
    // Si no hay ventas, disparar la accion de pedir productos
    if (!ventas) {
      dispatch(pedirVentasLista());
    }
  }, [dispatch, ventas]);

  const manejarVentaDetalles = (id) => {
    // Redireccionar a la pagina de la venta
    dispatch({ type: RESET_VENTA_DETALLES });
    navigate(`/ventas/${id}`);
  };

  const manejarCerrarVentana = () => {
    setMostrarVenta(false);
  };

  const manejarMostrarDetallesVenta = (ventaId) => {
    const ventaSeleccionada = ventas.find((v) => v.id === ventaId);
    setVenta(ventaSeleccionada);
    setMostrarVenta(true);
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Mensaje variant="danger">{error}</Mensaje>
  ) : (
    ventas && (
      <div style={{ padding: "25px" }}>
        {/* Esta el la parte que cambia en las paginas */}
        <h1>Ventas</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>CLIENTE</th>
              <th>VENDEDOR</th>
              <th>MONTO</th>
              <th>TIPO DE PAGO</th>
              <th>STATUS</th>
              <th>EDITAR</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((v) => (
              <tr key={v.id} onClick={() => manejarMostrarDetallesVenta(v.id)}>
                <td>{v.id}</td>
                <td>{v.CLIENTE ? v.cliente_nombre : "No disponible"}</td>
                <td>{v.VENDEDOR}</td>
                <td>{v.MONTO}</td>
                <td>{v.TIPO_PAGO}</td>
                <td>{v.STATUS}</td>
                <td>
                  <Button onClick={() => manejarVentaDetalles(v.id)}>
                    <i className="fa-solid fa-circle-info"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Mostrar venta */}
        {mostrarVenta && (
          <VentanaMostrarVenta
            venta={venta}
            mostrarVenta={mostrarVenta}
            manejarCerrarVentana={manejarCerrarVentana}
          />
        )}
      </div>
    )
  );
};

export default VentasLista;
