import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { accent, primary } from "../constants/Colors";

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <SLink to={`/products/${item.cat}`}>
        <Wrapper>
          {item.icon}

          <Title>{item.title}</Title>
        </Wrapper>
      </SLink>
    </Container>
  );
};

export default CategoryItem;

const Container = styled.div`
  flex: 1;
  margin: 0 5px;
  padding: 10px;
  height: 250px;
  border-radius: 8px;
  transition: transform 0.3s ease;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 6px, rgba(0, 0, 0, 0.2) 0px 3px 6px;
  &:hover {
    transform: scale(1.03);
  }
`;

const Title = styled.h1`
  font-size: 28px;
  color: ${primary};
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
`;

const SLink = styled(Link)`
  text-decoration: none;
`;

const Wrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  color: ${accent}; /* Set the icon's color to primary */
`;
