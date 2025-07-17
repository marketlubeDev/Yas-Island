import React from "react";
import PaymentSuccess from "./PaymentSuccess";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccessBody() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    // Navigate back to card payment
    navigate("/card-payment");
  };

  const handleLottieClick = () => {
    // Navigate to payment response
    navigate("/payment-response");
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
