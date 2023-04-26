// Importar modulos
import styled from "styled-components";
import { Button } from "react-bootstrap";

// Estilos del componente ///////////////////////////////////

// Estilos para el componente completo
const VentaRenglonEstilo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0px;
  border-bottom: 2px solid black;
  user-select: none;
  transition: none;

  &:hover {
    align-self: center;
    border-bottom: 3px solid #2e78d2;
    cursor: pointer;

    span {
      font-weight: bold;
    }
  }

  > div {
    width: 100%;
    text-align: center;
  }

  span {
    font-weight: bold;
    font-size: 15px;
    transition: none;
  }
`;

const Modificar = styled(Button)`
  background-color: rgb(255, 255, 255);
  height: 50px;
  width: 50px;
  padding: 0;
  font-size: 50px;
  display: flex;
  align-items: flex-start;
  color: rgba(0, 0, 150, 0.8);

  &:hover {
    background-color: rgb(255, 255, 255);
    color: rgba(0, 0, 220, 0.8);
  }
`;

// Componente ////////////////////////////////////////////////////
const VentaRenglon = ({
  venta,
  mostrarDetallesVenta,
  manejarVentaDetalles,
}) => {
  // ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE

  // Funcion para mostrar los detalles de la venta seleccionada
  const llamarMostrarDetallesVenta = (venta) => {
    // Obtener valores de venta para informacion detallada
    const {
      productos_venta: productos,
      MONTO: total,
      OBSERVACIONES: observacion,
    } = venta;

    // Llamar a la funcion para mostrar los detalles de la venta
    mostrarDetallesVenta({ productos, total, observacion });
  };

  const fechaAUX = venta.FECHA.toString().split("T");
  const fechaAMD = fechaAUX[0].split("-");
  const fecha = fechaAMD[2] + "-" + fechaAMD[1] + "-" + fechaAMD[0];
  const horaAUX = fechaAUX[1].split(".");
  const hora = horaAUX[0];

  // Get admin permision
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  console.log(isAdmin);

  // Parte 2. HTML que se renderiza
  return (
    <VentaRenglonEstilo onClick={() => llamarMostrarDetallesVenta(venta)}>
      <div>
        <span>{venta.id}</span>
      </div>
      <div>
        <span>{venta.CLIENTE ? venta.cliente_nombre : "No Disponible"}</span>
      </div>
      <div>
        <span>{fecha}</span>
      </div>
      <div>
        <span>{hora}</span>
      </div>
      <div>
        <span>{venta.TIPO_VENTA}</span>
      </div>
      <div>
        <span>{venta.VENDEDOR}</span>
      </div>
      <div>
        <span>{venta.TIPO_PAGO}</span>
      </div>
      <div>
        <span>{venta.STATUS}</span>
      </div>

      {isAdmin && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span>
            <Modificar onClick={() => manejarVentaDetalles(venta.id)}>
              <i className="fa-solid fa-circle-info" />
            </Modificar>
          </span>
        </div>
      )}
    </VentaRenglonEstilo>
  );
};

export default VentaRenglon;
