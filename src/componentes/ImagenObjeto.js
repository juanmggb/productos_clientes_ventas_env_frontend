import React from 'react';
import { Image } from 'react-bootstrap';

const ImagenProducto = ({ src, alt }) => {
  return (
    <Image width={'100px'} src={src} alt={alt} fluid />
  );
};

export default ImagenProducto;