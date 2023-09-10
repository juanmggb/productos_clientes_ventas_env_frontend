import { Button, Table } from "react-bootstrap";
import styled from "styled-components";

export const StyledButtonContainer = styled.div`
  display: flex;  
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledButton = styled(Button)`
  background-color: rgb(255, 255, 255);
  padding: 0;
  height: 35px;
  width: 35px;
  font-size: 25px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  display: flex;
  color: rgba(0, 0, 150, 0.8);
  left: 0.5vw;
`;

// Estilos de la tabla
export const TableStyled = styled(Table)`
  margin: 0;
  tbody {
    height: 50vh;
    display: block;
    overflow: auto;
  }

  thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  th,
  td {
    text-align: center;
    vertical-align: middle;
    color: white !important;

    i{
      font-size: 25px;
    }
  }
`;
