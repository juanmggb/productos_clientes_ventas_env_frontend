import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";

export const StyledNavbar = styled(Navbar)`
  height: 12vh;

  @media screen and (max-width: 1200px){
    height: auto;
    z-index: 1000;
  }
`;

export const StyledLinkContainerEmpresa = styled(LinkContainer)`
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export const StyledNavWrapper = styled(Nav.Link)`
  display: flex;
  align-items: center;
`;

export const StyledImageContainer = styled.div`
  display: flex;
  line-height: 100px;
  height: 50px;
  margin-top: 0px;
`;

export const StyledText = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: black;
  display: inline-block;
`;

export const StyledNavDropdown = styled(NavDropdown)`
  & div {
    color: ${(props) => props.bgcolor};
  }
`;
