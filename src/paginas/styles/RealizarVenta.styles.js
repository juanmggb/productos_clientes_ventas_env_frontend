import { Button, Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

export const StyledGridContainer = styled.div`
  position: fixed;
  background: linear-gradient(
    rgb(54, 54, 82),
    15%,
    rgb(84, 106, 144),
    60%,
    rgb(68, 111, 151)
  );

  height: 88vh;
  width: 100%;
  padding: 0px 10px;
  overflow: auto;

  display: grid;
  grid-gap: 10px;
  grid-template-columns: 3fr 8fr;
  grid-template-rows: 1fr 8fr;
  grid-template-areas:
    "PanelControl Titulo"
    "PanelControl ContenidoPrincipal";

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 8fr;
    grid-template-areas:
      "Titulo"
      "ContenidoPrincipal";
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar{
    display: none;
  }
`;

export const StyledPanelControl = styled.div`
  grid-area: PanelControl;
  position: relative;
  padding: 0.15rem 0.5rem;
  /* padding-top: 1rem; */
  width: 100%;
  height: 90%;
  min-width: 300px;

  /* layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    margin: 0;
    padding-top: 5px;
    display: flex;
    overflow: auto;

    position: fixed;
    left: ${props => props.mostrarPanel ? '0':'-100vw'};
    z-index: 2;
    height: 90%;
    background: linear-gradient(
      rgba(54, 54, 82,0.95),
      15%,
      rgba(84, 106, 144,0.95),
      60%,
      rgba(68, 111, 151,0.95)
    );
    transform: ${props => props.state ? 'rotate(180deg)': 'rotate(0)'};
    transition: 0.5s ease all;
  }
`;

export const StyledBoton = styled(Button)`
  /* width: 100%; */
  max-width: 200px;
  height: 50px;
  margin: 10px 0;
  padding: 10px;
  background-color: rgba(0, 100, 0, 0.6);
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #00a100;
    box-shadow: 0px 2px 5px 2px rgba(0, 161, 0, 0.8);
    color: black;
  }

  @media screen and (max-width: 768px) {
    min-width: 160px;
  }
`;

export const StyledBotonPanel = styled(Button)`
  display: none;
  position: fixed;
  top: 11vh;
  right: 5px;
  z-index: 3;
  width: 20px;

  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
  }

  i{
    transform: ${props => props.state ? 'rotate(180deg)': 'rotate(0)'};
    transition: 0.5s ease all;
  }
`;

export const StyledContenidoPrincipal = styled.div`
  width: 100%;
  height: 100%;
  grid-area: ContenidoPrincipal;
  overflow: auto;
  padding: 1rem 0;
  padding-top: 0;
  position: absolute;

  &::-webkit-scrollbar{
    -webkit-appearance: none;
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(250,250,250,20);
    border-radius: 20px;
  }

  /* &::-webkit-scrollbar {
    display: none;
  } */
`;

export const StyledTitulo = styled.h1`
  grid-area: Titulo;
  text-align: center;
  color: white;
  margin-top: 1rem;
`;

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
  margin-bottom: 1rem;
`;
