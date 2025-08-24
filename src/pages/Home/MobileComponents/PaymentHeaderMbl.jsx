import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import backIcon from "../../../assets/icons/back.svg";
import backIconInverter from "../../../assets/icons/invertedback.svg";
import { useSelector } from "react-redux";

function PaymentHeaderMbl({ step }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  const backIconSrc = isDarkMode ? backIconInverter : backIcon;
  const isRTL = i18n.language === "ar" || i18n.language === "العربية";

  return (
    <>
      <div className="payment-header__container">
        <div className="payment-header__title">
          {t("payment.steps.guestDetails")}
        </div>

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
            <span style={{ fontWeight: "500" }}>
              {t("payment.steps.step1")}
            </span>

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
            <span style={{ fontWeight: "500" }}>
              {t("payment.steps.step2")}
            </span>

            <span style={{ fontWeight: "600" }}>
              {t("payment.steps.checkout")}
            </span>
          </div>
        </div>
        <div
          className={`payment-header__steps-divider payment-header__steps-divider--step${step}`}
        ></div>
      </div>
    </>
  );
}

export default PaymentHeaderMbl;
