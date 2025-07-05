import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function TimerMbl({ onResend  , setIsExpired , handleResendOTP , timer , setTimer }) {
  const { t } = useTranslation();
 // 3 minutes in seconds

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
    else{
      setIsExpired(true);
    }
  }, [timer]);

  // Format timer as MM:SS
  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;



  return (
    <div className="confirm-email__otp-actions">
      <span>
        {t("payment.verification.willExpire")} <b>{formatTime(timer)}</b>
      </span>
      <button
        className="confirm-email__otp-resend"
        onClick={handleResendOTP}
        disabled={timer > 0}
      >
        {t("payment.verification.resend")}
      </button>
    </div>
  );
}

export default TimerMbl;
