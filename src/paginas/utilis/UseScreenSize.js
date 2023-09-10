import { useState, useEffect } from "react";

//Hook para leer el tamaño de la pantalla
const UseScreenSize = () => {
    const [ancho, setAncho] = useState(window.innerWidth);
    const [alto, setAlto] = useState(window.innerHeight);

    useEffect(() => {
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const handleResize = () => {
      setAncho(window.innerWidth);
      setAlto(window.innerHeight);
    }

    return {ancho, alto};
  };

export default UseScreenSize;