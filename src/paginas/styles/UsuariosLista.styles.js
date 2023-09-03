import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

export const StyledContainer = styled(Container)`
  height: 88vh;
  padding: 0.8rem 0;
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
    margin-bottom: 0.8rem;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar{
    display: none;
  }
`;

export const StyledRow = styled(Row)`
  height: 88%;
  width: 100%;
  display: flex;
  align-items: center;
  max-width: 120rem;
`;

export const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  height: 100%;
`;
