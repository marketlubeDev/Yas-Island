import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MobileHeader from "./MobileHeader"; // Adjust the import path as needed
import backIcon from "../../../../assets/icons/back.svg";
import PaymentHeader from "./PaymentHeader";

function ConfirmEmail({
  email = "vivek@dev.panashi.ae",
  onConfirm,
  onBack,
  onResend,
}) {
  const { t } = useTranslation();
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
        <PaymentHeader step={1} onBack={onBack} />
        <div className="confirm-email__content">
          <div className="confirm-email__form-container">
            <div className="confirm-email__label">
              {t("payment.emailConfirmation.emailLabel")}
            </div>
            <div className="confirm-email__input-underline">{email}</div>
            <div className="confirm-email__otp-section-bg">
              <div className="confirm-email__otp-label">
                {t("payment.verification.enterCode")}
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
              {t("payment.verification.codeSent")} <span>{email}</span>
              <br />
              <div className="confirm-email__otp-warning">
                {t("payment.verification.checkSpam")}
              </div>
            </div>
            <div className="confirm-email__otp-actions">
              <span>
                {t("payment.verification.willExpire")}{" "}
                <b>{formatTime(timer)}</b>
              </span>
              <button
                className="confirm-email__otp-resend"
                onClick={() => {
                  setTimer(180);
                  if (onResend) onResend();
                }}
                disabled={timer > 0}
              >
                {t("payment.verification.resend")}
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onConfirm();
              }}
            >
              <button
                className="confirm-email__confirm-btn"
                type="submit"
                style={{ marginTop: 24 }}
              >
                {t("payment.verification.confirmOtp")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmEmail;
