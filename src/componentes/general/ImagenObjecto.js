import React from "react";
import { StyledContainer, StyledImage } from "./styles/ImagenObjeto.styles";

const ImagenObjeto = ({ src, alt }) => {
  return (
    <StyledContainer>
      <StyledImage src={src} alt={alt} fluid />
    </StyledContainer>
  );
};

export default ImagenObjeto;
