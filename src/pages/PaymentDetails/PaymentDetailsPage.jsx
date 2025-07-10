import React from "react";
import PaymentDetailsBody from "./Components/PaymentDetailsBody";
import Header from "../../layouts/Header/Header";

export default function PaymentDetailsPage() {
  return (
    <div className="payment-checkout-page-details">
      <Header />
      <PaymentDetailsBody />
    </div>
  );
}
