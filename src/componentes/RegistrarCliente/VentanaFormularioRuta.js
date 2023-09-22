import React, { useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import {
  StyledButton,
  StyledModalBody,
  StyledModalFooter,
  StyledModalHeader,
} from "./styles/VentanaFormularioRuta.styles";
import { useDispatch, useSelector } from "react-redux";
import { pedirRutasLista } from "../../actions/rutaActions";

const DAY_WEEK = {
  LUNES: "Lunes",
  MARTES: "Martes",
  MIERCOLES: "Miércoles",
  JUEVES: "Jueves",
  VIERNES: "Viernes",
  SABADO: "Sábado",
  DOMINGO: "Domíngo",
};

const VentanaFormularioRuta = ({
  days,
  ruta,
  modificarDays,
  modificarRuta,
  mostrarRutas,
  manejarCerrarVentana,
}) => {
  // Funcion para disparar las acciones
  const dispatch = useDispatch();

  const rutaLista = useSelector((state) => state.rutaLista);
  const { rutas } = rutaLista;

  // useEffect para cargar rutas
  useEffect(() => {
    // Siempre que se va a registrar un cliente se hace una request de las rutas
    dispatch(pedirRutasLista());
  }, [dispatch]);

  console.log("days", days);

  return (
    rutas && (
      <Modal centered show={mostrarRutas} onHide={manejarCerrarVentana}>
        <StyledModalHeader>
          <h4>Rutas del Cliente </h4>
        </StyledModalHeader>
        <StyledModalBody>
          <Form>
            <Form.Group controlId="ruta">
              <Form.Label>Ruta:</Form.Label>
              <Form.Control
                as="select"
                value={ruta}
                onChange={(e) => {
                  modificarRuta(e.target.value);
                }}
              >
                {rutas.map((r) => (
                  <option value={r.NOMBRE}>{r.NOMBRE}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Días de la semana:</Form.Label>
              {Object.keys(DAY_WEEK).map((day) => (
                <Form.Check
                  type="checkbox"
                  label={DAY_WEEK[day]}
                  value={day}
                  checked={days.includes(day)}
                  onChange={(e) => {
                    modificarDays(e.target.value, e.target.checked);
                  }}
                />
              ))}
            </Form.Group>
          </Form>
        </StyledModalBody>
        <StyledModalFooter>
          <StyledButton
            variant="secondary"
            onClick={() => {
              manejarCerrarVentana();
            }}
          >
            Cerrar
          </StyledButton>
        </StyledModalFooter>
      </Modal>
    )
  );
};

export default VentanaFormularioRuta;
