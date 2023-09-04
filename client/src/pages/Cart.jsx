import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { MdAdd, MdRemove } from "react-icons/md";
import Button from "../constants/Button";
import { md } from "../constants/Responsive";
import { primary, text } from "../constants/Colors";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  addToCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../redux/cartSlice";
import emptyCart from "../images/cartempty.jpg";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const totalAmount = useSelector((state) => state.cart.total);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/">
            <Button continue>CONTINUE SHOPPING</Button>
          </Link>
        </Top>
        {cart.cartItems.length === 0 ? (
          <EmptyCartMessage>
            <EmptyCartImage src={emptyCart} alt="emptycart" />
          </EmptyCartMessage>
        ) : (
          <Bottom>
            <Info>
              {cart.cartItems &&
                cart.cartItems.map((product) => (
                  <Product>
                    <ProductDetail>
                      <Image src={product.images[0]} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {product.name}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {product._id}
                        </ProductId>
                        <ProductColor color={product.color} />
                        <ProductSize>
                          <b>Size:</b> {product.size}
                        </ProductSize>
                      </Details>
                    </ProductDetail>

                    <PriceDetail>
                      <ProductAmountContainer>
                        <MdAdd onClick={() => handleAddToCart(product)} />
                        <ProductAmount>{product.cartQuantity}</ProductAmount>
                        <MdRemove onClick={() => handleDecreaseCart(product)} />
                      </ProductAmountContainer>

                      <ProductPrice>
                        $ {product.price * product.cartQuantity}
                      </ProductPrice>
                    </PriceDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <Button
                          remove
                          onClick={() => handleRemoveFromCart(product)}>
                          Remove Product
                        </Button>
                      </ProductAmountContainer>
                    </PriceDetail>
                  </Product>
                ))}
              <Hr />
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {totalAmount}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ 5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>$ -5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {cart.cartTotalAmount}</SummaryItemPrice>
              </SummaryItem>
              <Link to="/make-order">
                <Button continue outline>
                  checkout
                </Button>
              </Link>
            </Summary>
          </Bottom>
        )}
      </Wrapper>
    </Container>
  );
};

export default Cart;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${md({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  border: 0.5px solid #000;
  padding: 10px;
  border-radius: 8px;
  margin-right: 10px;
  margin-bottom: 10px;
  ${md({
    flexDirection: "column",
    alignItems: "center",
  })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${md({ flexDirection: "column", alignItems: "center" })}
`;

const Image = styled.img`
  width: 200px;
  border-radius: 8px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${md({ gap: "10px" })}
`;

const ProductName = styled.span`
  color: ${primary};
`;

const ProductId = styled.span`
  color: ${text};
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 0.5px solid #000;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span`
  color: ${text};
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  justify-content: center;
  ${md({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;

  ${md({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  position: sticky;
  border: 0.5px solid #000;
  border-radius: 8px;
  padding: 20px;
  height: 40vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span`
  color: ${text};
`;

const SummaryItemPrice = styled.span`
  color: ${text};
`;

const EmptyCartMessage = styled.div`
  text-align: center;
`;

const EmptyCartImage = styled.img`
  width: 100%;
  height: 100vh;
  mix-blend-mode: multiply;
`;
