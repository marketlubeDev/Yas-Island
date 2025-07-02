import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { validateOTP } from "../../../utils/OTPvalidate";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function VerificationBox({ email, onResendOTP }) {
  const { t } = useTranslation();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const { OTP } = useSelector((state) => state.otp);
  const navigate = useNavigate();
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleResendOTP = () => {
    if (!canResend) return;
    // onResendOTP?.();
    setTimer(120);
    setCanResend(false);
  };

  const handleChange = (element, index) => {
    const value = element.value;  
    // Allow only numbers
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If current input is empty and backspace is pressed, move to previous input
        inputRefs.current[index - 1].focus();
      }
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
        inputRefs.current[index].value = value;
      }
    });
    setOtp(newOtp);

    // Focus on the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex(val => !val);
    if (nextEmptyIndex !== -1 && nextEmptyIndex < 6) {
      inputRefs.current[nextEmptyIndex].focus();
    } else {
      inputRefs.current[5].focus();
    }
  };

  const handleConfirmEmail = async () => {
    const otpString = otp.join("");
    if(otpString.length !== 6){
      toast.error("Please enter a valid OTP");
      return;
    }
    const isValid = await validateOTP(otpString, OTP);
    if (isValid) {
      navigate("/payment-details");
    } else {
      toast.error("OTP is incorrect ❌");
    }
  };

  return (
    <div className="verification-containerBox">
      <p className="verification-text">
        {t("payment.verification.codeSent")}{" "}
        <span className="email" style={{ textDecoration: "underline" }}>
          {email}
        </span>
      </p>
      <p className="spam-notice">{t("payment.verification.checkSpam")}</p>

      <div className="verification-container">
        <p className="verification-label">
          {t("payment.verification.enterCode")}
        </p>
        <div className="code-inputs">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="code-input"
              value={otp[index]}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              ref={(ref) => (inputRefs.current[index] = ref)}
              inputMode="numeric"
              pattern="\d*"
              autoComplete="off"
            />
          ))}
        </div>
      </div>

      <button className="confirm-button" onClick={handleConfirmEmail}>
        {t("payment.emailConfirmation.confirmButton")}
      </button>
      <div className="timer-section">
        <span className="expire-text">
          {t("payment.verification.willExpire")}
        </span>
        <span className="timer">{formatTime(timer)}</span>
        <button 
          className={`resend-btn ${!canResend ? 'disabled' : ''}`} 
          onClick={handleResendOTP}
          disabled={!canResend}
        >
          {t("payment.verification.resend")}
        </button>
      </div>
    </div>
  );
}
