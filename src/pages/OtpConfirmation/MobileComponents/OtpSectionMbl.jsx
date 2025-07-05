import React, {  useRef } from "react";
import { useTranslation } from "react-i18next";

function OtpSectionMbl({ onOtpComplete , otp , setOtp  , isExpired }) {
  const { t } = useTranslation(); 
  const inputRefs = useRef([]);

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
      inputRefs.current[currentIndex + 1]?.focus();
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
      inputRefs.current[currentIndex - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((value, index) => {
      if (index < 6) {
        newOtp[index] = value;
      }
    });
    setOtp(newOtp);

    // Focus the next empty input or the last input if all are filled
    const nextEmptyIndex = newOtp.findIndex((val) => !val);
    if (nextEmptyIndex !== -1 && nextEmptyIndex < 6) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }

    // Check if OTP is complete after pasting
    const completedOtp = newOtp.join("");
    if (completedOtp.length === 6 && onOtpComplete) {
      onOtpComplete(completedOtp);
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
            ref={(el) => (inputRefs.current[idx] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className="confirm-email__otp-input"
            value={digit}
            onChange={(e) => handleOtpChange(e.target.value, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onPaste={handlePaste}
            autoComplete="off"  
            disabled={isExpired}
          />
        ))}
      </div>
    </div>
  );
}

export default OtpSectionMbl;
