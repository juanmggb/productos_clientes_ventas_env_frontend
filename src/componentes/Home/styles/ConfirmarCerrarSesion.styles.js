import { Col } from "react-bootstrap";
import styled from "styled-components";

export const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
  padding: 5px;
`;

export const StyledIcono = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;
  border-radius: 50%;

  box-shadow: 1px 1px 10px 3px rgba(199, 199, 199, 0.5);

  .red {
    color: #ff0000;
  }

  .green {
    color: #67ce00;
  }
`;
