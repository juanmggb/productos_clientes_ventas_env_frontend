import { Image } from "react-bootstrap";
import styled from "styled-components";

export const StyledContainer = styled.div`
  height: 100px;
`;

export const StyledImage = styled(Image)`
  border-radius: 10px;
  overflow: hidden;
  object-fit: cover;
  height: 100%;
  width: 100px;
`;
