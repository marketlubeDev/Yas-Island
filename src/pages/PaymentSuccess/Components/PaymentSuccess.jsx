import React, { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess({ onBack, onLottieClick }) {
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown === 0) {
      navigate("/payment-response");
      return;
    }
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);
  return (
    <div
      className="payment-success"
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Success Icon */}
      <div
        style={{
          width: 200,
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Success Animation */}
        <DotLottieReact
          src="https://lottie.host/dfefcc9b-253e-408d-870c-a4d1b14fd929/xfHI5sbgj4.lottie"
          loop
          autoplay
          onClick={onLottieClick}
        />
      </div>
      {/* Success Text */}
      <div
        style={{
          color: "var(--color-base-text)",
          fontSize: 24,
          fontWeight: 700,
        }}
      >
        {t("payment.success.title")}
      </div>
      <p className="payment-checkout__content--no-header__text">
        {t("payment.success.redirecting")} {countdown} {t("payment.success.seconds")}
      </p>
    </div>
  );
}
