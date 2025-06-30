import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function Timer({ onResend }) {
  const { t } = useTranslation();
  const [timer, setTimer] = useState(180); // 3 minutes in seconds

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

  return (
    <div className="confirm-email__otp-actions">
      <span>
        {t("payment.verification.willExpire")} <b>{formatTime(timer)}</b>
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
  );
}

export default Timer;
