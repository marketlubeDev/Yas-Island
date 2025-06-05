import { createBrowserRouter, Navigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import App from "../App";
import ProductPage from "../pages/ProductPage/ProductPage";
import PaymentCheckout from "../pages/PaymentCheckout/PaymentCheckout";
import LandingPage from "../pages/Home/LandingPage";
import MobileLanding from "../pages/Home/MobileLandingPage";
import MobileProductPage from "../pages/ProductPage/MobileProductPage/MobileProductPage";
import { Accessibility } from "lucide-react";

const ResponsiveLanding = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return isMobile ? <Navigate to="/product" replace /> : <LandingPage />;
};

const ResponsiveProduct = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return isMobile ? <MobileProductPage /> : <ProductPage />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ResponsiveLanding />,
      },
      {
        path: "product",
        element: <ResponsiveProduct />,
      },
      {
        path: "payment",
        element: <PaymentCheckout />,
      },
      {
        path: "contact",
        element: <div>Contact Page</div>,
      },
    ],
  },
]);
