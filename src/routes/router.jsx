import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductPage from "../pages/Home/ProductPage/ProductPage";
import PaymentCheckout from "../pages/PaymentCheckout/PaymentCheckout";
import LandingPage from "../pages/Home/LandingPage";
// Define your routes
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
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
      }
    ],
  },
]);
