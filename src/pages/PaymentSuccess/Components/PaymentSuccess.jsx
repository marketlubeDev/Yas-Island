import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useTranslation } from "react-i18next";

export default function PaymentSuccess() {
  const { t } = useTranslation();
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
    </div>
  );
}
