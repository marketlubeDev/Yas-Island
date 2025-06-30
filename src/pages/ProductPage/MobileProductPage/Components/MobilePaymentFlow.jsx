import React, { useState } from "react";
import EmailVerification from "./EmailVerification";
import ConfirmEmail from "./ConfirmEmail";
import CheckOut from "./CheckOut";
import PromoCodePopup from "./PromoCode";
import MakePayment from "./MakePayment";
import PaymentSuccessful from "./PaymentSuccessful";
import Experience1 from "./Experience1";
import MobileHeader from "./MobileHeader";

const MobilePaymentFlow = () => {
  const [step, setStep] = useState(1);
  const [promoApplied, setPromoApplied] = useState(false);

  const handleApplyPromo = () => {
    setPromoApplied(true);
    setStep(2);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <EmailVerification
            onBack={() => window.history.back()}
            onConfirmEmail={() => setStep(2)}
          />
        );
      case 2:
        return (
          <CheckOut
            onBack={() => setStep(1)}
            onClose={() => window.history.back()}
            onApplyPromo={handleApplyPromo}
            onProceedToPayment={() => setStep(4)}
            promoApplied={promoApplied}
          />
        );
      case 3:
        return <PromoCodePopup onClose={() => setStep(2)} />;
      case 4:
        return (
          <MakePayment
            onClose={() => window.history.back()}
            onPaymentSuccess={() => setStep(5)}
            promoApplied={promoApplied}
          />
        );
      case 5:
        return <PaymentSuccessful onShowExperience={() => setStep(6)} />;
      case 6:
        return <Experience1 />;
      default:
        return null;
    }
  };

  return (
    <>
      <MobileHeader />
      {renderStep()}
    </>
  );
};

export default MobilePaymentFlow;
