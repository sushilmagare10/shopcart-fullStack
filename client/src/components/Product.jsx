import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../constants/Button";
import { background, primary } from "../constants/Colors";
import { MdCurrencyRupee } from "react-icons/md";

const Product = ({ item }) => {
  return (
    <Container>
      {item && item.images && <Image src={item.images[0]} alt={item.name} />}
      <Price>
        <MdCurrencyRupee style={{ fontSize: "18px", fontWeight: "700" }} />
        {item?.price}
      </Price>
      <Info>
        <Title>{item?.name}</Title>

        <HoverContanier>
          <Link to={`/product/${item._id}`}>
            <Button More>Show More</Button>
          </Link>
        </HoverContanier>
      </Info>
    </Container>
  );
};

export default Product;

const Info = styled.div`
  opacity: 0;
  width: 90%;
  height: 130px;
  position: absolute;
  border-radius: 8px;
  top: 190px;
  text-align: center;
  background-color: rgba(232, 244, 252, 0.9);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 10px 10px;
  border-radius: 8px;
  min-width: 270px;
  height: 330px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const HoverContanier = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 0 5px;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  z-index: 2;
  border-radius: 8px;
  object-fit: contain;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-top: 20px;
  line-height: 1.2;
  color: ${primary};
`;

const Price = styled.h1`
  font-size: 15px;
  background-color: ${background};
  border: 1px solid ${primary};
  border-radius: 8px;
  font-weight: 600;
  color: ${primary};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  top: 10px;
  left: 20px;
  z-index: 3;
  position: absolute;
`;
