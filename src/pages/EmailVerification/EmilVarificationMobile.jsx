import React from "react";
import PaymentHeaderMbl from "../Home/MobileComponents/PaymentHeaderMbl";
import EmailMbl from "./MobileComponents/EmailMbl";
import MobileHeader from "../Home/MobileComponents/MobileHeader";

function EmailVerificationMobile() {
  return (
    <>
      <MobileHeader />
      <div className="outer-modal-bg">
        <PaymentHeaderMbl step={1} />
        <EmailMbl />
      </div>
    </>
  );
}

export default EmailVerificationMobile;
