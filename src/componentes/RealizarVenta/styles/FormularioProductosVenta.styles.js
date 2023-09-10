import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

// Layout
export const StyledContainer = styled(Container)`
  height: 100%;
  padding: 2rem 0;
  background: linear-gradient(
    rgb(54, 54, 82),
    15%,
    rgb(84, 106, 144),
    60%,
    rgb(68, 111, 151)
  );

  h1 {
    text-align: center;
    color: var(--white-color);
    margin-bottom: 3rem;
  }
`;

export const StyledRow = styled(Row)`
  height: 80%;
  width: 100%;
  display: flex;
  align-items: center;
  max-width: 120rem;
`;

export const StyledCol = styled(Col)`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const StyledProductoContenedor = styled.div`
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.5);
  height: 160px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  /* justify-content: center; */
  background-color: rgba(250, 250, 250, 0.3);
  border-radius: 10px;
`;

export const StyledProductoInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  justify-content: center;
  margin-left: 20px;
  width: 200px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 5px;
  }

  span {
    color: #fff;
  }

  @media screen and (max-width: 1000px){
    width: 115px;
    margin-left: 8px;
  }
`;

export const StyledOptionsContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 880px){
    width: 100%;
    display: grid;
    grid-template-columns: 0.5fr 1fr 0.5fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: "Vacio1 Seleccionador Vacio2"
                         "Botones Botones Botones";
    
    @media screen and (max-width: 769px){
      display: flex;

      @media screen and (max-width: 551px){
        display: grid;

        @media screen and (max-width: 450px){
          grid-template-columns: 0.2fr 1fr 0.2fr;
        }
      }
    }
  }
`;

export const StyledSeleccionadorCantidad = styled.div`
  padding: 10px;
  margin-left: 40px;
  width: 100%;

  @media screen and (max-width: 1000px){
    margin-left: 0px;
    margin-top: 7px;
    padding: 0px;
    max-width: 200px;
    grid-area: Seleccionador;
  }
`;

export const StyledButtonsContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-template-areas: "Confirmar Modificar Eliminar";
  grid-gap: 20px;
  justify-content: space-around;
  margin-left: 15px;
  align-items: center;
  padding: 10px;
  Button {
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media screen and (max-width: 1080px) {
    Button {
      width: 70px;
      font-size: 0.8rem;
    }
    margin-left: 10px;
    grid-area: Botones;

    @media screen and (max-width: 1000px){
      Button{
        font-size: 1.4rem;
      }

      @media screen and (max-width: 430px){
        Button{
          font-size: 1rem;
          width: 50px;
        }
        margin-top: 5px;
      }
      @media screen and (max-width: 360px){
        Button{
          font-size: 0.8rem;
          width: 40px;
        }
        grid-gap: 5px;
        margin-left: 0px;
      }
    }
  }
`;
