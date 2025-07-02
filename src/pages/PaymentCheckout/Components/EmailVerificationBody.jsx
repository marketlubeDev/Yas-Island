import React, { useState } from "react";
import CheckoutSteps from "../Components/CheckoutSteps";
import PaymentCheckHeading from "../Components/PaymentCheckHeading";
import VerificationBox from "../../OtpConfirmation/Components/VerificationBox";

export default function EmailVerificationBody() {
  const [email] = useState("user@example.com"); // You can get this from props, context, or state

  const handleBackClick = () => {
    // Navigate back to payment page
    window.location.href = "/payment";
  };

  const handleVerificationComplete = () => {
    // Navigate to next step after verification
    window.location.href = "/payment"; // or wherever you want to go after verification
  };

  return (
    <div className="payment-checkout">
      <CheckoutSteps currentStep="email" />
      <PaymentCheckHeading onBackClick={handleBackClick} />

      <div className="payment-checkout__content payment-checkout__content--with-header">
        <VerificationBox
          email={email}
          onVerificationComplete={handleVerificationComplete}
        />
      </div>
    </div>
  );
}
