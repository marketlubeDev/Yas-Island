import React, { useState } from "react";
import arrow from "../../../assets/icons/left.svg";
import CheckoutSteps from "../Components/CheckoutSteps";
import PaymentCheckHeading from "../Components/PaymentCheckHeading";
import EmailConfirmation from "./EmailConfirmation";
import PaymentDetails from "./PaymentDetails";
import CardPaymentDetail from "./CardPaymentDetail";
import PaymentSuccess from "./PaymentSuccess";
import PaymentResponse from "./PaymentResponse";

export default function PaymentCheckoutBody() {
  const [currentStep, setCurrentStep] = useState("email");
  const [showVerification, setShowVerification] = useState(false);

  const handleVerificationComplete = () => {
    setCurrentStep("details");
  };

  const handleProceedToPayment = () => {
    setCurrentStep("card");
  };

  const handlePaymentComplete = () => {
    setCurrentStep("success");
  };

  const handleLottieClick = () => {
    setCurrentStep("response");
  };

  const handleBackClick = () => {
    if (currentStep === "email") {
      if (showVerification) {
        setShowVerification(false);
      } else {
        window.location.href = "/product";
      }
    }
    if (currentStep === "details") {
      setCurrentStep("email");
    }
    if (currentStep === "card") {
      setCurrentStep("details");
    }
    if (currentStep === "success") {
      setCurrentStep("card");
    }
    if (currentStep === "response") {
      setCurrentStep("success");
    }
  };

  const renderContent = () => {
    switch (currentStep) {
      case "email":
        return (
          <EmailConfirmation
            onVerificationComplete={handleVerificationComplete}
            showVerification={showVerification}
            setShowVerification={setShowVerification}
          />
        );
      case "details":
        return <PaymentDetails onProceed={handleProceedToPayment} />;
      case "card":
        return <CardPaymentDetail onPaymentComplete={handlePaymentComplete} />;
      case "success":
        return <PaymentSuccess onLottieClick={handleLottieClick} />;
      case "response":
        return <PaymentResponse />;
      default:
        return (
          <EmailConfirmation
            onVerificationComplete={handleVerificationComplete}
            showVerification={showVerification}
            setShowVerification={setShowVerification}
          />
        );
    }
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
        {renderContent()}
      </div>
    </div>
  );
}
