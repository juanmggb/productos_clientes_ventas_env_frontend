import { Form } from "react-bootstrap";
import styled from "styled-components";

export const StyledFormGroup = styled(Form.Group)`
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

export const StyledFormControlContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  input,
  select {
    width: 40%;
  }
`;
