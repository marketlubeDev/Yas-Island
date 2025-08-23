import React, { useEffect } from "react";
import CardPaymentBody from "./Components/CardPaymentBody";
import Header from "../../../layouts/Header/Header";
import { useLocation, useNavigate } from "react-router-dom";

export default function CardPaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if state exists
  const isCheckout = location.state?.isCheckout || false;

  useEffect(() => {
    // Get the timestamp when navigation was initiated
    const navigationTimestamp = sessionStorage.getItem("paymentNavigationTime");
    const currentTime = Date.now();

    // Check if navigation happened within the last 5 seconds (normal navigation)
    const isValidNavigation =
      navigationTimestamp && currentTime - parseInt(navigationTimestamp) < 5000;

    // Redirect to home if:
    // 1. No checkout state
    // 2. OR no valid navigation timestamp (page refresh or direct access)
    // 3. OR navigation timestamp is too old (more than 5 seconds)
    if (!isCheckout || !isValidNavigation) {
      // Clear any session flags
      sessionStorage.removeItem("paymentPageValid");
      sessionStorage.removeItem("paymentNavigationTime");
      navigate("/", { replace: true });
      return;
    }

    // Clear the timestamp after successful validation
    sessionStorage.removeItem("paymentNavigationTime");

    // Cleanup on unmount only
    return () => {
      sessionStorage.removeItem("paymentPageValid");
      sessionStorage.removeItem("paymentNavigationTime");
    };
  }, []); // Empty dependency array - run only on mount
  return (
    <div className="payment-checkout-page">
      <Header />
      <CardPaymentBody isCheckout={isCheckout} />
    </div>
  );
}
