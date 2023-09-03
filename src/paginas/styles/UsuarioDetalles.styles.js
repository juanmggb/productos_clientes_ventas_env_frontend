import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styled from "styled-components";

export const StyledContainer = styled(Container)`
  height: 88vh;
  padding: 1rem 0;
  overflow: auto;
  background: linear-gradient(
    rgb(54, 54, 82),
    15%,
    rgb(84, 106, 144),
    60%,
    rgb(68, 111, 151)
  );

  h1 {
    text-align: center;
    color: var(--white-color);
    margin-bottom: 1rem;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar{
    display: none;
  }
`;

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
  margin: 0 auto;
  margin-bottom: 1.2rem;
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
    margin-bottom: 1rem;
  }
`;

export const StyledBoton = styled(Button)`
  max-width: 200px;
  height: 50px;
  margin: 10px 0;
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
`;
