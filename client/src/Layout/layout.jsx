// Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { background } from "../constants/Colors";
import Newsletter from "../components/Newsletter";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1480px;
  font-family: "Poppins", sans-serif;
  margin: 0 auto;
  padding: 5px 10px;
  background-color: ${background};
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
`;

const Layout = () => {
  return (
    <LayoutContainer>
      <ContentWrapper>
        <Navbar />
        <Outlet />
        <Newsletter />
        <Footer />
      </ContentWrapper>
    </LayoutContainer>
  );
};

export default Layout;
