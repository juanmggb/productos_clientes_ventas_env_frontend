// Importar modulos
import styled from 'styled-components';

// Importar componentes
import VentaRenglon from './VentaRenglon';

// Estilos /////////////////////////////////////////////////////


// Estilos para el contenedor de las ventas
const ListaVentas = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px;
  grid-auto-rows: 60px;
`;



// Componente ////////////////////////////////////////////////////
const ListaVentasRenglones = ({ ventas, mostrarDetallesVenta, manejarVentaDetalles }) => {
	// Parte 2. HTML que se renderiza
	// Si no hay ventas, regresa el parrafo no hay ventas
	if (!ventas.length) return <p>No hay ventas</p>;
	// Si hay ventas regresar lista de ventas
	return (
			<ListaVentas>
			{ventas.map(venta => (
				<VentaRenglon
					key={venta.id}
					venta={venta}
					mostrarDetallesVenta={mostrarDetallesVenta}
                    manejarVentaDetalles={manejarVentaDetalles}
				/>
			))}
			</ListaVentas>
	);
};

export default ListaVentasRenglones;
