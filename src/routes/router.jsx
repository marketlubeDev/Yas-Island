import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import ProductPage from "../pages/ProductPage/ProductPage";
import PaymentCheckout from "../pages/EmailVerification/PaymentCheckout";
import MobileProductPage from "../pages/Mobile/ProductPage/MobileProductPage";
import MobilePaymentFlow from "../pages/PaymentCheckout/MobilePaymentFlow";
import OtpConfirmation from "../pages/OtpConfirmation/OtpConfirmation";
import PaymentDetailsPage from "../pages/PaymentDetails/PaymentDetailsPage";
import CardPaymentPage from "../pages/CardPayment/CardPaymentPage";
import PaymentSuccessPage from "../pages/PaymentSuccess/PaymentSuccessPage";
import PaymentResponsePage from "../pages/PaymentResponse/PaymentResponsePage";
import ResponsiveWrapper from "../components/ResponsiveWrapper";
import EmailverificationMobile from "../pages/Mobile/EmailVerification/EmailverificationMobile";

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
        element: (
          <ResponsiveWrapper
            MobileComponent={MobileProductPage}
            DesktopComponent={ProductPage}
          />
        ),
      },
      {
        path: "payment",
        element: (
          <ResponsiveWrapper
            MobileComponent={MobilePaymentFlow}
            DesktopComponent={PaymentCheckout}
          />
        ),
      },
      {
        path: "email-verification",
        element: (
          <ResponsiveWrapper
            MobileComponent={EmailverificationMobile}
            DesktopComponent={PaymentCheckout}
          />
        ),
      },
      {
        path: "otp-confirmation",
        element: (
          <ResponsiveWrapper
            MobileComponent={MobilePaymentFlow}
            DesktopComponent={OtpConfirmation}
          />
        ),
      },
      {
        path: "payment-details",
        element: (
          <ResponsiveWrapper
            MobileComponent={MobilePaymentFlow}
            DesktopComponent={PaymentDetailsPage}
          />
        ),
      },
      {
        path: "card-payment",
        element: (
          <ResponsiveWrapper
            MobileComponent={MobilePaymentFlow}
            DesktopComponent={CardPaymentPage}
          />
        ),
      },
      {
        path: "payment-success",
        element: (
          <ResponsiveWrapper
            MobileComponent={MobilePaymentFlow}
            DesktopComponent={PaymentSuccessPage}
          />
        ),
      },
      {
        path: "payment-response",
        element: (
          <ResponsiveWrapper
            MobileComponent={MobilePaymentFlow}
            DesktopComponent={PaymentResponsePage}
          />
        ),
      },
    ],
  },
]);
