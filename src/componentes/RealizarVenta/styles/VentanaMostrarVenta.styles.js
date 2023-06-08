import { Button, Col, Row, Form } from "react-bootstrap";

import styled from "styled-components";

export const StyledRow = styled(Row)`
  width: 100%;
  display: flex;
  align-items: center;
  max-width: 120rem;
`;

export const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

export const StyledFormGroup = styled(Form.Group)`
  width: 50%;
  min-width: 200px;
  label {
    color: var(--font-color-label);
    font-weight: var(--font-weight-label);
    font-size: var(--font-size-label);
  }

  input,
  select {
    color: var(--font-color-input);
    font-weight: var(--font-weight-input);
    font-size: var(--font-size-input);
    margin-bottom: 2rem;
  }
`;

export const StyledButtonConfirmar = styled(Button)`
  position: fixed;
  bottom: 0;
  left: 0;
  margin-bottom: 15px;
  margin-left: 15px;
  background-color: rgb(20, 50, 100);
  color: white;
  font-weight: "bold";
`;

export const StyledButtonCancelar = styled(Button)`
  background-color: red;
  color: #fff;
  font-weight: bold;
`;
