import { Button, Table } from "react-bootstrap";
import styled from "styled-components";

export const StyledButton = styled(Button)`
  background-color: rgb(255, 255, 255);
  padding: 0;
  font-size: 30px;
  display: flex;
  color: rgba(0, 0, 150, 0.8);
  margin-left: ${(props) => (props.shouldshow === "true" ? "50px" : "40px")};
  margin-left: 50px;
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
    color: white;
  }
`;
