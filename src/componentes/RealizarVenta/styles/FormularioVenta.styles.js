import { Button, Form } from "react-bootstrap";
import styled from "styled-components";

export const StyledForm = styled(Form)`
  width: 80%;

  @media (max-width: 768px) {
    width: 50%;
  }
`;

export const StyledFormGroup = styled(Form.Group)`
  label {
    color: var(--font-color-label);
    font-weight: var(--font-weight-label);
    font-size: 1rem;
    margin-bottom: 0;
  }

  input,
  select {
    color: var(--font-color-input);
    font-weight: var(--font-weight-input);
    font-size: 0.9rem;
    margin-bottom: 8px;
  }
`;

export const StyledBoton = styled(Button)`
  width: 100%;
  max-width: 200px;
  height: 50px;
  margin: 16px auto;
  padding: 10px;
  background-color: rgba(0, 100, 0, 0.6);
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #00a100;
    box-shadow: 0px 2px 5px 2px rgba(0, 161, 0, 0.8);
    color: black;
  }

  @media screen and (max-width: 768px) {
    min-width: 160px;
  }
`;
