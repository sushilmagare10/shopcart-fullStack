import Banner from "../components/Banner";
import { Header } from "../constants/Header";
import Product from "../components/Product";
import { useEffect, useState } from "react"; // Import useState
import { userRequest } from "../requestMethods";
import styled from "styled-components";
import { md } from "../constants/Responsive";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getNewProducts = async () => {
      try {
        const res = await userRequest.get("/products?new=true");

        setProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching new products:", err);
      }
    };
    getNewProducts();
  }, []);
  console.log(products);
  return (
    <>
      <Banner />
      <Header>New Products</Header>
      <Wrapper>
        {products.map((item) => (
          <Product item={item} key={item.id} />
        ))}
      </Wrapper>
    </>
  );
};

export default HomePage;

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
