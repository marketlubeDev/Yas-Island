import { createBrowserRouter } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import App from "../App";
import ProductPage from "../pages/ProductPage/ProductPage";
import PaymentCheckout from "../pages/PaymentCheckout/PaymentCheckout";
import LandingPage from "../pages/Home/LandingPage";
import MobileLanding from "../pages/Home/MobileLandingPage";

const ResponsiveLanding = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return isMobile ? <MobileLanding /> : <LandingPage />;
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
        element: <ProductPage />,
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
