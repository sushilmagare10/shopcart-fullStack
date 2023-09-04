import React from "react";
import styled from "styled-components";
import { accent, background, primary, secondary } from "../constants/Colors";
import { md } from "../constants/Responsive";

const Footer = () => {
  return (
    <Container>
      <FooterLogo>
        <Header>ShopCart</Header>
      </FooterLogo>
      <Wrapper>
        <FooterNav>
          <FooterNavLink href="/">Home</FooterNavLink>
          <FooterNavLink href="/categories">Categories</FooterNavLink>
          <FooterNavLink href="/account">Account</FooterNavLink>
        </FooterNav>
        <FooterSocial>
          <FooterSocialLink
            href="https://www.facebook.com/yourcompany"
            target="_blank"
            rel="noopener noreferrer">
            Facebook
          </FooterSocialLink>
          <FooterSocialLink
            href="https://twitter.com/yourcompany"
            target="_blank"
            rel="noopener noreferrer">
            Twitter
          </FooterSocialLink>
          <FooterSocialLink
            href="https://www.linkedin.com/company/yourcompany"
            target="_blank"
            rel="noopener noreferrer">
            LinkedIn
          </FooterSocialLink>
        </FooterSocial>
      </Wrapper>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  color: ${primary};
  padding: 20px 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 150px;
  gap: 30px;
  ${md({
    flexDirection: "column",
    height: "0",
  })}
`;

const Wrapper = styled.div`
  display: flex;
  flex: 60%;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const FooterLogo = styled.div`
  flex: 40%;
`;

const Header = styled.h1`
  font-size: 3.2rem;
  color: ${accent};
  font-weight: 700;
`;

const FooterNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
`;

const FooterNavLink = styled.a`
  color: ${primary};
  font-size: 24px;
  margin: 0 10px;
  font-size: 18px;
  text-decoration: none;
`;

const FooterSocial = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
`;

const FooterSocialLink = styled.a`
  color: ${primary};
  margin-left: 10px;
  font-size: 18px;
  text-decoration: none;
`;
