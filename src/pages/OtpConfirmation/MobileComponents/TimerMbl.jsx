import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function TimerMbl({ setIsExpired, handleResendOTP, timer, setTimer }) {
  const { t } = useTranslation();
  const [canResend, setCanResend] = useState(false);

  // Timer countdown
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
  }, [timer, setTimer, setIsExpired]);

  // Format timer as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="confirm-email__otp-actions">
      <span>
        {timer > 0
          ? t("payment.verification.willExpire")
          : t("payment.verification.expired")}
        &nbsp;{timer > 0 && <b>{formatTime(timer)}</b>}
      </span>
      <button
        className={`confirm-email__otp-resend ${!canResend ? "disabled" : ""}`}
        onClick={handleResendOTP}
        disabled={!canResend}
      >
        {t("payment.verification.resend")}
      </button>
    </div>
  );
}

export default TimerMbl;
