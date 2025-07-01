import React, { useState } from "react";
import ConfirmEmailMbl from "./ConfirmEmailMbl";
import PaymentHeaderMbl from "./PaymentHeaderMbl";
import EmailMbl from "./EmailMbl";
import CheckOutMbl from "./CheckOutMbl";

function EmailVerificationMbl({ onConfirmEmail, onBack }) {
  const [showConfirmEmail, setShowConfirmEmail] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);

  const handleConfirmOTP = () => {
    if (onConfirmEmail) {
      onConfirmEmail();
    }
  };

  return (
    <>
      {showCheckOut && (
        <CheckOutMbl
          onBack={() => {
            setShowCheckOut(false);
            setShowConfirmEmail(true);
          }}
        />
      )}
      {!showConfirmEmail ? (
        <div className="outer-modal-bg">
          <PaymentHeaderMbl step={1} onBack={onBack} />
          <EmailMbl onEmailSubmit={() => setShowConfirmEmail(true)} />
        </div>
      ) : (
        <ConfirmEmailMbl
          onBack={() => setShowConfirmEmail(false)}
          onConfirm={handleConfirmOTP}
        />
      )}
    </>
  );
}

export default EmailVerificationMbl;
