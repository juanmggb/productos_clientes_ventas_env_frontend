import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

const PaginationButton = styled.button`
  padding: 10px;
  margin: 0 5px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#007bff" : "#f0f0f0")};
  color: ${(props) => (props.selected ? "#ffffff" : "#000000")};
  border-radius: 20px;

  &:hover {
    background-color: ${(props) => (props.selected ? "#0056b3" : "#e0e0e0")};
  }

  &:disabled {
    cursor: not-allowed;
    display: none;
  }
`;

const PaginateVentas = ({ page, pages, search = "" }) => {
  const navigate = useNavigate();

  const currentPage = parseInt(page);

  let searchWithoutPage = "";
  if (search === "") {
    searchWithoutPage = "?";
  } else {
    searchWithoutPage = search.replace(/&page=\d+/g, "");
  }

  const goToPage = (p) => {
    navigate(`/ventas${searchWithoutPage}&page=${p}`);
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <Col>
          <PaginationWrapper>
            <PaginationButton
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </PaginationButton>

            {[currentPage - 1, currentPage, currentPage + 1].map((p) => (
              <PaginationButton
                key={p}
                onClick={() => goToPage(p)}
                disabled={p < 1 || p > pages}
                selected={p === currentPage}
              >
                {p}
              </PaginationButton>
            ))}

            <PaginationButton
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === pages}
            >
              Siguiente
            </PaginationButton>
          </PaginationWrapper>
        </Col>
      </Row>
    </Container>
  );
};

export default PaginateVentas;
