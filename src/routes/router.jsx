import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import ProductPage from "../pages/ProductPage/ProductPage";
import PaymentCheckout from "../pages/PaymentCheckout/PaymentCheckout";
import MobileProductPage from "../pages/ProductPage/MobileProductPage/MobileProductPage";
import MobilePaymentFlow from "../pages/PaymentCheckout/MobilePaymentFlow";
import { useResponsive } from "../hooks/responsiveHook/useResponsive";
import EmailVerification from "../pages/PaymentCheckout/EmailVerification";
import OtpConfirmation from "../pages/PaymentCheckout/OtpConfirmation";
import PaymentDetailsPage from "../pages/PaymentCheckout/PaymentDetailsPage";
import CardPaymentPage from "../pages/PaymentCheckout/CardPaymentPage";
import PaymentSuccessPage from "../pages/PaymentCheckout/PaymentSuccessPage";
import PaymentResponsePage from "../pages/PaymentCheckout/PaymentResponsePage";

const ResponsiveProduct = () => {
  const { isSmallPhone, isPhone } = useResponsive();
  const isMobile = isSmallPhone || isPhone;
  return isMobile ? <MobileProductPage /> : <ProductPage />;
};

const ResponsivePayment = () => {
  const { isSmallPhone, isPhone } = useResponsive();
  const isMobile = isSmallPhone || isPhone;
  return isMobile ? <MobilePaymentFlow /> : <PaymentCheckout />;
};

const ResponsiveEmailVerification = () => {
  const { isSmallPhone, isPhone } = useResponsive();
  const isMobile = isSmallPhone || isPhone;
  return isMobile ? <MobilePaymentFlow /> : <PaymentCheckout />;
};

const ResponsiveOtpConfirmation = () => {
  const { isSmallPhone, isPhone } = useResponsive();
  const isMobile = isSmallPhone || isPhone;
  return isMobile ? <MobilePaymentFlow /> : <OtpConfirmation />;
};

const ResponsivePaymentDetails = () => {
  const { isSmallPhone, isPhone } = useResponsive();
  const isMobile = isSmallPhone || isPhone;
  return isMobile ? <MobilePaymentFlow /> : <PaymentDetailsPage />;
};

const ResponsiveCardPayment = () => {
  const { isSmallPhone, isPhone } = useResponsive();
  const isMobile = isSmallPhone || isPhone;
  return isMobile ? <MobilePaymentFlow /> : <CardPaymentPage />;
};

const ResponsivePaymentSuccess = () => {
  const { isSmallPhone, isPhone } = useResponsive();
  const isMobile = isSmallPhone || isPhone;
  return isMobile ? <MobilePaymentFlow /> : <PaymentSuccessPage />;
};

const ResponsivePaymentResponse = () => {
  const { isSmallPhone, isPhone } = useResponsive();
  const isMobile = isSmallPhone || isPhone;
  return isMobile ? <MobilePaymentFlow /> : <PaymentResponsePage />;
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
        element: <ResponsivePayment />,
      },
      {
        path: "email-verification",
        element: <ResponsiveEmailVerification />,
      },
      {
        path: "otp-confirmation",
        element: <ResponsiveOtpConfirmation />,
      },
      {
        path: "payment-details",
        element: <ResponsivePaymentDetails />,
      },
      {
        path: "card-payment",
        element: <ResponsiveCardPayment />,
      },
      {
        path: "payment-success",
        element: <ResponsivePaymentSuccess />,
      },
      {
        path: "payment-response",
        element: <ResponsivePaymentResponse />,
      },
    ],
  },
]);
