import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import ProductPage from "../pages/ProductPage/ProductPage";
import AllProductsPage from "../pages/ProductPage/AllProductsPage";
import PaymentCheckout from "../pages/EmailVerification/PaymentCheckout";
import MobileProductPage from "../pages/ProductPage/MobileProductPage/MobileProductPage";
import MobileAllProductsPage from "../pages/ProductPage/MobileProductPage/MobileAllProductsPage";
import OtpConfirmation from "../pages/OtpConfirmation/OtpConfirmation";
import PaymentDetailsPage from "../pages/PaymentDetails/PaymentDetailsPage";
import CardPaymentPage from "../pages/CardPayment/Desktop/CardPaymentPage";
import PaymentSuccessPage from "../pages/PaymentSuccess/PaymentSuccessPage";
import PaymentResponsePage from "../pages/PaymentResponse/PaymentResponsePage";
import ResponsiveWrapper from "../components/ResponsiveWrapper";
import EmailVerificationMobile from "../pages/EmailVerification/EmilVarificationMobile";
import OtpConfirmationMobile from "../pages/OtpConfirmation/OtpConfirmationMobile";
import PaymentDetailsMobile from "../pages/PaymentDetails/PaaymentDetailMobile";
import PaymentSuccessMobile from "../pages/PaymentSuccess/PaymentSuccessMobile";
import PaymentResponseMobile from "../pages/PaymentResponse/PaymentResponseMobile";
import UpcomingPages from "../pages/Upcoming/Desktop/UpcomingPages";
import MobileUpcomingPage from "../pages/Upcoming/Mobile/MobileUpcomingPage";
import PackagesPage from "../pages/Packages/Desktop/PackagesPage";
import MobilePackagesPage from "../pages/Packages/Mobile/MobilePackagesPage";
import HotelsPage from "../pages/Hotels/Desktop/HotelsPage";
import MobileHotelsPage from "../pages/Hotels/Mobile/MobileHotelsPage";
import DiningPage from "../pages/Dining/Desktop/DiningPage";
import MobileDiningPage from "../pages/Dining/Mobile/MobileDiningPage";
import EventsPage from "../pages/Events/Desktop/EventsPage";
import MobileEventsPage from "../pages/Events/Mobile/MobileEventsPage";
import ShoppingPage from "../pages/Shopping/Desktop/ShoppingPage";
import MobileShoppingPage from "../pages/Shopping/Mobile/MobileShoppingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <ResponsiveWrapper
            MobileComponent={MobileProductPage}
            DesktopComponent={ProductPage}
          />
        ),
      },
      {
        path: "all",
        element: (
          <ResponsiveWrapper
            MobileComponent={MobileAllProductsPage}
            DesktopComponent={AllProductsPage}
          />
        ),
      },
      {
        path: "product/:id",
        element: (
          <ResponsiveWrapper
            MobileComponent={MobileProductPage}
            DesktopComponent={ProductPage}
          />
        ),
      },
      {
        path: ":id",
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
        element: <CardPaymentPage />,
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
      {
        path: "upcoming",
        element: (
          <ResponsiveWrapper
            MobileComponent={MobileUpcomingPage}
            DesktopComponent={UpcomingPages}
          />
        ),
      },
      {
        path: "packages",
        element: (
          <ResponsiveWrapper
            MobileComponent={MobilePackagesPage}
            DesktopComponent={PackagesPage}
          />
        ),
      },
      {
        path: "hotels",
        element: (
          <ResponsiveWrapper
            MobileComponent={MobileHotelsPage}
            DesktopComponent={HotelsPage}
          />
        ),
      },
      {
        path: "dining",
        element: (
          <ResponsiveWrapper
            MobileComponent={MobileDiningPage}
            DesktopComponent={DiningPage}
          />
        ),
      },
      {
        path: "events",
        element: (
          <ResponsiveWrapper
            MobileComponent={MobileEventsPage}
            DesktopComponent={EventsPage}
          />
        ),
      },
      {
        path: "shopping",
        element: (
          <ResponsiveWrapper
            MobileComponent={MobileShoppingPage}
            DesktopComponent={ShoppingPage}
          />
        ),
      },

      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
