import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../constants/Button";
import styled from "styled-components";
import StyledInput from "../constants/Input";
import { md } from "../constants/Responsive";
import { useNavigate, Navigate } from "react-router-dom";
import { MakeOrder } from "../redux/orderSlice";

function CreateOrder() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const amount = useSelector((state) => state.cart.cartTotalAmount);
  const userId = useSelector((state) => state.auth.currentUser.user._id);
  const currentOrder = useSelector((state) => state.order.currentOrder);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    state: "",
    city: "",
    postalCode: "",
    name: "",
    phone: "",
  });

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    try {
      const order = {
        userId: userId,
        products: cartItems.map((item) => ({
          productId: item._id,
          name: item.name,
          images: item.images[0],
          color: item.color,
          size: item.size,
          quantity: item.cartQuantity,
        })),

        shipping: shippingInfo,
        delivery_status: "pending",
        payment_status: "pending",
        total: amount,
      };
      dispatch(MakeOrder(order));
    } catch (error) {
      console.log("Create Order Failed", error);
    } finally {
      navigate("/success", { replace: true });
    }
  };

  return (
    <>
      {!cartItems.length && <Navigate to="/" replace={true}></Navigate>}

      <CheckoutContainer>
        <h2>Checkout</h2>
        <CheckoutForm>
          <StyledInput
            checkout
            type="text"
            name="name"
            placeholder="Name"
            value={shippingInfo.name}
            onChange={handleShippingChange}
          />

          <StyledInput
            checkout
            type="text"
            name="address"
            placeholder="Address"
            value={shippingInfo.address}
            onChange={handleShippingChange}
          />
          <StyledInput
            checkout
            type="text"
            name="state"
            placeholder="State"
            value={shippingInfo.state}
            onChange={handleShippingChange}
          />
          <StyledInput
            checkout
            type="text"
            name="city"
            placeholder="City"
            value={shippingInfo.city}
            onChange={handleShippingChange}
          />
          <Container>
            <StyledInput
              checkout
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={shippingInfo.phone}
              onChange={handleShippingChange}
            />
            <StyledInput
              checkout
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={shippingInfo.postalCode}
              onChange={handleShippingChange}
            />
          </Container>
          {/* Display the list of cart items */}

          <Button continue outline onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </CheckoutForm>
      </CheckoutContainer>
    </>
  );
}

export default CreateOrder;

const CheckoutContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 42px;
  ${md({
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    width: "100%",
  })}
`;

const CheckoutForm = styled.form`
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
