import React from "react";
import { Form, Modal } from "react-bootstrap";
import {
  StyledButton,
  StyledModalBody,
  StyledModalFooter,
  StyledModalHeader,
} from "./styles/VentanaFormularioRuta.styles";

const VentanaFormularioRuta = ({
  rutas,
  days,
  ruta,
  setRuta,
  modificarDays,
  mostrarRutas,
  manejarCerrarVentana,
}) => {
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
                  setRuta(e.target.value);
                }}
              >
                {rutas.map((r) => (
                  <option value={r}>{r}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Días de la semana:</Form.Label>
              {[
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sábado",
                "Domingo",
              ].map((day) => (
                <Form.Check
                  type="checkbox"
                  label={day}
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
