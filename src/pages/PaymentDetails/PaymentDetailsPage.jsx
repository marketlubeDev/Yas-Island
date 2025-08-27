import React, { useEffect } from "react";
import PaymentDetailsBody from "./Components/PaymentDetailsBody";
import Header from "../../layouts/Header/Header";
import { useLocation } from "react-router-dom";

export default function PaymentDetailsPage() {
  const { isCheckout } = useLocation().state || {};

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
