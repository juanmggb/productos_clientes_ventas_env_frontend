import React from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

const StyledSpinner = styled(Spinner)`
  height: 100px;
  width: 100px;
  margin: auto;
  margin-top: 10px;
  display: block;
`;

const Loader = () => {
  return <StyledSpinner animation="border" role="status" />;
};

export default Loader;
