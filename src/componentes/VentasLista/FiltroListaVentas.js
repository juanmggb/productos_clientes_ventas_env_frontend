// Importar modulos
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import styled from 'styled-components';

// Estilos para el componente ////////////////////////////////////////////////////////////////

// Estilo para el componente completo
const FiltroListaProductosEstilo = styled.form`
    width: 100%;
	height: 100%;
	/* Estilo del Layout */
	display: grid;
	grid-gap: 10px;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr 0.5fr 1fr 1fr;
	grid-template-areas:
		'Buscar'
		'Ordenar'
		'Fecha'
		'Hora';
`;

// Estilo para el campo de buscar
const BuscarEstilo = styled.div`
	grid-area: Buscar;
	display: grid;
	grid-gap: 5px;
	grid-template-rows: 1fr 1.5fr 1.5fr;
`;

// Estilo para el campo de ordenar
const SeleccionarOrdenEstilo = styled.div`
	grid-area: Ordenar;
	display: grid;
	grid-gap: 5px;
	grid-template-rows: 1fr 1.5fr;
`;

// Estilo para el rango de fechas
const RangoFechaEstilo = styled.div`
	grid-area: Fecha;
	display: grid;
	grid-gap: 5px;
`;

// Estilo para el rango de horas
const RangoHoraEstilo = styled.div`
	grid-area: Hora;
	display: grid;
	grid-gap: 5px;
	
`;

// Estilo para el texto
const Label = styled.label`
    justify-self: center;
	align-self: center;
	color: white;
	font-weight: bold;
	user-select: none;
	font-size: 15px;
`;

// Estilo para el select de buscar 
const Select = styled.select`
     width: 100%;
	 height: 30px;
	 background-color: rgb(235,245,255);
	 color: rgb(50, 50, 50);
     box-shadow: inset 0px 0px 5px 5px rgba(180,205,215,0.60),
     	         0px 2px 5px 2px rgba(0, 0, 0, 0.5);
	 justify-self: center;
	 align-self: center;
	 text-align: center;
	 font-weight: bold;
     border-radius: 10px;

	 &:hover{
    box-shadow: 0px 2px 5px 2px rgba(95, 111, 188, 0.8);
  }
`;

// Estilo para el input de buscar
const Input = styled.input`
     width: 100%;
	 height: 30px;
	 background-color: rgb(235,245,255);
	 color: rgb(50, 50, 50);
     box-shadow: inset 0px 0px 5px 5px rgba(180,205,215,0.60),
     	         0px 2px 5px 2px rgba(0, 0, 0, 0.5);
	 justify-self: center;
	 align-self: center;
	 text-align: center;
	 font-weight: bold;
     border-radius: 10px;

	 &:hover{
    box-shadow: 0px 2px 5px 2px rgba(95, 111, 188, 0.8);
  }
`;


// Estilo para el contenedor de la fecha
const Fecha = styled.div`
	display: grid;
	grid-gap: 20px;
	grid-template-columns: 2fr 5fr;

	& label{
		justify-self: right;
	}

	& input{
		justify-self: left;
	}
`;

