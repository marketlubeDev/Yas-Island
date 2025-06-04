import React, { useState } from "react";
import VerificationBox from "./VerificationBox";

export default function EmailConfirmation({ onVerificationComplete, showVerification, setShowVerification }) {
 
  const [email, setEmail] = useState("");

  const handleConfirmEmail = () => {
    if (!showVerification) {
      // First click - show verification box
      setShowVerification(true);
    } else {
      // Second click - complete verification and show payment details
      onVerificationComplete();
    }
  };

  return (
    <div className="form-container">
      <div className="form-group">
        <label>EMAIL ADDRESS *</label>
        <input
          type="email"
          placeholder="vivek@dev.vanasthi.ae"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="input-underline"></div>
      </div>

      {showVerification && <VerificationBox email={email || "vivek@dev.panashi.ae"} />}

      <button
        className="confirm-button"
        onClick={handleConfirmEmail}
      >
        {showVerification ? "Complete Verification" : "Confirm email"}
      </button>
    </div>
  );
}
