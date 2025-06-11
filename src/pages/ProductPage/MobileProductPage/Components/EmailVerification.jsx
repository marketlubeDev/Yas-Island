import React, { useState } from "react";
import MobileHeader from "./MobileHeader";
import ConfirmEmail from "./ConfirmEmail";
import PaymentHeader from "./PaymentHeader";

function EmailVerification({ onConfirmEmail }) {
  const [email, setEmail] = useState("vivek@dev.panashi.ae");
  const [showConfirmEmail, setShowConfirmEmail] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmEmail(true);
  };

  const handleConfirmOTP = () => {
    if (onConfirmEmail) {
      onConfirmEmail();
    }
  };

  return (
    <>
      {!showConfirmEmail ? (
        <div className="outer-modal-bg">
          <form className="email-verification__form" onSubmit={handleSubmit}>
            <PaymentHeader />
            <div className="email-verification-form-box">
              <label className="email-verification-label">
                EMAIL ADDRESS *
              </label>
              <input
                type="email"
                className="email-verification-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="email-verification-confirm-btn" type="submit">
                Confirm Email
              </button>
            </div>
          </form>
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
