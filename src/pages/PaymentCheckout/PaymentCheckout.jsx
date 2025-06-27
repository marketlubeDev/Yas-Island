import React, { useState } from "react";
import PaymentCheckoutHeader from "./Components/PaymentCheckoutHeader";
import PaymentCheckoutBody from "./Components/PaymentCheckoutBody";
import Header from "../../layouts/Header/Header";

export default function PaymentCheckout() {
  return (
    <div className="payment-checkout-page">
      <Header />
      <PaymentCheckoutBody />
    </div>
  );
}
