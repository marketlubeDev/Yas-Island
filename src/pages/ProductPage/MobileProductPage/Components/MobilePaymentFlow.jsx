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
  // const [step, setStep] = useState(1);

  return (
    <>
     <MobileHeader />
     <EmailVerification
          onBack={() => window.history.back()}
        />





     {/* {step === 1 && (
        <EmailVerification
          onConfirmEmail={() => setStep(2)}
          onBack={() => window.history.back()}
        />
      )} */}
       {/* {step === 2 && (
        <ConfirmEmail onBack={() => setStep(1)} onConfirm={() => setStep(3)} />
      )}
      {step === 3 && (
        <CheckOut
          onBack={() => setStep(2)}
          onClose={() => window.history.back()}
          onApplyPromo={() => setStep(4)}
          onProceedToPayment={() => setStep(5)}
        />
      )}
      {step === 4 && <PromoCodePopup onClose={() => setStep(3)} />}
      {step === 5 && (
        <MakePayment
          onClose={() => window.history.back()}
          onPaymentSuccess={() => setStep(6)}
        />
      )}
      {step === 6 && <PaymentSuccessful onShowExperience={() => setStep(7)} />}
      {step === 7 && <Experience1 />} */}
    </>
  );
};

export default MobilePaymentFlow;