// Componente /////////////////////////////////////////////////////////////////////////
const FiltroListaVentas = ({ manejarFiltros}) => {
	// Parte 1. Crear los hooks a usar en el componente
	// Crear datos del formulario

	// Obtener la fecha actual
	const hoy = obtenerFechaActual();

	// Establecer valore por defecto del formulario
	const { register, watch, handleSubmit } = useForm({
		defaultValues: {
			buscar: '',
			filtrarPor: 1,
			ordenarPor: 0,
			fechaInicio: '',
			fechaFinal: hoy,
			horaInicio: '',
			horaFinal: ''
		}
	});

	// ESTO SE EJECUTA CADA VEZ QUE SE RENDERIZA EL COMPONENTE

	// Parte 2. Funciones que se llaman con cada renderizado

	// Observar el valor de las entradas del formulario
	const {
		buscar,
		filtrarPor,
		ordenarPor,
		fechaInicio,
		fechaFinal,
		horaInicio,
		horaFinal
	} = watch();

	// Solo para verificar que la data en el formulario es correcta
	const onSubmit = data => {
		console.log(data);
	};

	// Usamos la data en el formulario para cambiar el estado de filtros cada vez que la data cambia
	useEffect(() => {
		manejarFiltros(
			buscar,
			filtrarPor,
			ordenarPor,
			fechaInicio,
			fechaFinal,
			horaInicio,
			horaFinal
		);
	}, [
		buscar,
		filtrarPor,
		ordenarPor,
		fechaInicio,
		fechaFinal,
		horaInicio,
		horaFinal
	]);

	// Parte 3. HTML que va a ser renderizado
	return (
		<FiltroListaProductosEstilo onSubmit={handleSubmit(onSubmit)}>
			{/* BUSCAR POR CAMPO SELECCIONADO */}
			<BuscarEstilo>
				<Label htmlFor='filtrarPor'>BUSCAR COINCIDENCIA: </Label>
				<Select
					id='filtrarPor'
					{...register('filtrarPor', {
						valueAsNumber: true
					})}
				>
					<option value='0'>Por nombre cliente</option>
					<option value='1'>Por tipo de venta</option>
					<option value='2'>Por tipo de pago</option>
					<option value='3'>Por status</option>
					<option value='4'>Por nombre vendedor</option>
				</Select>
				<Input type='text' {...register('buscar')}></Input>
			</BuscarEstilo>

			{/* ORDENAR POR CAMPO SELECCIONADO */}
			<SeleccionarOrdenEstilo>
				<Label htmlFor='ordenarPor'>ORDENAR TABLA:</Label>
				<Select
					id='ordenarPor'
					{...register('ordenarPor', {
						valueAsNumber: true
					})}
				>
					<option value='0'>Por defecto</option>
					<option value='1'>Por nombre cliente</option>
					<option value='2'>Por fecha</option>
					<option value='3'>Por hora</option>
					<option value='4'>Por nombre vendedor</option>
				</Select>
			</SeleccionarOrdenEstilo>

			{/* FILTRAR POR RANGO DE FECHAS */}
			<RangoFechaEstilo>
				<Label>FILTRAR ENTRE RANGOS DE FECHAS</Label>

				{/* Fecha de inicio */}
				<Fecha>
					<Label htmlFor='fechaInicio'>Del:</Label>
					<Input
						type='date'
						id='fechaInicio'
						{...register('fechaInicio')}
					></Input>
                </Fecha>
				{/* Fecha final */}
				<Fecha>
					<Label htmlFor='fechaFinal'>Al:</Label>
					<Input
						type='date'
						id='fechaFinal'
						{...register('fechaFinal')}
						value={fechaFinal}
					></Input>
				</Fecha>
			</RangoFechaEstilo>

			{/* FILTRAR POR RANGO DE HORAS */}
			<RangoHoraEstilo>
				<Label>FILTRAR POR HORA</Label>
				<Fecha>
					<Label htmlFor='horaInicio'>De:</Label>
					<Input
						type='time'
						id='horaInicio'
						{...register('horaInicio')}
					/>
				</Fecha>
				<Fecha>
					<Label htmlFor='horaFinal'>A:</Label>
					<Input
						type='time'
						id='horaFinal'
						{...register('horaFinal')}
					/>
				</Fecha>
			</RangoHoraEstilo>
		</FiltroListaProductosEstilo>
	);
};

const obtenerFechaActual = () => {
	const date = new Date();
	let dia = date.getDate();
	dia = String(dia).padStart(2, '0');
	let mes = date.getMonth() + 1;
	mes = String(mes).padStart(2, '0');
	const anio = date.getFullYear();

	// This arrangement can be altered based on how we want the date's format to appear.
	return `${anio}-${mes}-${dia}`;
};

export default FiltroListaVentas;
