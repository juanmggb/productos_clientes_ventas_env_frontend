import React from "react";
import { Alert } from "react-bootstrap";

const Mensaje = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Mensaje;
