import React, { useEffect } from "react";
import PaymentDetailsBody from "./Components/PaymentDetailsBody";
import Header from "../../layouts/Header/Header";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isCheckout } = location.state || {};

  useEffect(() => {
    // Check if we have a valid navigation timestamp (set when navigating TO payment-details)
    const navigationTimestamp = sessionStorage.getItem(
      "paymentDetailsNavigationTime"
    );
    const currentTime = Date.now();

    // Check if navigation happened within the last 5 seconds (normal navigation)
    const isValidNavigation =
      navigationTimestamp && currentTime - parseInt(navigationTimestamp) < 5000;

    if (!isCheckout || !isValidNavigation) {
      sessionStorage.removeItem("paymentDetailsNavigationTime");
      navigate("/", { replace: true });
      return;
    }
    sessionStorage.removeItem("paymentDetailsNavigationTime");
  }, [isCheckout, navigate]);
  console.log(isCheckout, "isCheckoutisCheckout");
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="payment-checkout-page-details">
      <Header />
      <PaymentDetailsBody isCheckout={isCheckout} />
    </div>
  );
}
