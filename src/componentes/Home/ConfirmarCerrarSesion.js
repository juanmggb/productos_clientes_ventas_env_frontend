import { Container, Row } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/sesionActions";
import { StyledCol, StyledIcono } from "./styles/ConfirmarCerrarSesion.styles";

const ConfirmarCerrarSesion = ({ t }) => {
  const dispatch = useDispatch();

  const manejarCerrarSesion = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <Row>Estás seguro de cerrar la sesión</Row>
      <Row>
        <StyledCol>
          <StyledIcono onClick={manejarCerrarSesion}>
            <i className="fa-solid fa-circle-check fa-2xl green"></i>
          </StyledIcono>
        </StyledCol>
        <StyledCol>
          <StyledIcono
            onClick={() => {
              toast.dismiss(t.id);
              toast.error("Operacion cancelada", { duration: 1000 });
            }}
          >
            <i className="fa-sharp fa-solid fa-circle-xmark fa-2xl red"></i>
          </StyledIcono>
        </StyledCol>
      </Row>
    </Container>
  );
};

export default ConfirmarCerrarSesion;
