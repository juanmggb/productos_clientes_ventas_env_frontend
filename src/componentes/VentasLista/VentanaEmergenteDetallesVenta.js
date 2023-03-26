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
	min-width: 500px;
	max-width: 800px;
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

const VentanaEmergenteDetallesVenta = ({
	ventaDetalles,
	estado,
	cambiarEstado
}) => {
	const { productos, total, observacion, descuento } = ventaDetalles;

	return (
		<>
			{estado && (
				<Overlay>
					<ContenedorVentana>
						<TituloOperacion>
							<h3>Detalle de la venta</h3>
						</TituloOperacion>
						<BotonCerrar onClick={() => cambiarEstado(false)}>
							Cerrar
						</BotonCerrar>
						<TituloEstilo>Tabla de Productos:</TituloEstilo>
						<TablaEstilo>
							<thead>
								<th>Producto</th>
								<th>Cantidad</th>
								<th>Precio al cliente</th>
							</thead>
							<tbody>
								{productos.map((producto, index) => (
									<tr key={index}>
										{console.log('PRODUCTO: ', producto)}
										<td>{producto.producto_nombre}</td>
										<td>{producto.CANTIDAD_VENTA}</td>
										<td>${(producto.PRECIO_VENTA/producto.CANTIDAD_VENTA).toFixed(2)}</td>
									</tr>
								))}
							</tbody>
						</TablaEstilo>
						<Texto>
							{console.log('DESCUENTO',descuento)}
							<TituloEstilo>Porcentaje de descuento:</TituloEstilo> {descuento}
						</Texto>
						<Texto>
							<TituloEstilo>Monto total:</TituloEstilo> ${total.toFixed(2)}
						</Texto>
						<Texto>
							<TituloEstilo>Observaciones:</TituloEstilo> {observacion}
						</Texto>
					</ContenedorVentana>
				</Overlay>
			)}
		</>
	);
};

export default VentanaEmergenteDetallesVenta;
