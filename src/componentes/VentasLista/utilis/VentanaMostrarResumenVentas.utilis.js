// Funcion para provar si una venta es de cierto tipo de venta y pago
export const esVentaTipoVentayPago = (venta, tipoVenta, tipoPago) => {
  return venta.TIPO_VENTA === tipoVenta && venta.TIPO_PAGO === tipoPago;
};

// Funcion para obtener ventas de cada tipo de venta y pago
export const obtenerVentasPorTipo = (ventas) => {
  const TotalVentasPorTipo = [];

  const valoresDeTipo = {
    TIPO_VENTA: ["MOSTRADOR", "RUTA"],
    TIPO_PAGO: ["CONTADO", "CREDITO", "CORTESIA"],
  };

  for (const nombreCampo of ["TIPO_VENTA", "TIPO_PAGO"]) {
    for (const valorCampo of valoresDeTipo[nombreCampo]) {
      const TotalVentas = ventas.filter((venta) =>
        esVentaTipo(venta, nombreCampo, valorCampo)
      );

      TotalVentasPorTipo.push({
        tipo: valorCampo,
        numeroVentas: TotalVentas.length,
        "MONTO TOTAL": parseFloat(obtenerMontoTotal(TotalVentas)),
      });
    }
  }

  return TotalVentasPorTipo;
};

// Funcion para provar si una venta es de cierto tipo de venta o de cierto tipo de pago
const esVentaTipo = (venta, nombreCampo, valorCampo) => {
  return venta[nombreCampo] === valorCampo;
};

// Funcion para botener monto total de un array de ventas
export const obtenerMontoTotal = (ventas) => {
  let total = 0;
  for (const venta of ventas) {
    total += venta.MONTO;
  }
  return total.toFixed(2);
};

export const obtenerTotal = (ventas) => {
  let total = 0;
  for (const venta of ventas) {
    total += venta["MONTO TOTAL"];
  }
  return total.toFixed(2);
};

// Funcion para obtener ventas de cada tipo de venta y pago
export const obtenerVentasPorTipoVentaYPago = (ventas) => {
  const TotalVentasPorTipo = [];

  for (const tipoVenta of ["MOSTRADOR", "RUTA"]) {
    for (const tipoPago of ["CONTADO", "CREDITO", "CORTESIA"]) {
      const TotalVentas = ventas.filter((venta) =>
        esVentaTipoVentayPago(venta, tipoVenta, tipoPago)
      );
      TotalVentasPorTipo.push({
        tipo: tipoVenta + "-" + tipoPago,
        numeroVentas: TotalVentas.length,
        "MONTO TOTAL": parseFloat(obtenerMontoTotal(TotalVentas)),
      });
    }
  }

  return TotalVentasPorTipo;
};
