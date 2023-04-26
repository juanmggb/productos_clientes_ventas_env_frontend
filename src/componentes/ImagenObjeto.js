import React from "react";
import { Image } from "react-bootstrap";

const ImagenProducto = ({ src, alt }) => {
  return (
    <Image
      width={"100px"}
      src={src}
      alt={alt}
      fluid
      style={{ borderRadius: "10px" }}
    />
  );
};

export default ImagenProducto;
