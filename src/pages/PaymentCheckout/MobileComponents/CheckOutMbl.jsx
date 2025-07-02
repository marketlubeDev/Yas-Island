import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import InputFieldsMbl from "./InputFieldsMbl";
import CheckOutSummaryMbl from "./CheckOutSummaryMbl";
import PromoBoxMbl from "./PromoBoxMbl";
import CheckBoxMbl from "./CheckBoxMbl";
import PromoCodeMbl from "./PromoCodeMbl";
import PaymentHeaderMbl from "./PaymentHeaderMbl";

function CheckOutMbl({
  onProceedToPayment,
  onBack,
  onApplyPromo,
  promoApplied,
}) {
  const { t } = useTranslation();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [receiveComms, setReceiveComms] = useState(false);
  const [promo, setPromo] = useState("");
  const [showPromoPopup, setShowPromoPopup] = useState(false);

  const handleApplyPromo = () => {
    setShowPromoPopup(true);
    onApplyPromo();
    console.log("Applying promo code:", promo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (acceptTerms) {
      window.scrollTo(0, 0);
      onProceedToPayment();
    }
  };

  return (
    <div className="email-checkout__overlay">
      <PaymentHeaderMbl step={2} onBack={onBack} />

      <div className="email-checkout__container">
        <div className="email-checkout__form-container">
          <form className="email-checkout__form" onSubmit={handleSubmit}>
            <div className="email-checkout__steps-underline"></div>

            <InputFieldsMbl />

            <CheckOutSummaryMbl promoApplied={promoApplied} />

            <PromoBoxMbl
              promo={promo}
              setPromo={setPromo}
              onApplyPromo={handleApplyPromo}
            />
            <CheckBoxMbl
              acceptTerms={acceptTerms}
              setAcceptTerms={setAcceptTerms}
              receiveComms={receiveComms}
              setReceiveComms={setReceiveComms}
            />

            <button
              className="email-checkout__btn"
              type="button"
              style={{
                backgroundColor: "var(--color-email-form-confirm-btn)",
                color: "var(--color-email-form-confirm-btn-clr)",
              }}
              disabled={!acceptTerms}
              onClick={() => {
                if (acceptTerms) {
                  window.scrollTo(0, 0);
                  onProceedToPayment();
                }
              }}
            >
              {t("payment.paymentDetails.proceedToPayment")}
            </button>
          </form>
        </div>
      </div>

      {showPromoPopup && (
        <PromoCodeMbl onClose={() => setShowPromoPopup(false)} />
      )}
    </div>
  );
}

export default CheckOutMbl;
