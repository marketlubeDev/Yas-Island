import React from "react";
import PaymentSuccessBody from "./Components/PaymentSuccessBody";
import Header from "../../layouts/Header/Header";

export default function PaymentSuccessPage() {
  return (
    <div className="payment-checkout-page">
      <Header />
      <PaymentSuccessBody />
    </div>
  );
}
