import React, { useState } from "react";
import PaymentCheckoutHeader from "./Components/PaymentCheckoutHeader";
import PaymentCheckoutBody from "./Components/PaymentCheckoutBody";

export default function PaymentCheckout() {
  return (
    <div className="payment-checkout-page">
      <PaymentCheckoutBody />
    </div>
  );
}
