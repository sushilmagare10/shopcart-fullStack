import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { accent, background, primary, text } from "../constants/Colors";
import { md } from "../constants/Responsive";
import { addToCart } from "../redux/cartSlice";
import { MdCurrencyRupee } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SingleProduct = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await userRequest.get("/product/" + id);
        setProduct(res.data.product);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleClick = (product) => {
    // If color or size is not selected, default to the first one in the array
    const selectedColor = color || (product.color && product.color[0]);
    const selectedSize = size || (product.size && product.size[0]);
    dispatch(
      addToCart({ ...product, size: selectedSize, color: selectedColor })
    );
  };

  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          {product.images && product.images.length > 0 ? (
            product.images.length > 1 ? (
              <StyledCarousel
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                selectedItem={true}
                dynamicHeight={true}>
                {product.images.map((image) => (
                  <Image key={image} src={image} />
                ))}
              </StyledCarousel>
            ) : (
              <Image src={product.images[0]} />
            )
          ) : (
            <Skeleton count={7} height={200} />
          )}
        </ImgContainer>

        <InfoContainer>
          <Title>{product.name || <Skeleton />}</Title>
          <Desc>{product.description || <Skeleton count={7} />}</Desc>
          <Price>
            <MdCurrencyRupee size={30} /> {product?.price || <Skeleton />}
          </Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize
                onChange={(e) => {
                  setSize(e.target.value);
                }}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <Button onClick={() => handleClick(product)}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default SingleProduct;

const Container = styled.div``;

const StyledCarousel = styled(Carousel)`
  .carousel-root {
    position: relative;
    border-radius: 8px;
  }

  .carousel-slider-wrapper {
    overflow: hidden;
    margin: auto;
    width: 100%;
    border-radius: 8px;
  }

  .carousel.carousel-slider .control-arrow {
    top: 45%;
    color: #000;
    font-size: 26px;
    bottom: 0;
    padding: 10px;
    margin-left: 10px;
    margin-right: 10px;
    background: ${background};
    height: 60px;
    width: 60px;
    border-radius: 50%;
    opacity: 0.5;
    transition: ease-in 0.3s;
    &:hover {
      background: ${primary};
      opacity: 1;
    }
  }
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;

  ${md({
    flexDirection: "column",
  })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 55vh;
  border-radius: 8px;
  border: 0.6px solid #eee;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${md({
    flexDirection: "column",
    textAlign: "center",
  })}
`;

const Title = styled.h1`
  color: ${primary};
  font-size: 36px;
  font-weight: 600;
`;

const Desc = styled.p`
  margin: 20px 0px;
  color: ${text};
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 1px solid #000;
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;

  padding: 10px;
  border-radius: 8px;
  border: 2px solid ${accent};
  background-color: #fff;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background-color: ${background};
    color: ${primary};
  }
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 8px;
  border: 2px solid ${accent};
  background-color: #fff;
  cursor: pointer;

  font-weight: 600;

  &:hover {
    background-color: ${background};
    color: ${primary};
  }
`;
