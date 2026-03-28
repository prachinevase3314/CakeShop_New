import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import AdminLayout from "./components/layout/AdminLayout";
import Home from "./pages/home";
import About from "./pages/about";
import Login from "./pages/login";
import Register from "./pages/register";
import ResetPassword from "./pages/resetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Products from "./pages/admin/Products";
import Category from "./pages/admin/Category";
import Orders from "./pages/admin/Orders";
import Shop from "./pages/shop";
import Cart from "./pages/cart";
import ContactUs from "./pages/contactUs";
import Profile from "./pages/profile";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ), // Persistent UI like Navbar/Footer
    children: [
      {
        index: true, // This is the default sub-route for "/"
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "contactUs",
        element: <ContactUs />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "categories",
        element: <Category />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
]);
