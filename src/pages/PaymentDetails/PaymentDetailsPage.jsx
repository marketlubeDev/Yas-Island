import React from "react";
import PaymentDetailsBody from "./Components/PaymentDetailsBody";
import Header from "../../layouts/Header/Header";
import { useLocation } from "react-router-dom";

export default function PaymentDetailsPage() {
  const { isCheckout } = useLocation().state || {};
  return (
    <div className="payment-checkout-page-details">
      <Header />
      <PaymentDetailsBody isCheckout={isCheckout} />
    </div>
  );
}
