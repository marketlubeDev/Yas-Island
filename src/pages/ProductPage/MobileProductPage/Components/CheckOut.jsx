import React, { useState } from "react";
import PaymentHeader from "./PaymentHeader";
import { useTranslation } from "react-i18next";
import InputFields from "./InputFields";
import CheckOutSummary from "./CheckOutSummary";
import PromoBox from "./PromoBox";
import CheckBox from "./CheckBox";
import PromoCodePopup from "./PromoCode";

function CheckOut({ onProceedToPayment, onBack, onApplyPromo, promoApplied }) {
  const { t } = useTranslation();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [receiveComms, setReceiveComms] = useState(false);
  const [promo, setPromo] = useState("");
  const [showPromoPopup, setShowPromoPopup] = useState(false);

  const handleApplyPromo = () => {
    setShowPromoPopup(true);
    onApplyPromo();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (acceptTerms) {
      onProceedToPayment();
    }
  };

  return (
    <div className="email-checkout__overlay">
      <PaymentHeader step={2} onBack={onBack} />

      <div className="email-checkout__container">
        <div className="email-checkout__form-container">
          <form className="email-checkout__form" onSubmit={handleSubmit}>
            <div className="email-checkout__steps-underline"></div>

            <InputFields />

            <CheckOutSummary promoApplied={promoApplied} />

            <PromoBox
              promo={promo}
              setPromo={setPromo}
              onApplyPromo={handleApplyPromo}
            />
            <CheckBox
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
                border: "1px solid var(--color-checkout-summary-border)",
              }}
              disabled={!acceptTerms}
              onClick={() => {
                if (acceptTerms) {
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
        <PromoCodePopup onClose={() => setShowPromoPopup(false)} />
      )}
    </div>
  );
}

export default CheckOut;
