import React from "react";
import Footer from "./components/Footer";
import Home from "./pages/main/Home";
import Header from "./components/Header";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import Layout from "./layouts/Layout";
import Brands from "./pages/main/Brands";
import Login from "./pages/Authentication/Login";
import Cart from "./pages/Cart/Cart";
import Products from "./pages/main/Products";
import Categories from "./pages/main/Categories";
import Register from "./pages/Authentication/Register";
import ForgetPassword from "./pages/Authentication/ForgetPassword";
import ChangeMyPassword from "./pages/Authentication/ChangePassword";
import ResetPassword from "./pages/Authentication/ResetPassword";
import VerifyResetCode from "./pages/Authentication/VerifyResetCode";
import CreateContextProvider from "./context/AuthContext";
import ProtectedRoute from "./layouts/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./pages/main/ProductDetails";
import CartContextProvider from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import Payment from "./pages/Cart/Payment";
import AllOrders from "./pages/Cart/AllOrders";
import { Offline } from "react-detect-offline";
import OfflineMessage from "./components/OfflineMessage";
import Dashboard from "./pages/main/Dashbord";
import Profile from "./pages/main/Profile";
import Wishlist from "./pages/Cart/Wishlist";
import { useState, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import ApiErrorBoundary from "./components/ApiErrorBoundary";

const reactQueryConfig = new QueryClient();
//  console.log('skko')
// تعريف Router مع basename
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/Home" replace /> },
      { path: "*", element: <NotFound /> },
      {
        path: "Home",
        element: <Home />,
      },
      {
        path: "Products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "ProductDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "Categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "Brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "Payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "Cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "allOrders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "Dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "Profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      { path: "Register", element: <Register /> },
      { path: "Login", element: <Login /> },
      { path: "ForgetPassword", element: <ForgetPassword /> },
      { path: "VerifyResetCode", element: <VerifyResetCode /> },
      { path: "ChangeMyPassword", element: <ChangeMyPassword /> },
      { path: "ResetPassword", element: <ResetPassword /> },
      { path: "Footer", element: <Footer /> },
      { path: "Wishlist", element: <Wishlist /> },
    ],
  },
]);

export default function App() {
  // منطق تأخير ظهور رسالة Offline
  const [showOffline, setShowOffline] = useState(false);
  useEffect(() => {
    let timeout;
    function handleOffline() {
      timeout = setTimeout(() => setShowOffline(true), 2000); // انتظر 2 ثانية قبل الإظهار
    }
    function handleOnline() {
      clearTimeout(timeout);
      setShowOffline(false);
    }
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
      clearTimeout(timeout);
    };
  }, []);
  return (
    <>
      <ErrorBoundary>
        <CreateContextProvider>
          <CartContextProvider>
            <QueryClientProvider client={reactQueryConfig}>
              <ApiErrorBoundary>
                <RouterProvider router={router} />
                <Offline pollingInterval={2000}>
                  {showOffline && <OfflineMessage />}
                </Offline>
                <ToastContainer
                  hideProgressBar="true"
                  position="top-center"
                  style={{ top: "80px", zIndex: 9999 }}
                />
              </ApiErrorBoundary>
            </QueryClientProvider>
          </CartContextProvider>
        </CreateContextProvider>
      </ErrorBoundary>
    </>
  );
}
