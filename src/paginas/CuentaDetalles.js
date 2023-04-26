import React, { useEffect, useState } from "react";
import { Row, Col, Container, Form, FormGroup, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  actualizarCuenta,
  obtenerCuentaDetalles,
} from "../actions/cuentaActions";
import Loader from "../componentes/Loader";
import Mensaje from "../componentes/Mensaje";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { logout } from "../actions/usuarioActions";
import styled from "styled-components";

// Estilos de la página principal
const Principal = styled.div`
  position: fixed;
  background: linear-gradient(
    rgb(54, 54, 82),
    15%,
    rgb(84, 106, 144),
    60%,
    rgb(68, 111, 151)
  );

  overflow: scroll;

  height: 100vh;
  width: 100vw;
  padding: 30px;
  user-select: none;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  // Estilos para smarthphone
  @media (max-width: 480px) and (orientation: portrait) {
    height: 100vh;

    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    gap: 30px;
  }

  // Estilos para pc
  @media (min-width: 480px) {
    & div {
      width: 50vw;
    }
  }
`;

// Estilos FormGroupStyled
const FormGroupStyled = styled(Form.Group)`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 5px;

  & label {
    color: white;
    font-weight: bold;
  }

  & input,
  select {
    color: black;
    font-weight: bold;
  }
`;

const ImgStyled = styled.img`
  /* borderRadius: "50%", marginTop: "80px" */
  border-radius: 50%;
  margin-top: 100px !important;
`;

function CuentaDetalles() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [nombre, setNombre] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [imagen, setImagen] = useState("");

  const cuentaDetalles = useSelector((state) => state.cuentaDetalles);

  const { loading, cuenta, error } = cuentaDetalles;

  const cuentaActualizar = useSelector((state) => state.cuentaActualizar);

  const {
    loading: loadingActualizar,
    success: successActualizar,
    error: errorActualizar,
  } = cuentaActualizar;

  // useEffect para mostrar las alertas
  useEffect(() => {
    if (loadingActualizar) {
      toast.loading("Actualizando cuenta");
    }

    if (successActualizar) {
      toast.remove();
      toast.success("Cuenta actualizada");
    }

    if (errorActualizar) {
      toast.dismiss();
      toast.error("Error al actualizar cuenta");
    }
  }, [successActualizar, errorActualizar, loadingActualizar]);

  useEffect(() => {
    if (successActualizar) {
      // dispatch({ type: RESET_CUENTA_DETALLES });
      // dispatch({ type: RESET_CUENTA_UPDATE });
      // navigate("/usuarios");
      dispatch(logout());
    }

    if (!cuenta) {
      dispatch(obtenerCuentaDetalles());
    } else {
      setUsername(cuenta.username);
      setNombre(cuenta.name);
      setIsAdmin(cuenta.is_admin);
    }
  }, [cuenta, dispatch, navigate, successActualizar]);

  const imagenInicial = JSON.parse(localStorage.getItem("imagen"));

  const manejarActualizarCuenta = (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      alert("Las contraseñas deben ser iguales");
    } else {
      const formData = new FormData();

      formData.append("username", username);
      formData.append("name", nombre);
      formData.append("is_admin", isAdmin);
      if (imagen) {
        formData.append("IMAGEN", imagen);
      }

      if (password1) {
        formData.append("password", password1);
      }

      console.log("FormData:");
      formData.forEach((value, key) => {
        console.log(key + ": " + value);
      });
      dispatch(actualizarCuenta(formData));
    }
  };

  return loading ? (
    <Principal>
      <Loader />
    </Principal>
  ) : error ? (
    <Principal>{toast.error("Error en el servidor")}</Principal>
  ) : (
    cuenta && (
      <Principal>
        <Container>
          <Row>
            <Col className="col-12 col-lg-6 d-flex justify-content-center">
              <ImgStyled
                src={`http://127.0.0.1:8000${imagenInicial}`}
                alt="Imagen de cuenta"
                width="200px"
                className="mx-auto my-auto "
              />
            </Col>
            <Col className="col-12 col-lg-6 d-flex justify-content-center align-content-center">
              <Form onSubmit={manejarActualizarCuenta}>
                <FormGroupStyled controlId="username" className="mb-3">
                  <Form.Label style={{ color: "white", fontWeight: "bold" }}>
                    NOMBRE DE USUARIO
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  ></Form.Control>
                </FormGroupStyled>

                <FormGroupStyled controlId="nombre" className="mb-3">
                  <Form.Label style={{ color: "white", fontWeight: "bold" }}>
                    NOMBRE
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  ></Form.Control>
                </FormGroupStyled>

                {/* <FormGroup controlId="isAdmin" className="mb-3">
                  <Form.Label style={{ color: "white", fontWeight: "bold" }}>
                    Permisos
                  </Form.Label>
                  <Form.Select
                    value={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.value)}
                  >
                    <option value={true}>ADMINISTRADOR</option>
                    <option value={false}>NO ES ADMINISTRADOR</option>
                  </Form.Select>
                </FormGroup> */}

                <FormGroupStyled controlId="password1" className="mb-3">
                  <Form.Label style={{ color: "white", fontWeight: "bold" }}>
                    CONTRASEÑA (OPCIONAL)
                  </Form.Label>
                  <Form.Control
                    type="password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                  ></Form.Control>
                </FormGroupStyled>

                <FormGroupStyled controlId="password2" className="mb-3">
                  <Form.Label style={{ color: "white", fontWeight: "bold" }}>
                    CONFIRMAR CONTRASEÑA (OPCIONAL)
                  </Form.Label>
                  <Form.Control
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                  ></Form.Control>
                </FormGroupStyled>

                <FormGroupStyled controlId="formImage" className="mb-5">
                  <Form.Label style={{ color: "white", fontWeight: "bold" }}>
                    IMAGEN (OPCIONAL)
                  </Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setImagen(e.target.files[0])}
                  />
                </FormGroupStyled>

                <Button type="submit" className="mb-5">
                  Actualizar Cuenta
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Principal>
    )
  );
}

export default CuentaDetalles;
