import React from "react";
import PaymentResponse from "./PaymentResponse";

export default function PaymentResponseBody() {
  const handleBackClick = () => {
    // Navigate back to payment success
    window.location.href = "/payment-success";
  };

  return (
    <div className="payment-checkout">
      <div className="payment-checkout__content payment-checkout__content--no-header">
        <PaymentResponse onBack={handleBackClick} />
      </div>
    </div>
  );
}
