import { Table } from "react-bootstrap";
import styled from "styled-components";

// Estilos de la tabla
export const TableStyled = styled(Table)`
  margin: 0;
  tbody {
    height: 70vh;
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
