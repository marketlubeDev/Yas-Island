import React from "react";
import { useTranslation } from "react-i18next";

export default function CheckoutSteps({ currentStep, style }) {
  const { t } = useTranslation();

  const getStepStatus = (step) => {
    switch (currentStep) {
      case "email":
        return step === 1 ? "active" : "inactive";
      case "details":
        return step === 2 ? "active" : "inactive";
      case "card":
        return step === 3 ? "active" : "inactive";
      case "success":
      case "response":
        return step === 3 ? "active" : "inactive";
      default:
        return step === 1 ? "active" : "inactive";
    }
  };

  return (
    <div className="payment-checkout__steps" style={style}>
      <div className={`step ${getStepStatus(1)}`}>
        <span>{t("payment.steps.step1")}</span>
        <h2>{t("payment.steps.emailVerification")}</h2>
        <div
          className={`step-line ${
            getStepStatus(1) === "inactive" ? "inactive" : ""
          }`}
        ></div>
      </div>
      <div className={`step ${getStepStatus(2)}`}>
        <span>{t("payment.steps.step2")}</span>
        <h2>{t("payment.steps.guestDetails")}</h2>
        <div
          className={`step-line ${
            getStepStatus(2) === "inactive" ? "inactive" : ""
          }`}
        ></div>
      </div>
      <div className={`step ${getStepStatus(3)}`}>
        <span>{t("payment.steps.step3")}</span>
        <h2>{t("payment.steps.payment")}</h2>
        <div
          className={`step-line ${
            getStepStatus(3) === "inactive" ? "inactive" : ""
          }`}
        ></div>
      </div>
    </div>
  );
}
