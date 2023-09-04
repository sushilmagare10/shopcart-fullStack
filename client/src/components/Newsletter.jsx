import React, { useState } from "react";
import styled from "styled-components";
import { accent, background, secondary } from "../constants/Colors";
import StyledInput from "../constants/Input";
import Button from "../constants/Button";

const NewsletterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${background};

  text-align: center;
  margin: 25px 0;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
  padding: 50px;
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 100%;
`;

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the newsletter subscription here
    console.log("Subscribed with email:", email);
    // Clear the input field after submission
    setEmail("");
  };

  return (
    <NewsletterContainer>
      <h2>Subscribe to our Newsletter</h2>
      <NewsletterForm onSubmit={handleSubmit}>
        <StyledInput
          letter
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <Button News>Subscribe</Button>
      </NewsletterForm>
    </NewsletterContainer>
  );
};

export default Newsletter;
