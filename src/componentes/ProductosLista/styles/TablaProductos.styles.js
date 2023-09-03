import { Table } from "react-bootstrap";
import styled from "styled-components";

// Estilos de la tabla
export const TableStyled = styled(Table)`
  height: 100%;
  tbody {
    height: 70vh;
    width: 100vw;
    display: block;
    overflow: auto;

    -ms-overflow-style: none;
    scrollbar-width: none;
  
    &::-webkit-scrollbar{
      display: none;
    }
  }

  thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
    color: white;
  }

  th,
  td {
    text-align: center;
    vertical-align: middle;
    color: white !important;
  }
`;
