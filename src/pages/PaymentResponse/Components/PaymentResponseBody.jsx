import React from "react";
import PaymentResponse from "./PaymentResponse";

export default function PaymentResponseBody() {
  const handleBackClick = () => {
    // Navigate back to payment success
    window.location.replace("/payment-success");
  };

  return (
    <div className="payment-response-body">
      <PaymentResponse onBack={handleBackClick} />
    </div>
  );
}
