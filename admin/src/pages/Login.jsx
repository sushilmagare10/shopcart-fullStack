import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { login } from "../state/apiSlice";

const Login = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    login(dispatch, { email, password });
  };

  return (
    <Container>
      <Form>
        <Title>Welcome</Title>
        <InputContainer>
          <InputLabel>Email</InputLabel>
          <InputField
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <InputLabel>Password</InputLabel>
          <InputField
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputContainer>
        <StyledButton onClick={handleLogin} variant="contained">
          Sign Up
        </StyledButton>
      </Form>
    </Container>
  );
};

export default Login;

const Container = styled("form")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#eee",
  width: "100vw",
  overflow: "hidden",
}));

const Form = styled("form")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#fff",
  height: "600px",
  width: "600px",
  padding: "10px 40px",
  borderRadius: "8px",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
}));

const Title = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "32px",
  margin: "3rem 0 2rem 0",
}));
const InputContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
  marginBottom: "20px",
}));

const StyledButton = styled("button")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "25px",
  backgroundColor: "#fff",
  color: theme.palette.accentColor.teal,
  padding: "10px 20px",
  fontSize: "18px",
  fontWeight: "bold",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background-color 0.3s, color 0.3s",
  "&:hover": {
    backgroundColor: "#10b981",
    color: "#fff",
  },
}));

const InputLabel = styled("label")(({ theme }) => ({
  fontSize: "24px",
  fontWeight: 600,
  color: theme.palette.primary.main,
  marginBottom: "10px",
  alignSelf: "flex-start",
}));

const InputField = styled("input")(({ theme }) => ({
  background: "#fff",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  borderRadius: "8px",
  width: "100%",
  height: "3rem",
  padding: "1rem",
  border: "none",
  outline: "none",
  color: theme.palette.secondary.main,
  fontSize: "1rem",
  fontWeight: "bold",
  "&:focus": {
    display: "inline-block",
    boxShadow: "0 0 0 0.2rem #b9abe0",
    backdropFilter: "blur(12rem)",
    borderRadius: "8px",
  },
  "&::placeholder": {
    color: theme.palette.secondary.main,
    fontWeight: 100,
    fontSize: "1rem",
  },
}));
