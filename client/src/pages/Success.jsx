import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import styled from "styled-components";
import { resetOrder } from "../redux/orderSlice";

const Success = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // reset cart
    dispatch(clearCart());
    // reset currentOrder
    dispatch(resetOrder());
  }, [dispatch]);

  return (
    <>
      <SuccessContainer>
        <SuccessMain>
          <SuccessText>Order Successfully Placed</SuccessText>
          <SuccessDescription>
            You can check your order in My Account > My Orders
          </SuccessDescription>
          <ButtonContainer>
            <StyledLink to="/">Go back home</StyledLink>
          </ButtonContainer>
        </SuccessMain>
      </SuccessContainer>
    </>
  );
};

export default Success;

const SuccessContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: white;
`;

const SuccessMain = styled.main`
  text-align: center;
`;

const SuccessText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #4f46e5;
`;

const SuccessTitle = styled.h1`
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const SuccessDescription = styled.p`
  margin-top: 24px;
  font-size: 14px;
  line-height: 1.5;
  color: #666;
`;

const ButtonContainer = styled.div`
  margin-top: 40px;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 8px 14px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background-color: #4f46e5;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #3931a6;
  }
`;
