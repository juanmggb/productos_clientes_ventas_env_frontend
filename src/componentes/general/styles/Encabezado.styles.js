import { Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";

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
  margin-top: 20px;
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
