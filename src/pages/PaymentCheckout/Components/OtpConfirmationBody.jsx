import React, { useState } from "react";
import CheckoutSteps from "../Components/CheckoutSteps";
import PaymentCheckHeading from "../Components/PaymentCheckHeading";
import VerificationBox from "./VerificationBox";

export default function OtpConfirmationBody() {
  const [email] = useState("user@example.com"); // You can get this from props, context, or state

  const handleBackClick = () => {
    // Navigate back to payment page
    window.location.href = "/payment";
  };

  const handleVerificationComplete = () => {
    // Navigate to payment details after OTP verification
    window.location.href = "/payment-details";
  };

  return (
    <div className="payment-checkout">
      <CheckoutSteps currentStep="email" />
      <PaymentCheckHeading onBackClick={handleBackClick} />

      <div className="payment-checkout__content payment-checkout__content--with-header">
        <div className="form-container">
          <div className="form-group">
            <label>Enter OTP</label>
            <input
              type="email"
              // placeholder={t("payment.emailConfirmation.emailPlaceholder")}
              className="form-control"
              value={email}
              // onChange={(e) => setEmailValue(e.target.value)}
            />
            <div className="input-underline"></div>
          </div>
          <VerificationBox
            email={email}
            onVerificationComplete={handleVerificationComplete}
          />
        </div>
      </div>
    </div>
  );
}
