import React from "react";
import { Form, Modal } from "react-bootstrap";
import {
  StyledButton,
  StyledModalBody,
  StyledModalFooter,
  StyledModalHeader,
} from "./styles/VentanaFormularioRuta.styles";

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
  ruta,
  rutas,
  modificarDayIds,
  modificarRuta,
  mostrarRutas,
  manejarCerrarVentana,
}) => {
  return (
    Object.keys(ruta.rutaDays).length > 0 && (
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
                value={ruta.nombre}
                onChange={(e) => {
                  modificarRuta(e.target.value);
                }}
              >
                {rutas.map((r) => (
                  <option value={r.NOMBRE} key={r.NOMBRE}>
                    {r.NOMBRE}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Días de la semana:</Form.Label>
              {Object.keys(DAY_WEEK).map((day) => (
                <Form.Check
                  key={day}
                  type="checkbox"
                  label={DAY_WEEK[day]}
                  value={day}
                  checked={ruta.selectedIds.includes(ruta.rutaDays[day])}
                  onChange={(e) => {
                    modificarDayIds(
                      ruta.rutaDays[e.target.value],
                      e.target.checked
                    );
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
