import React from "react";

export default function VerificationBox({ email }) {
  return (
    <div className="verification-containerBox">
      <p className="verification-text">
        Verification code has been sent to{" "}
        <span className="email">{email}</span>
      </p>
      <p className="spam-notice">Please check your spam or junk mail folder</p>

      <div className="verification-container">
        <p className="verification-label">ENTER VERIFICATION CODE</p>
        <div className="code-inputs">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="code-input"
            />
          ))}
        </div>
      </div>
      <div className="timer-section">
        <span className="expire-text">Will Expire In</span>
        <span className="timer">03:00</span>
        <button className="resend-btn">Resend</button>
      </div>
    </div>
  );
}
