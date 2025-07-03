import React, { useState } from "react";
import EmailVerificationMbl from "./Components/EmailVerificationMbl";
// import ConfirmEmail from "./MobileComponents/ConfirmEmailMbl";
// import CheckOutMbl from "./MobileComponents/CheckOutMbl";
// import PromoCodeMbl from "./MobileComponents/PromoCodeMbl";
// import MakePaymentMbl from "./MobileComponents/MakePaymentMbl";
// import PaymentSuccessfulMbl from "./MobileComponents/PaymentSuccessfulMbl";
// import ExperienceMbl from "./MobileComponents/ExperienceMbl";
import MobileHeader from "../Mobile/Components/MobileHeader";

const EmailverificationMobile = () => {
  const [step, setStep] = useState(1);
  // const [promoApplied, setPromoApplied] = useState(false);
  // const handleApplyPromo = () => {
  //   setPromoApplied(true);
  //   setStep(2);
  // };

  // const renderStep = () => {
  //   switch (step) {
  //     case 1:
  //       return (
  //         <EmailVerificationMbl
  //           onBack={() => window.history.back()}
  //           onConfirmEmail={() => setStep(2)}
  //         />
  //       );
  //     case 2:
  //       return (
  //         <CheckOutMbl
  //           onBack={() => setStep(1)}
  //           onClose={() => window.history.back()}
  //           onApplyPromo={handleApplyPromo}
  //           onProceedToPayment={() => setStep(4)}
  //           promoApplied={promoApplied}
  //         />
  //       );
  //     case 3:
  //       return <PromoCodeMbl onClose={() => setStep(2)} />;
  //     case 4:
  //       return (
  //         <MakePaymentMbl
  //           onClose={() => window.history.back()}
  //           onPaymentSuccess={() => setStep(5)}
  //           promoApplied={promoApplied}
  //         />
  //       );
  //     case 5:
  //       return <PaymentSuccessfulMbl onShowExperience={() => setStep(6)} />;
  //     case 6:
  //       return <ExperienceMbl />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <>
      <MobileHeader />
      <EmailVerificationMbl
        onBack={() => window.history.back()}
        onConfirmEmail={() => setStep(2)}
      />
    </>
  );
};

export default EmailverificationMobile;
