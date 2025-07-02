import React from "react";
import CheckoutSteps from "../Components/CheckoutSteps";
import PaymentCheckHeading from "../Components/PaymentCheckHeading";
import PaymentDetails from "./PaymentDetails";

export default function PaymentDetailsBody() {
  const handleBackClick = () => {
    // Navigate back to OTP confirmation
    window.location.href = "/otp-confirmation";
  };

  const handleProceedToPayment = () => {
    // Navigate to card payment
    window.location.href = "/card-payment";
  };

  return (
    <div className="payment-checkout">
      <CheckoutSteps currentStep="details" />
      <PaymentCheckHeading onBackClick={handleBackClick} />

      <div className="payment-checkout__content payment-checkout__content--with-header">
        <PaymentDetails onProceed={handleProceedToPayment} />
      </div>
    </div>
  );
}
