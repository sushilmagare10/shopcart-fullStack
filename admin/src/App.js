import React, { useMemo } from "react";
import { themeSetting } from "./theme";
import { Navigate, Route, Routes } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Users from "./pages/Users";
import AddProducts from "./pages/AddProducts";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import Product from "./pages/Product";
import OrdersPage from "./pages/OrdersPage";
import Statistics from "./pages/Statistics";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSetting(mode)), [mode]);

  const currentUser = useSelector((state) => state.auth.currentUser);
  const admin = currentUser?.user.role === "admin";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {!currentUser ? (
          <Route path="/*" element={<Login />} />
        ) : admin ? (
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/addproducts" element={<AddProducts />} />
            <Route path="/users" element={<Users />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/statistics" element={<Statistics />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
