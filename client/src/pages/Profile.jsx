import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethods";

import { md } from "../constants/Responsive";
import { accent, primary, secondary, text } from "../constants/Colors";
import styled from "styled-components";
import order from "../images/noorder.png";
import { Header } from "../constants/Header";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);

  const userId = useSelector((state) => state.auth.currentUser.user._id);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await userRequest.get(`/all-orders/${userId}`);
        setOrders(response.data);

        setLoading(false);
      } catch (error) {
        setError("Error fetching orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div>
      <h2>Profile Page</h2>
      <Header>My Orders</Header>
      <div>
        {orders.length === 0 ? (
          <NoOrdersContainer>
            <NoOrderImg src={order} alt="no order" />
          </NoOrdersContainer>
        ) : (
          orders.map((order) => (
            <div key={order._id}>
              {order.products.map((product) => (
                <>
                  <Product>
                    <ProductDetail>
                      <Image src={product.images} />
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
                        <Quantity>
                          <b>Quantity:</b> {product.quantity}
                        </Quantity>
                      </Details>
                    </ProductDetail>
                    <OrderDetail>
                      <OrderStats>
                        <b>Ordered At:</b>{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </OrderStats>
                      <OrderStats>
                        <b>Delivery Status:</b> {order.delivery_status}
                      </OrderStats>
                      <OrderStats>
                        <b>Payment Status:</b> {order.payment_status}
                      </OrderStats>
                    </OrderDetail>
                  </Product>
                </>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  ${md({ flexDirection: "column", alignItems: "center" })}
`;

const Image = styled.img`
  width: 200px;
  border-radius: 8px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: space-around;
  ${md({ flexDirection: "column", alignItems: "center" })}
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

const Quantity = styled.span`
  color: ${accent};
`;

const OrderDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
`;

const OrderStats = styled.p`
  font-size: 16px;
  font-weight: 200;
  color: ${primary};

  ${md({ marginBottom: "20px" })}
`;

const NoOrdersContainer = styled.div`
  text-align: center;
`;

const NoOrderImg = styled.img`
  width: 50%;
  height: 50%;
  mix-blend-mode: darken;
`;
