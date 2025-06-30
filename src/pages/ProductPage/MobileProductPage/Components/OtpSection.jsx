import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function OtpSection({ onOtpComplete }) {
  const { t } = useTranslation();
  const [otp, setOtp] = useState(Array(6).fill("")); // Assuming 6-digit OTP

  const handleOtpChange = (value, currentIndex) => {
    if (!value) {
      // Handle backspace/delete
      const newOtp = [...otp];
      newOtp[currentIndex] = "";
      setOtp(newOtp);
      return;
    }

    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[currentIndex] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (currentIndex < 5 && value) {
      const nextInput = document.getElementById(
        `otp-input-${currentIndex + 1}`
      );
      if (nextInput) {
        nextInput.focus();
      }
    }

    // Check if OTP is complete
    if (currentIndex === 5 && value) {
      const completedOtp = newOtp.join("");
      if (onOtpComplete) {
        onOtpComplete(completedOtp);
      }
    }
  };

  const handleKeyDown = (e, currentIndex) => {
    // Handle backspace focus
    if (e.key === "Backspace" && !otp[currentIndex] && currentIndex > 0) {
      const prevInput = document.getElementById(
        `otp-input-${currentIndex - 1}`
      );
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  return (
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
            onKeyDown={(e) => handleKeyDown(e, idx)}
            autoComplete="off"
          />
        ))}
      </div>
    </div>
  );
}

export default OtpSection;
