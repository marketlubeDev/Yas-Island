import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import ProductPage from "../pages/ProductPage/ProductPage";
import PaymentCheckout from "../pages/PaymentCheckout/PaymentCheckout";
import MobileProductPage from "../pages/ProductPage/MobileProductPage/MobileProductPage";
import MobilePaymentFlow from "../pages/ProductPage/MobileProductPage/Components/MobilePaymentFlow";
import { useResponsive } from "../hooks/responsiveHook/useResponsive";

const ResponsiveProduct = () => {
  const { isSmallPhone, isPhone } = useResponsive();
  const isMobile = isSmallPhone || isPhone;
  return isMobile ? <MobileProductPage /> : <ProductPage />;
};

const ResponsiveEmailVerification = () => {
  const { isSmallPhone, isPhone } = useResponsive();
  const isMobile = isSmallPhone || isPhone;
  return isMobile ? <MobilePaymentFlow /> : <PaymentCheckout />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/product" replace />,
      },
      {
        path: "product",
        element: <ResponsiveProduct />,
      },
      {
        path: "payment",
        element: <ResponsiveEmailVerification />,
      },
    ],
  },
]);
