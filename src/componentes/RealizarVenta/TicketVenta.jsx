import React, { forwardRef } from "react";
import styled from "styled-components";

const Principal = styled.div`
    width: 320px;
    height: auto;
    color: black;
    background: rgba(220,220,220,0.9);
    padding: 8px;
    padding-top: 15px;
    font-weight: 400;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: flex-start;
    row-gap: 15px;
`;

const LogoContenedor = styled.div`
    width: 100%;
    border-radius: none;
    padding: 0 65px 0 65px;
`;

const Logo = styled.img`
    width: 150px;
`;

const Texto = styled.p`
    font-weight: ${props => props.negrita};
    font-size: ${props => props.tamaño};
    color: black;
    text-align: ${props => props.alineación};
    width: 100%;
    overflow-x: hidden;
    height: ${props => props.height};
    top: ${props => props.top};
    position: relative;
    margin-bottom: ${props => props.bottom};
    margin-top: ${props => props.top};

    & span{
        display: inline-block;
        position: relative;
        top: ${props => props.topSpan};
        height: ${props => props.heightSpan};
        font-weight: ${props => props.spanFont};
        color: ${props => props.color};
    }
`;

const Grid2Secciones = styled.div`
    display: grid;
    width: 100%;
    height: auto;
    grid-template-columns: 100px 1fr;
    grid-gap: 8px;
`;

const SeccionDatosLocal = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    aling-items: flex-start;
    row-gap: 3px;
`;

const ContenedorProducto = styled.div`
    width: 100%;
    height: auto;
    display: grid;
    grid-gap: 3px;
    grid-template-columns: 110px 39px repeat(2, 1fr);
