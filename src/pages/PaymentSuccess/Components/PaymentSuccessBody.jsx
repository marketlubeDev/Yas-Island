import React from "react";
import PaymentSuccess from "./PaymentSuccess";

export default function PaymentSuccessBody() {
  const handleBackClick = () => {
    // Navigate back to card payment
    window.location.href = "/card-payment";
  };

  const handleLottieClick = () => {
    // Navigate to payment response
    window.location.href = "/payment-response";
  };

  return (
    <div className="payment-checkout">
      <div className="payment-checkout__content payment-checkout__content--no-header">
        <PaymentSuccess
          onBack={handleBackClick}
          onLottieClick={handleLottieClick}
        />
      </div>
    </div>
  );
}
