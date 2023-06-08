import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const StyledButton = styled(Button)`
  background-color: ${({ bg }) => bg};
  color: #fff;
`;

const BotonOpcionesProducto = ({
  bg,
  children,
  producto,
  onClick,
  disabled,
}) => {
  return (
    <StyledButton
      disabled={disabled}
      onClick={(e) => onClick(e, producto.id)}
      bg={bg}
    >
      {children}
    </StyledButton>
  );
};

export default BotonOpcionesProducto;
