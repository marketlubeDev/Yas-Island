import React, { useEffect } from "react";
import PaymentHeaderMbl from "../Home/MobileComponents/PaymentHeaderMbl";
import EmailMbl from "./MobileComponents/EmailMbl";
import MobileHeader from "../Home/MobileComponents/MobileHeader";

function EmailVerificationMobile() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="outer-modal-bg">
        <PaymentHeaderMbl step={1} />
        <EmailMbl />
      </div>
    </>
  );
}

export default EmailVerificationMobile;
