import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import ProductPage from "../pages/ProductPage/ProductPage";
import PaymentCheckout from "../pages/EmailVerification/PaymentCheckout";
import MobileProductPage from "../pages/ProductPage/MobileProductPage/MobileProductPage";
import OtpConfirmation from "../pages/OtpConfirmation/OtpConfirmation";
import PaymentDetailsPage from "../pages/PaymentDetails/PaymentDetailsPage";
import CardPaymentPage from "../pages/CardPayment/Desktop/CardPaymentPage";
import PaymentSuccessPage from "../pages/PaymentSuccess/PaymentSuccessPage";
import PaymentResponsePage from "../pages/PaymentResponse/PaymentResponsePage";
import ResponsiveWrapper from "../components/ResponsiveWrapper";
import EmailVerificationMobile from "../pages/EmailVerification/EmilVarificationMobile";
import OtpConfirmationMobile from "../pages/OtpConfirmation/OtpConfirmationMobile";
import PaymentDetailsMobile from "../pages/PaymentDetails/PaaymentDetailMobile";
import CardPaymentMobile from "../pages/CardPayment/Mobile/CardPaymentMobile";
import PaymentSuccessMobile from "../pages/PaymentSuccess/PaymentSuccessMobile";
import PaymentResponseMobile from "../pages/PaymentResponse/PaymentResponseMobile";

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
        path: "email-verification",
        element: (
          <ResponsiveWrapper
            MobileComponent={EmailVerificationMobile}
            DesktopComponent={PaymentCheckout}
          />
        ),
      },
      {
        path: "otp-confirmation",
        element: (
          <ResponsiveWrapper
            MobileComponent={OtpConfirmationMobile}
            DesktopComponent={OtpConfirmation}
          />
        ),
      },
      {
        path: "payment-details",
        element: (
          <ResponsiveWrapper
            MobileComponent={PaymentDetailsMobile}
            DesktopComponent={PaymentDetailsPage}
          />
        ),
      },
      {
        path: "card-payment",
        element: (
          <ResponsiveWrapper
            MobileComponent={CardPaymentMobile}
            DesktopComponent={CardPaymentPage}
          />
        ),
      },
      {
        path: "payment-success",
        element: (
          <ResponsiveWrapper
            MobileComponent={PaymentSuccessMobile}
            DesktopComponent={PaymentSuccessPage}
          />
        ),
      },
      {
        path: "payment-response",
        element: (
          <ResponsiveWrapper
            MobileComponent={PaymentResponseMobile}
            DesktopComponent={PaymentResponsePage}
          />
        ),
      },
    ],
  },
]);
