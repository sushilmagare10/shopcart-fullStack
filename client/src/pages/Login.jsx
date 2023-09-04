import React, { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import StyledInput from "../constants/Input";
import { StyledLink } from "../constants/Link";
import Button, { ClickButton } from "../constants/Button";
import { Navigate, useNavigate } from "react-router-dom";
import { accent, primary } from "../constants/Colors";

const Login = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(dispatch, { email, password });
  };
  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <Container>
        <Form>
          <Title>Welcome Back</Title>
          <InputContainer>
            <Label>Email</Label>
            <StyledInput
              login
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Label>Password</Label>
            <StyledInput
              login
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputContainer>

          <Button Sign type="submit" onClick={handleLogin}>
            Login
          </Button>
          <Bottom>
            <p> Dont have an account then, </p>
            <StyledLink to="/signup">Sign up</StyledLink>
          </Bottom>
        </Form>
      </Container>
    </>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #eee;
  width: 100%;
  overflow: hidden;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  font-size: 18px;
  p {
    font-size: 20px;
    color: #808080;
    margin-right: 8px;
  }
`;
const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: ${primary};
  margin-bottom: 50px;
  line-height: 8px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  height: 600px;
  width: 600px;
  padding: 10px 40px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
`;
const Label = styled.label`
  font-size: 24px;
  font-weight: 600;
  color: ${accent};
  margin-bottom: 10px;
  align-self: flex-start;
`;
