import React from "react";
import { useNavigate } from "react-router-dom";
import CardPaymentDetail from "./CardPaymentDetail";

export default function CardPaymentBody() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    // Navigate back to payment details
    navigate("/payment-details");
  };

  const handlePaymentComplete = () => {
    // Navigate to payment success
    navigate("/payment-success");
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
