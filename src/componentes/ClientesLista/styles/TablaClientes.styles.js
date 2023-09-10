import { Table } from "react-bootstrap";
import styled from "styled-components";

// Estilos de la tabla
export const TableStyled = styled(Table)`
  margin: 0;
  tbody {
    height: 50vh;
    display: block;
    width:100%;
    overflow: auto;

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
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
  }

  @media screen and (max-width: 768px){
    Button{
      width: 40px;
      height: 40px;
      font-size: 22px;
      margin: 0;
      padding: 0;
    }
  }
`;
