import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { validateOTP } from "../../../utils/OTPvalidate";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useVerification from "../../../apiHooks/email/verification";
import { setOtp } from "../../../global/otpSlice";
import {
  setIsEmailVerification,
  setVerificationEmail,
} from "../../../global/cartSlice";
import { setCheckoutEmail } from "../../../global/checkoutSlice";

export default function VerificationBox({ email }) {
  const dispatch = useDispatch();
  const { mutate: verification, isPending } = useVerification();
  const { t } = useTranslation();
  const [otp, setOtpInput] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const { OTP } = useSelector((state) => state.otp);
  const navigate = useNavigate();
  const [timer, setTimer] = useState(180); // 3 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            setIsExpired(true);
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
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleResendOTP = () => {
    if (!canResend) return;

    verification(email, {
      onSuccess: (res) => {
        dispatch(setOtp({ email: email, OTP: res.hashedOTP }));
        setTimer(120);
        setCanResend(false);
        setIsExpired(false);
        setOtpInput(new Array(6).fill(""));
      },
      onError: (error) => {
        console.log(error, "error>>");
      },
    });
  };

  const handleChange = (element, index) => {
    if (isExpired) return;
    const value = element.value;
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtpInput(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (isExpired) return;
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    if (isExpired) {
      e.preventDefault();
      return;
    }
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
    setOtpInput(newOtp);

    const nextEmptyIndex = newOtp.findIndex((val) => !val);
    if (nextEmptyIndex !== -1 && nextEmptyIndex < 6) {
      inputRefs.current[nextEmptyIndex].focus();
    } else {
      inputRefs.current[5].focus();
    }
  };

  const handleConfirmEmail = async () => {
    if (email === "") {
      toast.error("Please enter a valid email");
      navigate("/email-verification");
      return;
    }
    if (isExpired) {
      toast.error("OTP has expired. Please request a new one.");
      return;
    }
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter a valid OTP");
      return;
    }
    const isValid = await validateOTP(otpString, OTP);
    if (isValid) {
      dispatch(setIsEmailVerification(true));
      dispatch(setVerificationEmail(email));
      dispatch(setCheckoutEmail(email));
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
        </span>{" "}
        <button
          onClick={() => navigate("/email-verification")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0 0 0 5px",
            color: "#0066cc",
            fontSize: "14px",
            textDecoration: "underline",
            fontWeight: "500",
          }}
        >
          {t("payment.verification.editEmail")}
        </button>
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
              className={`code-input ${isExpired ? "expired" : ""}`}
              value={otp[index]}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              ref={(ref) => (inputRefs.current[index] = ref)}
              inputMode="numeric"
              pattern="\d*"
              autoComplete="off"
              disabled={isExpired}
            />
          ))}
        </div>
      </div>

      <div className="timer-section">
        <span className="expire-text">
          {isExpired
            ? t("payment.verification.expired")
            : t("payment.verification.willExpire")}
        </span>
        <span className="timer">{!isExpired && formatTime(timer)}</span>
        <button
          className={`resend-btn ${!canResend ? "disabled" : ""}`}
          onClick={handleResendOTP}
          disabled={!canResend}
        >
          {t("payment.verification.resend")}
        </button>
      </div>

      <button
        className={`confirm-button ${isExpired ? "disabled" : ""}`}
        onClick={handleConfirmEmail}
        disabled={isExpired}
      >
        {t("payment.emailConfirmation.confirmButton")}
      </button>
    </div>
  );
}
