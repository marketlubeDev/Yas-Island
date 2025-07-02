import React from "react";
import CardPaymentBody from "./Components/CardPaymentBody";
import Header from "../../layouts/Header/Header";

export default function CardPaymentPage() {
  return (
    <div className="payment-checkout-page">
      <Header />
      <CardPaymentBody />
    </div>
  );
}
