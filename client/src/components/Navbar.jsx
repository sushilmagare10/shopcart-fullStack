import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { accent, primary } from "../constants/Colors";

const Navbar = () => {
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const [extendNavbar, setExtendNavbar] = useState(false);
  const handleLinkClick = () => {
    setExtendNavbar(false);
  };

  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Logo>ShopCart</Logo>
          </Link>
        </LeftContainer>
        <RightContainer>
          <NavbarLinkContainer>
            <NavbarLink to="/"> Home</NavbarLink>
            <NavbarLink to="/categories">Categories</NavbarLink>
            <NavbarLink to="/cart">Cart {cartTotalQuantity}</NavbarLink>
            <NavbarLink to="/orders">Orders</NavbarLink>
            <NavbarLink to="/logout">Logout</NavbarLink>

            <OpenLinksButton
              onClick={() => {
                setExtendNavbar((curr) => !curr);
              }}>
              {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
            </OpenLinksButton>
          </NavbarLinkContainer>
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer onClick={handleLinkClick}>
          <NavbarLinkExtended to="/">Home</NavbarLinkExtended>
          <NavbarLinkExtended to="/categories">Categories</NavbarLinkExtended>
          <NavbarLinkExtended to="/cart">
            Cart {cartTotalQuantity}
          </NavbarLinkExtended>
          <NavbarLinkExtended to="/orders">Orders</NavbarLinkExtended>
          <NavbarLinkExtended to="/logout">Logout</NavbarLinkExtended>
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
};

export default Navbar;

const slideInAnimation = keyframes`
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  `;

const hoverAnimation = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-2px);
  }
`;

const NavbarContainer = styled.nav`
  width: 100%;
  height: ${(props) => (props.extendNavbar ? "100vh" : "80px")};
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  @media (min-width: 960px) {
    height: 80px;
  }
  ${(props) =>
    props.extendNavbar &&
    css`
      animation: ${slideInAnimation} 0.3s ease-in-out forwards;
    `}
`;

const LeftContainer = styled.div`
  flex: 50%;
  display: flex;
  align-items: center;
  padding-left: 5%;
`;

const RightContainer = styled.div`
  flex: 50%;
  display: flex;
  justify-content: flex-end;
  padding-right: 50px;
`;

const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavbarLinkContainer = styled.div`
  display: flex;
`;

const NavbarLink = styled(Link)`
  color: ${primary};
  font-size: 20px;
  text-decoration: none;
  margin: 10px;
  @media (max-width: 960px) {
    display: none;
  }
  &:hover {
    color: ${accent}; /* Change color on hover */
    animation: ${hoverAnimation} 0.3s ease-in-out; /* Apply animation on hover */
  }
`;

const NavbarLinkExtended = styled(Link)`
  color: ${primary};
  font-size: 20px;
  text-decoration: none;
  margin: 20px;
  transition: color 0.2s ease-in-out, transform 0.2s ease-in-out;
  &:hover {
    color: ${accent}; /* Change color on hover */
    animation: ${hoverAnimation} 0.3s ease-in-out; /* Apply animation on hover */
  }
`;

const Logo = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${accent};
`;

const OpenLinksButton = styled.button`
  width: 70px;
  height: 50px;
  background: none;
  border: none;
  color: ${accent};
  font-size: 45px;
  cursor: pointer;
  @media (min-width: 960px) {
    display: none;
  }
`;

const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 960px) {
    display: none;
  }
  animation: ${slideInAnimation} 0.3s ease-in-out forwards;
  /* Delay the animation to create a stacking effect */
  animation-delay: 0.15s;
`;
