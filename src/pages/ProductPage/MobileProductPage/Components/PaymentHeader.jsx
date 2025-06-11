import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import backIcon from "../../../../assets/icons/back.svg";

function paymentHeader({ step, onBack }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBack = () => {
    switch (step) {
      case 1: // Email verification page
        // Go back to booking modal
        if (onBack) {
          onBack();
        }
        break;
      case 2: // Confirm email page
        // Go back to email verification
        navigate("/email-verification");
        break;
      case 3: // Checkout page
        // Go back to confirm email
        navigate("/confirm-email");
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
            src={backIcon}
            alt={t("payment.back")}
            style={{ width: 24, height: 24 }}
          />
        </button>
        <div className="payment-header__steps-container">
          <div
            className={`payment-header__step payment-header__step--email${
              step === 1 ? " payment-header__step--active" : ""
            }`}
          >
            {t("payment.steps.step1")}
            <br />
            <span>{t("payment.steps.emailVerification")}</span>
          </div>
          <div
            className={`payment-header__step payment-header__step--checkout${
              step === 2 ? " payment-header__step--active" : ""
            }`}
          >
            {t("payment.steps.step2")}
            <br />
            <span>{t("payment.steps.checkout")}</span>
          </div>
        </div>
        <div className="payment-header__steps-divider"></div>
      </div>
    </>
  );
}

export default paymentHeader;
