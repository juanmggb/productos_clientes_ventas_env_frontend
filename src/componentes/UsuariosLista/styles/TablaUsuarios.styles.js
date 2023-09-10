import { Table } from "react-bootstrap";
import styled from "styled-components";

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

  @media screen and (max-width: 400px){
    Button{
      width: 40px;
      height: 40px;
      font-size: 22px;
      margin: 0;
      padding: 0;
    }
  }

  @media screen and (max-width: 400px){
    font-size: 12px;
  }
`;