`;


const Separador = ({doble}) => {
    return(
        (doble) ?
            <Texto tamaño= {'17px'} alineación= {'center'} topSpan= {'-15px'} 
                    height= {'25px'} heightSpan= {'4px'} top= {'-5px'}>
                {'_'.repeat(40)}<span>{'_'.repeat(40)}</span>
            </Texto>
            :
            <Texto tamaño= {'17px'} alineación= {'center'} top= {'-5px'}>{'.'.repeat(80)}</Texto>
    );
}

const contarProductos = (productos) => {
    var cantidadProductos = 0;
    productos.forEach(producto => {
        cantidadProductos += producto.CANTIDAD_VENTA;
    });
    return cantidadProductos;
}

const calcularSubtotal = (productos) => {
    var subtotal = 0;
    productos.forEach(producto => {
        subtotal += producto.PRECIO_VENTA;
    });
    return subtotal;
}

const calcularTotal = (productos, DESCUENTO) => {
    var subtotal = calcularSubtotal(productos);
    var total = (subtotal)*(1-DESCUENTO/100)
    return total;
}

const datosLocal = {      
    LOCAL: {
      CALLE: 'Culiver City',
      NUMERO: '3',
      COLONIA: 'Barrio de Santo Santiago',
      MUNICIPIO: 'Uruapan',
      ESTADO: 'Mich',
      CP: '60030',
      RFC: 'OIGA7111294F1'
  },
}

const TicketVenta = forwardRef((props, ref) => {
    if(props.datosVenta){
        console.log("VENTA-TV",props.datosVenta)
    const fecha = new Date();
    const numeroFecha = {0:'Ene', 1:'Feb', 2:'Mar', 3:'Abr', 4: 'May', 5:'Jun', 6:'Jul', 7:'Ago', 8: 'Sep',
    9: 'Oct', 10: 'Nov', 11: 'Dic'};
    const productos = props.datosVenta.productos_venta;

const separarFecha = (datosVenta) => {
    const fechaAux = datosVenta.FECHA.split('T')[0];
    const horaAux = datosVenta.FECHA.split('T')[1];
    const FECHA = fechaAux.split('-')[2]+'/'+fechaAux.split('-')[1]+'/'+fechaAux.split('-')[0];
    const HORA = horaAux.split('.')[0];
    return([FECHA,HORA]);
}

const getTime = (factor) => {
    if(factor < 10){
       return '0' + factor;
    }
    else{
        return factor;
    }
}

    return(
        <Principal ref={ref}>
            <LogoContenedor>
                <Logo src= {'../Imagenes/Logo.png'}/>
            </LogoContenedor>
            <Texto alineación= {'center'} tamaño= {'20px'}>TICKET DE COMPRA</Texto>
            <Grid2Secciones>
                <SeccionDatosLocal>
                    <Texto negrita= {600} tamaño= {'15px'} alineación= {'left'}>DIRECCIÓN</Texto>
                    <Texto alineación= {'left'} tamaño= {'12px'} top= {'3px'} height= {'20px'}>
                        {datosLocal.LOCAL.CALLE + ' N° ' + datosLocal.LOCAL.NUMERO}
                    </Texto>
                    <Texto alineación= {'left'} tamaño= {'12px'}>{datosLocal.LOCAL.COLONIA}</Texto>
                    <Texto alineación= {'left'} tamaño= {'12px'}>
                        {datosLocal.LOCAL.MUNICIPIO + ', ' + datosLocal.LOCAL.ESTADO + ' ' + datosLocal.LOCAL.CP}
                    </Texto>
                </SeccionDatosLocal>
                <SeccionDatosLocal>
                    <Texto negrita= {600} tamaño= {'15px'} alineación= {'center'}>ATENCIÓN AL CLIENTE</Texto>
                    <Texto alineación= {'left'} tamaño= {'12px'} top= {'3px'} height= {'20px'}>524 0028/01 800 GP HIELO</Texto>
                    <Texto alineación= {'left'} tamaño= {'11.8px'}>www.hielogranpacifico.com</Texto>
                    <Texto alineación= {'left'} tamaño= {'11.8px'}>contacto@hielogranpacifico.com</Texto>
                </SeccionDatosLocal>
            </Grid2Secciones>
            <Texto negrita= {600} alineación= {'center'} tamaño= {'12px'} top= {'-2px'} height= {'14px'}>
                RFC: {datosLocal.LOCAL.RFC}
            </Texto>
            <Separador doble= {true}/>

            <Grid2Secciones>
                <Texto alineación= {'left'} tamaño= {'13.5px'}>
                    {separarFecha(props.datosVenta)[0]}
                </Texto>
                <Texto alineación= {'center'} tamaño= {'13.5px'}>
                    {separarFecha(props.datosVenta)[1]}
                </Texto>
            </Grid2Secciones>
            
            <Texto negrita= {600} alineación= {'left'} tamaño= {'13.5px'}>ID: {props.datosVenta.id}</Texto>
            <Texto negrita= {600} alineación= {'left'} tamaño= {'13.5px'} spanFont= {400} top= {'-8px'}>
                CLIENTE: <span>{props.datosVenta.cliente_nombre}</span>
            </Texto>
            <Texto negrita= {600} alineación= {'left'} tamaño= {'13.5px'} spanFont= {400} top= {'-3px'}>
                VENDEDOR: <span>{props.datosVenta.VENDEDOR}</span>
            </Texto>
            <Texto negrita= {600} alineación= {'left'} tamaño= {'13.5px'} spanFont= {400}>
                PRODUCTOS:  <span>{contarProductos(productos)}</span>
            </Texto>
            <Texto negrita= {600} alineación= {'left'} tamaño= {'13.5px'} spanFont= {400} top= {'-5px'}>
                TIPO PAGO:  <span>{props.datosVenta.TIPO_PAGO}</span>
            </Texto>
            <Texto negrita= {600} alineación= {'left'} tamaño= {'13.5px'} spanFont= {400} top= {'-8px'} height= {'14px'}>
                TIPO VENTA:  <span>{props.datosVenta.TIPO_VENTA}</span>
            </Texto>
            <Separador doble= {true}/>

            <ContenedorProducto>
                <Texto negrita= {600} alineación= {'center'} tamaño= {'13.5px'}>PRODUCTO</Texto>
                <Texto negrita= {600} alineación= {'left'} tamaño= {'13.5px'}>CANT.</Texto>
                <Texto negrita= {600} alineación= {'center'} tamaño= {'13.5px'}>PRECIO</Texto>
                <Texto negrita= {600} alineación= {'center'} tamaño= {'13.5px'}>TOTAL</Texto>
            </ContenedorProducto>

            <ContenedorProducto>
                {productos.map(producto => {
                    return(<>
                        <Texto alineación= {'left'} tamaño= {'12px'} bottom= {'8px'}>
                            {producto.producto_nombre}
                        </Texto>
                        <Texto alineación= {'center'} tamaño= {'12px'} bottom= {'8px'}>
                            {producto.CANTIDAD_VENTA}
                        </Texto>
                        <Texto alineación= {'center'} tamaño= {'12px'} bottom= {'8px'}>
                            ${(producto.PRECIO_VENTA/producto.CANTIDAD_VENTA).toFixed(2)}
                        </Texto>
                        <Texto alineación= {'center'} tamaño= {'12px'} bottom= {'8px'}>
                            ${(producto.PRECIO_VENTA).toFixed(2)}
                        </Texto></>
                    )
                })}
            </ContenedorProducto>
            <Separador/>

            <Texto alineación= {'center'} tamaño= {'15px'} negrita= {600}>
                SUBTOTAL: ${calcularSubtotal(productos).toFixed(2)}
            </Texto>
            <Texto alineación= {'center'} tamaño= {'15px'} negrita= {600}>
                DESCUENTO: {props.DESCUENTO}%
            </Texto>
            <Texto alineación= {'center'} tamaño= {'19px'} negrita= {600}>
                TOTAL: ${calcularTotal(productos, props.DESCUENTO).toFixed(2)}
            </Texto>
            <Separador/>

            <Texto alineación= {'left'} tamaño= {'11.4px'}>
                Es importante que conserve su ticket para hacer válida cualquier aclaración.
            </Texto>
            <Texto alineación= {'left'} tamaño= {'11.4px'} top= {'-7px'}>
                En caso de NO recibir su ticket, quejas con el servicio o anomalías con su compra, comuníquese al teléfono de Atención al Cliente
            </Texto>
            <Texto alineación= {'left'} tamaño= {'14px'}>
                FECHA DE REIMPRESIÓN: {getTime(fecha.getDate()) + '/' + numeroFecha[fecha.getMonth()] + '/' + fecha.getFullYear()+' '}
                {getTime(fecha.getHours()) + ':' + getTime(fecha.getMinutes())}
            </Texto>
            <Separador/>

            <Texto alineación= {'left'} tamaño= {'14px'}>
                {props.datosVenta.COMENTARIOS}
            </Texto>
        </Principal>
    )
}})

export default TicketVenta;