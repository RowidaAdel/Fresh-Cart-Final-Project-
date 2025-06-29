import Home from "./pages/Home/Home";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router";
import Login from "./pages/Authentication/Login/Login";
import Register from "./pages/Authentication/Register/Register";
import Layout from "./components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import Forget from "./pages/Authentication/Forget/Forget";
import Verify from "./pages/Authentication/Verify/Verify";
import ResetPassword from "./pages/Authentication/ResetPassword/ResetPassword";
import AuthContextProvider from "./Context/authContext";
import ProtectedRoutes from "./Protected/ProtectedRoutes";
import LoginProtected from "./Protected/LoginProtected";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Authentication/Profile/Profile";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Washlist from "./pages/Washlist/Washlist";
import Products from "./pages/Products/Products";
import CartContextProvider from "./Context/CartContext";
import WashListContextProvider from "./Context/washListContext";
import Notfound from "./pages/Error/NotFoundPage";
import AllOrders from "./pages/AllOrders/AllOrders";
import Categories from "./pages/Categories/Categories";
import Brands from "./pages/Brands/Brands";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Checkout from "./components/Checkout/Checkout";

const routes = createBrowserRouter([
  {
    path: '/', element: <Layout />, children: [
      {
        index: true,
        element: <Navigate to="/login" />
      }, {
        path: '*', element: <Notfound />
      },
      {
        path: '/home', element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        )
      },
      {
        path: '/cart', element: (
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        )
      },
      {
        path: '/products', element: (
          <ProtectedRoutes>
            <Products />
          </ProtectedRoutes>
        )
      },
      {
        path: '/productdetails/:id', element: (
          <ProtectedRoutes>
            <ProductDetails />
          </ProtectedRoutes>
        )
      },
      {
        path: '/washlist', element: (
          <ProtectedRoutes>
            <Washlist />
          </ProtectedRoutes>
        )
      },
      {
        path: '/checkout', element: (
          <ProtectedRoutes>
            <Checkout/>
          </ProtectedRoutes>
        )
      },
      {
        path: '/allorders', element: (
          <ProtectedRoutes>
            <AllOrders />
          </ProtectedRoutes>
        )
      },
      {
        path: '/categories', element: (
          <ProtectedRoutes>
            <Categories />
          </ProtectedRoutes>
        )
      },
      {
        path: '/brands', element: (
          <ProtectedRoutes>
            <Brands />
          </ProtectedRoutes>
        )
      },
      {
        path: '/profile', element: (
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        )
      },
      {
        path: '/login', element: (
          <LoginProtected>
            <Login />
          </LoginProtected>
        )
      },
      {
        path: '/register', element: (
          <LoginProtected>
            <Register />
          </LoginProtected>
        )
      },
      { path: '/forget', element: <Forget /> },
      { path: '/verify', element: <Verify /> },
      { path: '/resetpassword', element: <ResetPassword /> },
    ]
  },
])
const client = new QueryClient();
export default function App() {

  return (
    <>
      <QueryClientProvider client={client}>
        <WashListContextProvider>
          <AuthContextProvider>
            <CartContextProvider>
              <RouterProvider router={routes} />
              <Toaster position="top-right" />
            </CartContextProvider>
          </AuthContextProvider>
        </WashListContextProvider>
      </QueryClientProvider>
    </>
  )
}

