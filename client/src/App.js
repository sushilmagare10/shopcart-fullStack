import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./Layout/layout";
import HomePage from "./pages/HomePage";
import Register from "./pages/Resgister";
import ProductsList from "./pages/ProductList";
import Categories from "./components/Categories";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import ProfilePage from "./pages/Profile";
import CreateOrder from "./pages/CreateOrder";
import PageNotFound from "./pages/PageNotFound";
import Protected from "./components/ProtectedRoute";
import Logout from "./components/Logout";

const router = createBrowserRouter([
  {
    // parent route component
    element: <Layout />,

    errorElement: <PageNotFound />,
    // child route components

    children: [
      {
        path: "/",
        element: (
          <Protected>
            <HomePage></HomePage>
          </Protected>
        ),
      },
      {
        path: "/products/:category",
        element: (
          <Protected>
            <ProductsList></ProductsList>
          </Protected>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <Protected>
            <SingleProduct></SingleProduct>
          </Protected>
        ),
      },
      {
        path: "/categories",
        element: (
          <Protected>
            <Categories></Categories>
          </Protected>
        ),
      },
      {
        path: "/cart",
        element: (
          <Protected>
            <Cart></Cart>
          </Protected>
        ),
      },
      {
        path: "/orders",
        element: (
          <Protected>
            <ProfilePage></ProfilePage>
          </Protected>
        ),
      },
      {
        path: "/make-order",
        element: (
          <Protected>
            <CreateOrder></CreateOrder>
          </Protected>
        ),
      },
      {
        path: "/success",
        element: (
          <Protected>
            <Success></Success>
          </Protected>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);

function App() {
  return <>{<RouterProvider router={router} />}</>;
}

export default App;
