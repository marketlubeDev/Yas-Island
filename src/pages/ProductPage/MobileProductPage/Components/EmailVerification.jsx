import React, { useState } from "react";
import MobileHeader from "./MobileHeader"; // Adjust the import path as needed
import ConfirmEmail from "./ConfirmEmail";
import backIcon from "../../../../assets/icons/back.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function EmailVerification({ onClose, onConfirmEmail, onBack }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState("vivek@dev.panashi.ae");
  const [step, setStep] = useState(1); // 1 = email, 2 = confirm email
  const [showEmailVerification, setShowEmailVerification] = useState(true);
  const [showConfirmEmail, setShowConfirmEmail] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowEmailVerification(true);
    setShowConfirmEmail(true);
    setStep(2);
  };

  return (
    <>
      <MobileHeader className="mobile-header-email-verification" />
      <div className="page-bg">
        <div className="modal-bg">
          <div className="modal-content">
            {showEmailVerification && (
              <div className="outer-modal-bg">
                <form
                  className="email-verification__form"
                  onSubmit={handleSubmit}
                >
                  <div className="email-verification__title">
                    {t("payment.emailConfirmation.title")}
                  </div>
                  <button
                    className="email-verification__back-btn"
                    onClick={() => {
                      if (onBack) {
                        onBack();
                      } else {
                        navigate(-1); // Go back to previous page
                      }
                    }}
                    type="button"
                  >
                    <img
                      src={backIcon}
                      alt={t("payment.back")}
                      style={{ width: 24, height: 24 }}
                    />
                  </button>
                  <div className="email-verification__steps">
                    <div
                      className={
                        "email-verification__step" +
                        (step === 1 ? " email-verification__step--active" : "")
                      }
                    >
                      {t("payment.steps.step1")}
                      <br />
                      <span>{t("payment.steps.emailVerification")}</span>
                    </div>
                    <div
                      className={
                        "email-verification__step" +
                        (step === 2 ? " email-verification__step--active" : "")
                      }
                    >
                      {t("payment.steps.step2")}
                      <br />
                      <span>
                        {t("payment.emailConfirmation.confirmButton")}
                      </span>
                    </div>
                  </div>

                  <div className="email-verification__step-underline"></div>
                  <div className="email-verification-form-box">
                    <label className="email-verification-label">
                      {t("payment.emailConfirmation.emailLabel")}
                    </label>
                    <input
                      type="email"
                      className="email-verification-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t(
                        "payment.emailConfirmation.emailPlaceholder"
                      )}
                      required
                    />
                    <button
                      className="email-verification-confirm-btn"
                      type="submit"
                    >
                      {t("payment.emailConfirmation.confirmButton")}
                    </button>
                  </div>
                </form>
              </div>
            )}
            {showConfirmEmail && (
              <ConfirmEmail
                onBack={() => {
                  setShowConfirmEmail(false);
                  setShowEmailVerification(true);
                  setStep(1);
                }}
                onConfirm={() => {
                  if (onConfirmEmail) onConfirmEmail();
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EmailVerification;
