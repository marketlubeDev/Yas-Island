import React from "react";

export default function CheckoutSteps({ currentStep }) {
  const getStepStatus = (step) => {
    switch (currentStep) {
      case 'email':
        return step === 1 ? 'active' : 'inactive';
      case 'details':
      case 'card':
        return step === 2 ? 'active' : 'inactive';
      case 'success':
      case 'response':
        return step === 2 ? 'active' : 'inactive';
      default:
        return step === 1 ? 'active' : 'inactive';
    }
  };

  return (
    <div className="payment-checkout__steps">
      <div className={`step ${getStepStatus(1)}`}>
        <span>Step 1</span>
        <h2>Email verification</h2>
        <div className={`step-line ${getStepStatus(1) === 'inactive' ? 'inactive' : ''}`}></div>
      </div>
      <div className={`step ${getStepStatus(2)}`}>
        <span>Step 2</span>
        <h2>Checkout</h2>
        <div className={`step-line ${getStepStatus(2) === 'inactive' ? 'inactive' : ''}`}></div>
      </div>
    </div>
  );
}
