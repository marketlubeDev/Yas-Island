import React from "react";
import CheckoutSteps from "../../PaymentCheckout/Components/CheckoutSteps";
import PaymentCheckHeading from "../../PaymentCheckout/Components/PaymentCheckHeading";
import PaymentDetails from "./PaymentDetails";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { setIsCartOpen } from "../../../global/cartSlice";
import leftIcon from "../../../assets/icons/left.svg";
import leftIconDark from "../../../assets/icons/invertLeft.svg";

export default function PaymentDetailsBody({ isCheckout }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  const currentLanguage = useSelector((state) => state.language.currentLanguage);
  
  const handleBackClick = () => {
    navigate("/email-verification");
  };

  const handleCheckoutBackClick = () => {
    // Analytics tracking
    try {
      // Emit analytics event if tracking is available
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'checkout_back_clicked', {
          event_category: 'checkout',
          event_label: 'back_button'
        });
      } else if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'checkout_back_clicked',
          event_category: 'checkout',
          event_label: 'back_button'
        });
      }
    } catch (error) {
      // Silently handle analytics errors
      console.debug('Analytics tracking error:', error);
    }

    // Check if we can go back in history
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // No history available, open cart modal (same as header "View Cart" button)
      dispatch(setIsCartOpen(true));
    }
  };

  const isRTL = i18n.language === "ar" || i18n.language === "العربية";
  const backIconSrc = isDarkMode ? leftIconDark : leftIcon;

  return (
    <div className="payment-checkout">
      <CheckoutSteps currentStep="details" />
      
      {/* Header with Back Button and Title (Desktop/Tablet only) */}
      <div className="payment-checkout__header-with-back">
        <button
          className={`checkout-back-button-circular ${isRTL ? "checkout-back-button-circular--rtl" : ""}`}
          onClick={handleCheckoutBackClick}
          data-testid="checkout-back-button"
          aria-label={t("common.back")}
        >
          <img
            src={backIconSrc}
            alt={t("payment.arrow")}
            className={`checkout-back-button-circular__icon ${isRTL ? "checkout-back-button-circular__icon--rtl" : ""}`}
          />
        </button>
        <h1 className="payment-checkout__title">{t("payment.title")}</h1>
      </div>

      {/* Mobile Header (unchanged) */}
      <div className="payment-checkout__header-mobile">
        <PaymentCheckHeading onBackClick={handleBackClick} />
      </div>

      <div className="payment-checkout__content payment-checkout__content--with-header">
        <PaymentDetails isCheckout={isCheckout} />
      </div>
    </div>
  );
}
