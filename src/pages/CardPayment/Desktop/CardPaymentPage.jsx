import React from "react";
import CardPaymentBody from "./Components/CardPaymentBody";
import Header from "../../../layouts/Header/Header";
import { useLocation } from "react-router-dom";

export default function CardPaymentPage() {
  const { isCheckout } = useLocation().state || { isCheckout: false };
  return (
    <div className="payment-checkout-page">
      <Header />
      <CardPaymentBody isCheckout={isCheckout} />
    </div>
  );
}
