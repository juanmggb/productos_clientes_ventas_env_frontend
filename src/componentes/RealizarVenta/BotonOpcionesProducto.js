import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const StyledButton = styled(Button)`
  background-color: ${({ bg }) => bg};
  color: #fff;
  grid-area: ${({gridArea}) => gridArea};
`;

const BotonOpcionesProducto = ({
  bg,
  children,
  producto,
  onClick,
  disabled,
  gridArea,
}) => {
  return (
    <StyledButton
      disabled={disabled}
      onClick={(e) => onClick(e, producto.id)}
      bg={bg}
      gridArea={gridArea}
    >
      {children}
    </StyledButton>
  );
};

export default BotonOpcionesProducto;
