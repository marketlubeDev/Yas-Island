import React, { useState } from "react";
import MobileHeader from "./MobileHeader"; // Adjust the import path as needed
import backIcon from "../../../../assets/icons/back.svg";

function ConfirmEmail({
  email = "vivek@dev.panashi.ae",
  onConfirm,
  onBack,
  onResend,
}) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(180); // 3 minutes in seconds

  // Handle OTP input
  const handleOtpChange = (value, idx) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    const newOtp = [...otp];
    newOtp[idx] = value.slice(-1);
    setOtp(newOtp);
    // Move to next input if filled
    if (value && idx < 5) {
      document.getElementById(`otp-input-${idx + 1}`).focus();
    }
  };

  // Timer countdown
  React.useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Format timer as MM:SS
  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  const handleConfirmOTP = () => {
    setShowConfirmEmail(false);
    setShowCheckOut(true);
  };

  return (
    <div className="confirm-email__overlay">
      <div className="confirm-email__modal">
        <MobileHeader />

        <div className="confirm-email__content">
          <div className="confirm-email__title">Guest details and payment</div>
          <button
            className="confirm-email__back-btn"
            onClick={onBack}
            type="button"
          >
            <img src={backIcon} alt="Back" style={{ width: 24, height: 24 }} />
          </button>
          <div className="confirm-email__steps">
            <div className="confirm-email__step confirm-email__step--active">
              Step 1<br />
              <span>Email verification</span>
            </div>
            <div className="confirm-email__step">
              Step 2<br />
              <span>Checkout</span>
            </div>
          </div>
          <div className="confirm-email__step-underline"></div>
          <div className="confirm-email__form-container">
            <div className="confirm-email__label">EMAIL ADDRESS *</div>
            <div className="confirm-email__input-underline">{email}</div>
            <div className="confirm-email__otp-section-bg">
              <div className="confirm-email__otp-label">
                ENTER VERIFICATION CODE
              </div>
              <div className="confirm-email__otp-inputs">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="confirm-email__otp-input"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                  />
                ))}
              </div>
            </div>
            <div className="confirm-email__otp-info">
              Verification code has been sent to <b>{email}</b>
              <br />
              <span className="confirm-email__otp-warning">
                Please check your spam or junk mail folder{" "}
              </span>
            </div>
            <div className="confirm-email__otp-actions">
              <span>
                Will Expire In <b>{formatTime(timer)}</b>
              </span>
              <button
                className="confirm-email__otp-resend"
                onClick={() => {
                  setTimer(180);
                  if (onResend) onResend();
                }}
                disabled={timer > 0}
              >
                Resend
              </button>
            </div>
            <button
              className="confirm-email__confirm-btn"
              style={{ marginTop: 24 }}
              onClick={onConfirm}
            >
              Confirm OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmEmail;
