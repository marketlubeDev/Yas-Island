import { createBrowserRouter, Navigate, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import App from "../App";
import ProductPage from "../pages/ProductPage/ProductPage";
import PaymentCheckout from "../pages/PaymentCheckout/PaymentCheckout";
import LandingPage from "../pages/Home/LandingPage";
import MobileLanding from "../pages/Home/MobileLandingPage";
import MobileProductPage from "../pages/ProductPage/MobileProductPage/MobileProductPage";
import EmailVerification from "../pages/ProductPage/MobileProductPage/Components/EmailVerification";
import { useResponsive } from "../hooks/responsiveHook/useResponsive";

const ResponsiveLanding = () => {
  // const { isSmallPhone, isPhone } = useResponsive();
  // const isMobile = isSmallPhone || isPhone;
  // return isMobile ? <Navigate to="/product" replace /> : <LandingPage />;
  return <Navigate to="/product" replace />;
};

const ResponsiveProduct = () => {
  const { isSmallPhone, isPhone } = useResponsive();
  const isMobile = isSmallPhone || isPhone;
  return isMobile ? <MobileProductPage /> : <ProductPage />;
};

const ResponsiveEmailVerification = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return isMobile ? <EmailVerification /> : <PaymentCheckout />;
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
        element: <ResponsiveEmailVerification />,
      },
      {
        path: "contact",
        element: <div>Contact Page</div>,
      },
    ],
  },
]);
