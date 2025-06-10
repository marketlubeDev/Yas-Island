import React from "react";

function PaymentSuccessful({ onShowExperience }) {
  return (
    // <div className="outer-modal-bg-payment-successful">
    <div className="payment-success-modal-container">
      <div className="payment-success-modal">
        <div className="payment-success-icon">
          {/* Inline SVG for checkmark */}
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="#2ECC71" />
            <path
              d="M20 34L29 43L44 27"
              stroke="#fff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          className="payment-success-message"
          style={{ cursor: "pointer" }}
          onClick={onShowExperience}
        >
          Payment Successful
        </div>
      </div>{" "}
    </div>
  );
}

export default PaymentSuccessful;
