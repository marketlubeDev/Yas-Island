import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import backIcon from "../../../../assets/icons/back.svg";
import backIconInverter from "../../../../assets/icons/invertedback.svg";
import { useSelector } from "react-redux";

function PaymentHeader({ step, onBack }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  const backIconSrc = isDarkMode ? backIconInverter : backIcon;

  const handleBack = () => {
    switch (step) {
      case 1:
      case 2:
      case 3:
        if (onBack) {
          onBack();
        }
        break;
      default:
        navigate(-1);
    }
  };

  return (
    <>
      <div className="payment-header__container">
        <div className="payment-header__title">
          {t("payment.steps.guestDetails")}
        </div>
        <button
          className="payment-header__back-button"
          onClick={handleBack}
          type="button"
        >
          <img
            src={backIconSrc}
            alt={t("payment.back")}
            style={{ width: 24, height: 24 }}
          />
        </button>
        <div className="payment-header__steps-container">
          <div
            style={{
              color:
                step === 1
                  ? "var(--color-base-text)"
                  : "var(--color-base-text-secondary)",
            }}
            className={`payment-header__step payment-header__step--email${
              step === 1 ? " payment-header__step--active" : ""
            }`}
          >
            {t("payment.steps.step1")}
            <br />
            <span>{t("payment.steps.emailVerification")}</span>
          </div>
          <div
            style={{
              color:
                step === 2
                  ? "var(--color-base-text)"
                  : "var(--color-base-text-secondary)",
            }}
            className={`payment-header__step payment-header__step--checkout${
              step === 2 ? " payment-header__step--active" : ""
            }`}
          >
            {t("payment.steps.step2")}
            <br />
            <span>{t("payment.steps.checkout")}</span>
          </div>
        </div>
        <div
          className={`payment-header__steps-divider payment-header__steps-divider--step${step}`}
        ></div>
      </div>
    </>
  );
}

export default PaymentHeader;
