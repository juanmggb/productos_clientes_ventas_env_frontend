import styled from 'styled-components';

const Overlay = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.4);
	padding: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ContenedorVentana = styled.div`
	position: relative;
	min-width: 700px;
	min-height: 100px;
	background-color: #ffffff;
	color: #000000;
	border-radius: 10px;
	box-shadow: 0px 7px 30px 0px rgba(0, 0, 0, 0.5);
	padding: 20px 20px 20px 20px;
	user-select: none;
	display: grid;
	grid-gap: 15px;
`;

const TituloOperacion = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 20px;
	border-bottom: 2px solid #d9d9d9;

	h3 {
		font-weight: bold;
		font-size: 1.2em;
		color: #000000;
	}
`;

const BotonCerrar = styled.button`
	position: absolute;
	top: 20px;
	right: 20px;
	width: 70px;
	height: 30px;
	background-color: #b10000;
	font-weight: bold;
	font-size: 0.9em;
	color: #ffffff;
	border: none;
	cursor: pointer;
	border-radius: 5px;

	&:hover {
		background-color: red;
	}
`;

const TablaEstilo = styled.table`
    text-align: left;
	background-color: silver;
	box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.3);
	border-collapse: collapse;

	th {
		text-align: left;
		min-width: 200px;
		border-radius: 0px;
		padding: 10px;
		border-bottom: 3px solid black;
	
	}

	td{
		border-radius: 0px;
		padding: 5px 10px 5px 10px;
		background-color: white;
		min-width: 200px;
	}

	td:first-child{
		font-weight: bold;
	}
`;

const TituloEstilo = styled.span`
	font-size: 15px;
	font-weight: bold;
`;

const Texto = styled.p`
    text-align: justify;
`;

const VentanaEmergenteResumenVentas = ({
	mostrarResumen,
	setMostrarResumen,
	ventas
}) => {
	// Obtener ventas clasificadas por tipo de venta y tipo de pago
	const TotalVentasPorTipoVentayPago = obtenerVentasPorTipoVentaYPago(ventas);
	console.log('TOTALES:',TotalVentasPorTipoVentayPago);

	const TotalVentasPorTipo = obtenerVentasPorTipo(ventas);

	return (
		<>
			{mostrarResumen && (
				<Overlay>
					<ContenedorVentana>
						<TituloOperacion>
							<h3>Resumen de las ventas</h3>
						</TituloOperacion>
						<BotonCerrar onClick={() => setMostrarResumen(false)}>
							Cerrar
						</BotonCerrar>
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
										<td>{'$'}{venta['MONTO TOTAL']}</td>
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
										<td>{'$'}{venta['MONTO TOTAL']}</td>
									</tr>
								))}
							</tbody>
						</TablaEstilo>
						<Texto>
							<TituloEstilo>Total:</TituloEstilo>{'  $'}
							{obtenerTotal(TotalVentasPorTipoVentayPago)}
						</Texto>
					</ContenedorVentana>
				</Overlay>
			)}
		</>
	);
};

// Funcion para obtener ventas de cada tipo de venta y pago
const obtenerVentasPorTipoVentaYPago = ventas => {
	const TotalVentasPorTipo = [];

	for (const tipoVenta of ['MOSTRADOR', 'RUTA']) {
		for (const tipoPago of ['CONTADO', 'CREDITO', 'CORTESIA']) {
			const TotalVentas = ventas.filter(venta =>
				esVentaTipoVentayPago(venta, tipoVenta, tipoPago)
			);
			TotalVentasPorTipo.push({
				tipo: tipoVenta + '-' + tipoPago,
				numeroVentas: TotalVentas.length,
				'MONTO TOTAL': parseFloat(obtenerMontoTotal(TotalVentas))
			});
		}
	}

	return TotalVentasPorTipo;
};

// Funcion para provar si una venta es de cierto tipo de venta y pago
const esVentaTipoVentayPago = (venta, tipoVenta, tipoPago) => {
	return (
		venta.TIPO_VENTA === tipoVenta && venta.TIPO_PAGO === tipoPago
	);
};

// Funcion para obtener ventas de cada tipo de venta y pago
const obtenerVentasPorTipo = ventas => {
	const TotalVentasPorTipo = [];

	const valoresDeTipo = {
		'TIPO_VENTA': ['MOSTRADOR', 'RUTA'],
		'TIPO_PAGO': ['CONTADO', 'CREDITO', 'CORTESIA']
	};

	for (const nombreCampo of ['TIPO_VENTA', 'TIPO_PAGO']) {
		for (const valorCampo of valoresDeTipo[nombreCampo]) {
			const TotalVentas = ventas.filter(venta =>
				esVentaTipo(venta, nombreCampo, valorCampo)
			);

			TotalVentasPorTipo.push({
				tipo: valorCampo,
				numeroVentas: TotalVentas.length,
				'MONTO TOTAL': parseFloat(obtenerMontoTotal(TotalVentas))
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
const obtenerMontoTotal = ventas => {
	let total = 0;
	for (const venta of ventas) {
		total += venta.MONTO;
	}
	return total.toFixed(2);
};

const obtenerTotal = ventas  => {
	let total = 0;
	for(const venta of ventas){
		total += venta['MONTO TOTAL'];
	}
	return total.toFixed(2);
}

export default VentanaEmergenteResumenVentas;
