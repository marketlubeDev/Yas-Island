import React from "react";
import PaymentResponseBody from "./Components/PaymentResponseBody";
import Header from "../../layouts/Header/Header";

export default function PaymentResponsePage() {
  return (
    <div className="payment-checkout-page">
      <Header />
      <PaymentResponseBody />
    </div>
  );
}
