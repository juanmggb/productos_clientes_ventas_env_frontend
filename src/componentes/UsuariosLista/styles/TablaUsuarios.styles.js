import { Table } from "react-bootstrap";
import styled from "styled-components";

export const TableStyled = styled(Table)`
  height: 100%;
  tbody {
    height: 75vh;
    display: block;
    overflow: auto;
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
