import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pedirClientesLista } from "../actions/clienteActions";
import { registrarVenta } from "../actions/ventaActions";
import FormularioProductoVenta from "../componentes/FormularioProductoVenta";
import Loader from "../componentes/Loader";
import Mensaje from "../componentes/Mensaje";
import VentanaMostrarVenta from "../componentes/VentanaMostrarVenta";
import { RESET_VENTA_REGISTRAR } from "../constantes/ventaConstantes";
import jwt_decode from "jwt-decode";
import styled from "styled-components";
import ImprimirTicket from "../componentes/ImprimirTicket";

const Principal = styled.div`
  position: fixed;
  background: linear-gradient(
    rgb(54, 54, 82),
    15%,
    rgb(84, 106, 144),
    60%,
    rgb(68, 111, 151)
  );
  color: black;
  font-weight: 400;
  border-radius: 0px;
  width: 100vw;
  height: 91vh;
  padding: 10px;
  grid-gap: 10px;
  display: grid;
  grid-template-columns: 2.5fr 8fr;
  grid-template-rows: 0.7fr 5.7fr 1.5fr;
  grid-template-areas:
    "Formulario Encabezado"
    "Formulario ContenidoPrincipal"
    "Formulario ContenidoPrincipal";
`;

const Encabezado = styled.div`
  grid-area: Encabezado;
  position: relative;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  text-align: center;
  box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.2);
`;

const Formulario = styled.div`
  position: relative;
  grid-area: Formulario;
  display: grid;
  grid-template-rows: 6fr 2.4fr;
  grid-template-areas:
    "PanelControl"
    "Herramientas";
  height: 100%;
  width: 100%;
`;

const PanelControl = styled.div`
  position: relative;
  grid-area: PanelControl;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 15px;
  padding-top: 0px;
  height: 75.2vh;
  width: 100%;
`;

const ContenidoPrincipal = styled.div`
  background: white;
  grid-area: ContenidoPrincipal;
  overflow: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.2);

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Herramientas = styled.div`
  background: #ffffff;
  color: black;
  grid-area: Herramientas;
  padding: 15px;
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.2);
`;

const BotonVenta = styled(Button)`
  width: 50%;
  height: 50px;
  background-color: green;
  color: white;
  text-align: center;
  font-size: 0.9em;
  font-weight: bold;
  border: none;
  box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);

  &:hover:enabled {
    background-color: #00a100;
    box-shadow: 0px 2px 5px 2px rgba(0, 161, 0, 0.8);
  }

  &:disabled {
    background-color: #012b00;
  }
`;

const ClienteVenta = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: bold;
`;

