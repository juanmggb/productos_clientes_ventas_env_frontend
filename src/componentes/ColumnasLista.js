// Importar modulos
import styled from 'styled-components';

/*=====================================================================================================*/
/*===================================== Estilos CSS ===================================================*/
const ColumnasListaEstilo = styled.div`
  grid-area: Columnas;
	display: flex;
	align-items: center;
	background-color: lightgray;
	border: 5px solid white;
	padding: 0px 5px 0px 5px;
    user-select: none;
	border-radius: 10px;

	> div {
		width: 100%;
		text-align: center;
	}
	span {
		font-weight: bold;
		font-size: 12px;
	}
`
/*=====================================================================================================*/
/*======================================= Funcion JSX =================================================*/

function ColumnasLista ({NombresColumnas}){
  return(
    <ColumnasListaEstilo>
    {NombresColumnas.map((nombreCampo, index) => (
					<div key={index}>
						<span>{nombreCampo}</span>
					</div>
				))}
    </ColumnasListaEstilo>
  );
};

export default ColumnasLista;