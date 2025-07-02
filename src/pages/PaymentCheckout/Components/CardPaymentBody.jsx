import React from "react";
import CardPaymentDetail from "./CardPaymentDetail";

export default function CardPaymentBody() {
  const handleBackClick = () => {
    // Navigate back to payment details
    window.location.href = "/payment-details";
  };

  const handlePaymentComplete = () => {
    // Navigate to payment success
    window.location.href = "/payment-success";
  };

  return (
    <div className="payment-checkout">
      <div className="payment-checkout__content payment-checkout__content--no-header">
        <CardPaymentDetail
          onBack={handleBackClick}
          onPaymentComplete={handlePaymentComplete}
        />
      </div>
    </div>
  );
}