const RealizarVenta = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clienteLista = useSelector((state) => state.clienteLista);

  const { loading, clientes, error } = clienteLista;

  const usuarioInfo = useSelector((state) => state.usuarioInfo);
  const { token } = usuarioInfo;

  const ventaRegistrar = useSelector((state) => state.ventaRegistrar);

  const {
    loading: loadingRegistrar,
    venta,
    error: errorRegistrar,
  } = ventaRegistrar;

  const [vendedor, setVendedor] = useState("");
  const [cliente, setCliente] = useState({});
  const [productosCliente, setProductosCliente] = useState([]);
  const [productosVenta, setProductosVenta] = useState([]);
  const [tipoVenta, setTipoVenta] = useState("MOSTRADOR");
  const [tipoPago, setTipoPago] = useState("CONTADO");
  const [status, setStatus] = useState("PENDIENTE");
  const [observaciones, setObservaciones] = useState("NO APLICA");
  const [descuento, setDescuento] = useState(0);
  const [deshabilitarVenta, setDesabilitarVenta] = useState(true);
  const [mostrarVenta, setMostrarVenta] = useState(false);
  const [imprimirTicket, setImprimirTicket] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      setVendedor(JSON.parse(localStorage.getItem("name")));
    }
    if (venta) {
      setMostrarVenta(true);
      setImprimirTicket(true);
    }

    if (!clientes) {
      dispatch(pedirClientesLista());
    } else if (clientes.length > 0) {
      setCliente(clientes[0]);
      setProductosCliente(clientes[0].precios_cliente);
    }
  }, [clientes, navigate, venta, dispatch, token]);

  const manejarCambiarCliente = (clienteId) => {
    const clienteSeleccionado = { ...clientes.find((c) => c.id === clienteId) };

    setCliente(clienteSeleccionado);

    setProductosCliente(clienteSeleccionado.precios_cliente);

    setProductosVenta([]);
  };

  const manejarDesabilitarVenta = (nuevosProductosVenta) => {
    setDesabilitarVenta(
      !(
        nuevosProductosVenta.length > 0 &&
        nuevosProductosVenta.every((p) => p.confirmado) &&
        nuevosProductosVenta.every((p) => p.cantidadVenta > 0)
      )
    );
  };

  const manejarSeleccionarProducto = (productoId) => {
    const productoSeleccionado = productosCliente.find(
      (p) => p.id === productoId
    );

    const productoActualizado = {
      ...productoSeleccionado,
      confirmado: false,
      cantidadVenta: 1,
    };

    const nuevosProductosCliente = productosCliente.filter(
      (p) => p.id !== productoId
    );
    setProductosCliente(nuevosProductosCliente);

    const nuevosProductosVenta = [productoActualizado, ...productosVenta];
    setProductosVenta(nuevosProductosVenta);

    manejarDesabilitarVenta(nuevosProductosVenta);
  };

  const manejarCambioCantidad = (nuevaCantidad, productoId) => {
    // Obtener el index del producto cuya camtodad hay que cambiar

    const productoSeleccionado = productosVenta.find(
      (pv) => pv.id === productoId
    );

    const cantidadDisponible = productoSeleccionado.producto_cantidad;
    if (nuevaCantidad > cantidadDisponible) {
      alert(
        `La cantidad seleccionada debe ser inferior a ${productoSeleccionado.producto_cantidad}`
      );
    } else {
      if (nuevaCantidad <= 0) {
        nuevaCantidad = 1;
      } else {
        const indexProducto = productosVenta.findIndex(
          (producto) => producto.id === productoId
        );

        // Crear una copia del arreglo de productos
        const nuevosProductosVenta = [...productosVenta];

        // Actualizar el precio con el index seleccionado
        nuevosProductosVenta[indexProducto] = {
          ...productosVenta[indexProducto],
          cantidadVenta: nuevaCantidad,
        };

        setProductosVenta(nuevosProductosVenta);
      }
    }
  };

  const manejarConfirmarProducto = (productoId) => {
    const nuevosProductosVenta = productosVenta.map((p) => {
      if (p.id === productoId) {
        p.confirmado = !p.confirmado;
      }
      return p;
    });

    setProductosVenta(nuevosProductosVenta);

    manejarDesabilitarVenta(nuevosProductosVenta);
  };

  const manejarCancelarProducto = (productoId) => {
    const productoSeleccionado = {
      ...productosVenta.find((p) => p.id === productoId),
    };

    const nuevosProductosVenta = productosVenta.filter(
      (p) => p.id !== productoId
    );
    setProductosVenta(nuevosProductosVenta);

    const nuevosProductosCliente = [productoSeleccionado, ...productosCliente];
    setProductosCliente(nuevosProductosCliente);
  };

  const manejarRealizarVenta = (e) => {
    e.preventDefault();

    const nuevosProductosVenta = crearProductosVenta(productosVenta, descuento);

    const monto = calcularMonto(tipoPago, nuevosProductosVenta);
    const montoDescuento = monto * (1 - descuento / 100);

    const venta = {
      productosVenta: nuevosProductosVenta,
      VENDEDOR: vendedor,
      MONTO: montoDescuento,
      TIPO_VENTA: tipoVenta,
      TIPO_PAGO: tipoPago,
      STATUS: status,
      OBSERVACIONES: observaciones,
      CLIENTE: cliente.id,
      DESCUENTO: descuento,
      /*      LOCAL: {
        CALLE: 'Culiver City',
        NUMERO: '3',
        COLONIA: 'Barrio de Santo Santiago',
        MUNICIPIO: 'Uruapan',
        ESTADO: 'Mich',
        CP: '60030',
        RFC: 'OIGA7111294F1'
      }*/
    };
    console.log(venta);
    dispatch(registrarVenta(venta));
  };

  const manejarCerrarVentana = () => {
    setMostrarVenta(false);
  };

  const manejarFinalizarVenta = () => {
    dispatch({ type: RESET_VENTA_REGISTRAR });
    navigate("/ventas");
  };

  const manejarImprimirTicket = () => {
    setImprimirTicket(!imprimirTicket);
  };

  const reset = () => {
    setImprimirTicket(!imprimirTicket);
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Mensaje variant="danger">{error}</Mensaje>
  ) : (
    clientes && (
      <div style={{ maxWidth: "100vw" }}>
        {loadingRegistrar && <Loader />}
        {errorRegistrar && <Mensaje variant="danger">{error}</Mensaje>}
        {/* Esta es la parte que cambia en las paginas */}

        <Principal>
          <Encabezado>
            <ClienteVenta
              onMouseOver={() => {
                console.log(venta);
              }}
            >
              {cliente.NOMBRE}
            </ClienteVenta>
          </Encabezado>
          <ContenidoPrincipal>
            <FormularioProductoVenta
              productos={productosVenta}
              manejarCambioCantidad={manejarCambioCantidad}
              manejarConfirmarProducto={manejarConfirmarProducto}
              manejarCancelarProducto={manejarCancelarProducto}
            />
          </ContenidoPrincipal>
          <Formulario>
            <Form onSubmit={manejarRealizarVenta}>
              <PanelControl>
                <Row style={{ rowGap: "9px" }}>
                  <Form.Group style={{ maxHeight: "3.5em" }}>
                    <Form.Label
                      style={{
                        fontSize: "13.5px",
                        color: "white",
                        fontWeight: "bold",
                        marginBottom: "4px",
                      }}
                    >
                      VENDEDOR
                    </Form.Label>
                    <Form.Control
                      style={{
                        height: "45%",
                        padding: "0px",
                        paddingLeft: "8px",
                      }}
                      readOnly
                      type="text"
                      value={vendedor}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group
                    controlId="cliente"
                    style={{ maxHeight: "3.5em" }}
                  >
                    <Form.Label
                      style={{
                        fontSize: "13.5px",
                        color: "white",
                        fontWeight: "bold",
                        marginBottom: "4px",
                      }}
                    >
                      CLIENTE
                    </Form.Label>
                    <Form.Control
                      style={{
                        height: "45%",
                        padding: "0px",
                        paddingLeft: "8px",
                      }}
                      as="select"
                      value={cliente.id}
                      onChange={(e) =>
                        manejarCambiarCliente(Number(e.target.value))
                      }
                    >
                      {clientes.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.NOMBRE}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group
                    controlId="productosCliente"
                    style={{ maxHeight: "3.5em" }}
                  >
                    <Form.Label
                      style={{
                        fontSize: "13.5px",
                        color: "white",
                        fontWeight: "bold",
                        marginBottom: "4px",
                      }}
                    >
                      PRODUCTOS DEL CLIENTE
                    </Form.Label>
                    <Form.Control
                      style={{
                        height: "45%",
                        padding: "0px",
                        paddingLeft: "8px",
                      }}
                      as="select"
                      defaultValue={0}
                      onChange={(e) =>
                        manejarSeleccionarProducto(Number(e.target.value))
                      }
                    >
                      <option value={0}>Selecciona un producto</option>
                      {productosCliente.map((pc) => (
                        <option key={pc.id} value={pc.id}>
                          {pc.producto_nombre}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group
                    controlId="tipoVenta"
                    style={{ maxHeight: "3.5em" }}
                  >
                    <Form.Label
                      style={{
                        fontSize: "13.5px",
                        color: "white",
                        fontWeight: "bold",
                        marginBottom: "4px",
                      }}
                    >
                      TIPO DE VENTA
                    </Form.Label>
                    <Form.Control
                      style={{
                        height: "45%",
                        padding: "0px",
                        paddingLeft: "8px",
                      }}
                      as="select"
                      value={tipoVenta}
                      onChange={(e) => setTipoVenta(e.target.value)}
                    >
                      <option value="MOSTRADOR">Mostrador</option>
                      <option value="RUTA">Ruta</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group
                    controlId="tipoPago"
                    style={{ maxHeight: "3.5em" }}
                  >
                    <Form.Label
                      style={{
                        fontSize: "13.5px",
                        color: "white",
                        fontWeight: "bold",
                        marginBottom: "4px",
                      }}
                    >
                      TIPO DE PAGO
                    </Form.Label>
                    <Form.Control
                      style={{
                        height: "45%",
                        padding: "0px",
                        paddingLeft: "8px",
                      }}
                      as="select"
                      value={tipoPago}
                      onChange={(e) => setTipoPago(e.target.value)}
                    >
                      <option value="CONTADO">Efectivo</option>
                      <option value="CREDITO">Credito</option>
                      <option value="CORTESIA">Cortesia</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="status" style={{ maxHeight: "3.5em" }}>
                    <Form.Label
                      style={{
                        fontSize: "13.5px",
                        color: "white",
                        fontWeight: "bold",
                        marginBottom: "4px",
                      }}
                    >
                      ESTATUS
                    </Form.Label>
                    <Form.Control
                      style={{
                        height: "45%",
                        padding: "0px",
                        paddingLeft: "8px",
                      }}
                      as="select"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      {tipoPago === "CORTESIA" || descuento !== 0 ? (
                        <option value="PENDIENTE">Pendiente</option>
                      ) : (
                        <>
                          <option value="REALIZADO">Realizado</option>
                          <option value="PENDIENTE">Pendiente</option>
                        </>
                      )}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group
                    controlId="observaciones"
                    style={{ maxHeight: "3.5em" }}
                  >
                    <Form.Label
                      style={{
                        fontSize: "13.5px",
                        color: "white",
                        fontWeight: "bold",
                        marginBottom: "4px",
                      }}
                    >
                      OBSERVACIONES
                    </Form.Label>
                    <Form.Control
                      style={{
                        height: "45%",
                        padding: "0px",
                        paddingLeft: "8px",
                      }}
                      required
                      type="text"
                      value={observaciones}
                      onChange={(e) => setObservaciones(e.target.value)}
                      autoComplete="off"
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group
                    controlId="Descuento"
                    style={{ maxHeight: "3.5em" }}
                  >
                    <Form.Label
                      style={{
                        fontSize: "13.5px",
                        color: "white",
                        fontWeight: "bold",
                        marginBottom: "4px",
                      }}
                    >
                      DESCUENTO
                    </Form.Label>
                    <Form.Control
                      style={{
                        height: "45%",
                        padding: "0px",
                        paddingLeft: "8px",
                      }}
                      required
                      type="number"
                      value={descuento}
                      min={0}
                      max={100}
                      autoComplete="off"
                      onChange={(e) => setDescuento(parseInt(e.target.value))}
                    />
                  </Form.Group>
                </Row>
              </PanelControl>
              <Herramientas>
                <BotonVenta disabled={deshabilitarVenta} type="submit">
                  Realizar venta
                </BotonVenta>
              </Herramientas>
            </Form>
          </Formulario>
        </Principal>
        {/* Mostrar venta */}
        <ImprimirTicket
          estado={imprimirTicket}
          datosVenta={venta}
          reset={reset}
          DESCUENTO={descuento}
          manejarFinalizarVenta={manejarFinalizarVenta}
        />
        {mostrarVenta && (
          <VentanaMostrarVenta
            venta={venta}
            mostrarVenta={mostrarVenta}
            manejarCerrarVentana={manejarCerrarVentana}
            descuento={descuento}
          />
        )}
      </div>
    )
  );
};

const crearProductosVenta = (productosVenta) => {
  const nuevosProductosVenta = productosVenta.map((pv) => {
    const productoId = pv.PRODUCTO;

    const cantidadVenta = pv.cantidadVenta;

    const precioVenta = pv.PRECIO * pv.cantidadVenta;

    return { productoId, cantidadVenta, precioVenta };
  });

  return nuevosProductosVenta;
};

const calcularMonto = (tipoPago, nuevosProductosVenta) => {
  if (tipoPago === "CORTESIA") {
    return 0;
  } else {
    const monto = nuevosProductosVenta.reduce(
      (total, pv) => pv.precioVenta + total,
      0
    );

    return monto;
  }
};

const getTime = (factor) => {
  if (factor < 10) {
    return "0" + factor;
  } else {
    return factor;
  }
};

export default RealizarVenta;
