import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../../PaymentCheckout/Components/CheckoutSteps";
import PaymentCheckHeading from "../../PaymentCheckout/Components/PaymentCheckHeading";
import EmailConfirmation from "../../PaymentCheckout/Components/EmailConfirmation";

export default function PaymentCheckoutBody() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState("email");
  const [showVerification, setShowVerification] = useState(false);

  const handleVerificationComplete = () => {
    setCurrentStep("details");
  };

  const handleBackClick = () => {
    navigate("/product");
  };

  const showHeaderComponents =
    currentStep === "email" || currentStep === "details";

  return (
    <div className="payment-checkout">
      {showHeaderComponents && (
        <>
          <CheckoutSteps currentStep={currentStep} />
          <PaymentCheckHeading onBackClick={handleBackClick} />
        </>
      )}
      <div
        className={`payment-checkout__content ${
          showHeaderComponents
            ? "payment-checkout__content--with-header"
            : "payment-checkout__content--no-header"
        }`}
      >
        <EmailConfirmation
          onVerificationComplete={handleVerificationComplete}
          showVerification={showVerification}
          setShowVerification={setShowVerification}
        />
      </div>
    </div>
  );
}
