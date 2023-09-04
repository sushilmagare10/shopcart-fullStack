import React from "react";
import styled from "styled-components";
import { md } from "../constants/Responsive";
import CategoryItem from "./CategoryItem";

import { MdOutlineComputer, MdSmartphone, MdBackpack } from "react-icons/md";
import { IoShirtSharp } from "react-icons/io5";
import { GiTrousers, GiRunningShoe } from "react-icons/gi";
import { BsSmartwatch } from "react-icons/bs";
import { BiHeadphone } from "react-icons/bi";
import { Header } from "../constants/Header";

const Categories = () => {
  const categories = [
    {
      id: 1,
      icon: <MdOutlineComputer size={80} />,
      title: "LAPTOP",
      cat: "laptop",
    },
    {
      id: 2,
      icon: <MdSmartphone size={80} />,
      title: "SMARTPHONE",
      cat: "smartphone",
    },
    {
      id: 3,
      icon: <IoShirtSharp size={80} />,
      title: "SHIRTS",
      cat: "shirts",
    },
    {
      id: 4,
      icon: <GiTrousers size={80} />,
      title: "Jeans",
      cat: "jeans",
    },
    {
      id: 5,
      icon: <MdBackpack size={80} />,
      title: "BackPacks",
      cat: "backpacks",
    },
    {
      id: 6,
      icon: <BsSmartwatch size={80} />,
      title: "Smart Watch",
      cat: "smartwatch",
    },
    {
      id: 7,
      icon: <GiRunningShoe size={80} />,
      title: "Foot Wears",
      cat: "footwear",
    },
    {
      id: 8,
      icon: <BiHeadphone size={80} />,
      title: "Headphones",
      cat: "headphone",
    },
  ];

  return (
    <Container>
      <Header>Categories</Header>
      <Wrapper>
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Wrapper>
    </Container>
  );
};

export default Categories;

const Container = styled.div`
  margin: 10px;
  ${md({
    margin: "20px",
  })}
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-column-gap: 10px;
  grid-row-gap: 10px;

  ${md({
    gridTemplateColumns: "repeat(1, 1fr)",
    gridColumnGap: "20px",
    gridRowGap: "20px",
  })}
`;
