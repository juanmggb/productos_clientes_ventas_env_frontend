import React from "react";
import { Alert } from "react-bootstrap";
import styled from "styled-components";

const StyledAlert = styled(Alert)`
  line-height: 100px;
  margin-top: 100px;
  color: #fff;
  font-size: 40px;
`;

const Mensaje = ({ variant, children }) => {
  return <StyledAlert variant={variant}>{children}</StyledAlert>;
};

export default Mensaje;
