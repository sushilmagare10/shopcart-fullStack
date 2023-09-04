import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { userRequest } from "../requestMethods";
import Button from "../constants/Button";
import { Link } from "react-router-dom";
import { background, primary, text } from "../constants/Colors";
import { md } from "../constants/Responsive";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { MdCurrencyRupee } from "react-icons/md";

const Banner = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [randomProduct, setRandomProduct] = useState(null);

  const dispatch = useDispatch();

  const getProducts = async () => {
    try {
      const res = await userRequest.get("/products");
      setProducts(res.data.products);
      console.log(products);
      setLoading(false);
      console.log(res.data);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      // Generate a random index within the bounds of the products array
      const randomIndex = Math.floor(Math.random() * products.length);
      setRandomProduct(products[randomIndex]);
    }
  }, [products]);

  return (
    <Bg>
      <Container>
        <Column>
          <ImageContainer>
            {randomProduct && randomProduct.images && (
              <Image src={randomProduct.images[0]} alt={randomProduct.name} />
            )}
          </ImageContainer>
        </Column>
        <Column>
          {randomProduct ? (
            <>
              <Title>{randomProduct.name}</Title>
              <Desc>{randomProduct.description.slice(0, 150) + "..."}</Desc>
            </>
          ) : loading ? (
            <>Loading...</>
          ) : (
            <>Error loading products.</>
          )}

          <ButtonsWrapper>
            <Link to={`/product/${randomProduct?._id}`}>
              <Button Add>Read More</Button>
            </Link>
            <Button Add outline>
              <MdCurrencyRupee size={20} />
              {randomProduct?.price}
            </Button>
          </ButtonsWrapper>
        </Column>
      </Container>
    </Bg>
  );
};

export default Banner;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 14px;
  gap: 20px;
  align-items: center;
  justify-content: center;

  ${md({ flexDirection: "column", gap: "10px" })}
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  max-width: 100%;

  ${md({ maxWidth: "100%" })}
`;

const Bg = styled.div`
  background-color: ${background};
  padding: 0 10px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: ${primary};
  margin-bottom: 50px;
  line-height: 1.2;
  ${md({ fontSize: "30px", marginBottom: "30px" })};
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 45px;
  ${md({ marginBottom: "10px" })}
`;

const ImageContainer = styled.div`
  overflow: hidden;
`;

const Image = styled.img`
  width: 350px;
  height: 350px;
  border-radius: 8px;
  transition: transform 0.4s ease-in;
  mix-blend-mode: multiply;

  ${ImageContainer}:hover & {
    transform: scale(1.02);
  }

  ${md({ width: "100%" })}
`;

const Desc = styled.p`
  color: ${text};
  font-size: 1.3rem;
`;
