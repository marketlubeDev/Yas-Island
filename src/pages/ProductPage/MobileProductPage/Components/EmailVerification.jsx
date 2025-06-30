import React, { useState } from "react";
import ConfirmEmail from "./ConfirmEmail";
import PaymentHeader from "./PaymentHeader";
import CheckOut from "./CheckOut";
import Email from "./Email";

function EmailVerification({ onConfirmEmail, onBack }) {
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
        <CheckOut
          onBack={() => {
            setShowCheckOut(false);
            setShowConfirmEmail(true);
          }}
        />
      )}
      {!showConfirmEmail ? (
        <div className="outer-modal-bg">
          <PaymentHeader step={1} onBack={onBack} />
          <Email onEmailSubmit={() => setShowConfirmEmail(true)} />
        </div>
      ) : (
        <ConfirmEmail
          onBack={() => setShowConfirmEmail(false)}
          onConfirm={handleConfirmOTP}
        />
      )}
    </>
  );
}

export default EmailVerification;
