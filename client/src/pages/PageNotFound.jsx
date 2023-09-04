import React from "react";
import styled, { keyframes } from "styled-components";
import { accent, primary } from "../constants/Colors";

const PageNotFound = () => {
  return (
    <Container>
      <Title>404 - Page Not Found</Title>
      <Description>
        Oops! Looks like you've ventured into the unknown.
      </Description>
      <AnimatedTextContainer>
        <AnimatedText primaryColor={primary} accentColor={accent}>
          4
        </AnimatedText>
        <AnimatedText primaryColor={primary} accentColor={accent}>
          0
        </AnimatedText>
        <AnimatedText primaryColor={primary} accentColor={accent}>
          4
        </AnimatedText>
      </AnimatedTextContainer>
    </Container>
  );
};

export default PageNotFound;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const floatUp = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  25%{
     transform: scale(1.05);
  }
  50% {
    transform: scale(1.1);
  }
  75%{
     transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  animation: ${fadeIn} 1s ease-in-out;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 16px;
  color: ${primary};
`;

const Description = styled.p`
  font-size: 20px;
  text-align: center;
  margin-bottom: 24px;
  color: #333;
`;

const AnimatedTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
`;

const AnimatedText = styled.div`
  font-size: 48px;
  font-weight: bold;
  margin: 0 8px;
  animation: ${floatUp} 1s ease-in-out, ${pulse} 2s infinite;
  color: ${(props) => (props.primaryColor ? props.primaryColor : "#333")};
  text-shadow: 2px 2px 4px
    ${(props) => (props.accentColor ? props.accentColor : "#333")};
`;
