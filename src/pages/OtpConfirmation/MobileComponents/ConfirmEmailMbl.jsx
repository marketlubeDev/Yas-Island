import React from "react";
import { useTranslation } from "react-i18next";
import PaymentHeaderMbl from "../../Home/MobileComponents/PaymentHeaderMbl";
import OtpSectionMbl from "./OtpSectionMbl";
import TimerMbl from "./TimerMbl";
import OtpFormMbl from "./OtpFormMbl";

function ConfirmEmailMbl({
  email ,
  onBack,
}) {
  const { t } = useTranslation();

  return (
    <div className="confirm-email__overlay">
      <div className="confirm-email__modal">
        <PaymentHeaderMbl step={1} onBack={onBack} />
        <div className="confirm-email__content">
          <div className="confirm-email__form-container">
            <div className="confirm-email__label">
              {t("payment.emailConfirmation.emailLabel")}
            </div>
            <div className="confirm-email__input-underline">{email}</div>
            <OtpSectionMbl />
            <div className="confirm-email__otp-info">
              {t("payment.verification.codeSent")} <span>{email}</span>
              <br />
              <div className="confirm-email__otp-warning">
                {t("payment.verification.checkSpam")}
              </div>
            </div>
            <TimerMbl />
            <OtpFormMbl />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmEmailMbl;
