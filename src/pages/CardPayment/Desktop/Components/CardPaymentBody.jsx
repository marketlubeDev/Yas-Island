import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardPaymentDetail from "./CardPaymentDetail";
import OrderSummary from "../../../PaymentCheckout/Components/OrderSummary";
import CheckoutSteps from "../../../PaymentCheckout/Components/CheckoutSteps";
import leftIcon from "../../../../assets/icons/left.svg";
import leftIconDark from "../../../../assets/icons/invertLeft.svg";
import { useTranslation } from "react-i18next";

export default function CardPaymentBody({ isCheckout }) {
  const navigate = useNavigate();
  const orderData = useSelector((state) => state.order.orderData);
  const { t, i18n } = useTranslation();
  const checkout = useSelector((state) => state.checkout);
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  const { isSmallPhone, isPhone, isTablets } = useSelector(
    (state) => state.responsive
  );
  const isRTL = i18n.language === "ar" || i18n.language === "العربية";

  const [formData, setFormData] = useState({
    firstName: checkout?.firstName || "",
    lastName: checkout?.lastName || "",
    country: checkout?.country || "",
    nationality: checkout?.nationality || "",
    email: checkout?.emailId || "",
    phoneCode: "+971",
    phoneNumber: checkout?.phoneNumber || "971",
    promoCode: checkout?.promoCode || "",
  });

  const handleBackClick = () => {
    // Navigate back to payment details
    navigate("/payment-details");
  };

  const handlePaymentComplete = () => {
    // Navigate to payment success
    navigate("/payment-success", { replace: true });
  };

  const handleCheckoutBackClick = () => {
    // Analytics tracking
    try {
      // Emit analytics event if tracking is available
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "checkout_back_clicked", {
          event_category: "checkout",
          event_label: "back_button",
        });
      } else if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "checkout_back_clicked",
          event_category: "checkout",
          event_label: "back_button",
        });
      }
    } catch (error) {
      // Silently handle analytics errors
      console.debug("Analytics tracking error:", error);
    }

    // Check if we can go back in history
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // No history available, open cart modal (same as header "View Cart" button)
      dispatch(setIsCartOpen(true));
    }
  };
  const backIconSrc = isDarkMode ? leftIconDark : leftIcon;
  const isMobile = isSmallPhone || isPhone || isTablets;

  return (
    <div className="payment-checkout">
      {!isMobile && <CheckoutSteps currentStep="card" />}
      <div
        className="payment-checkout__header-with-back"
        // style={{ opacity: "0" }}
      >
        <button
          className={`checkout-back-button-circular ${
            isRTL ? "checkout-back-button-circular--rtl" : ""
          }`}
          onClick={handleCheckoutBackClick}
          data-testid="checkout-back-button"
          aria-label={t("common.back")}
        >
          <img
            src={backIconSrc}
            alt={t("payment.arrow")}
            className={`checkout-back-button-circular__icon ${
              isRTL ? "checkout-back-button-circular__icon--rtl" : ""
            }`}
          />
        </button>
        <h1 className="payment-checkout__title">
          {t("payment.cardPayment.title")}
        </h1>
      </div>
      <div className="payment-checkout__content payment-checkout__content--with-header">
        <CardPaymentDetail
          onBack={handleBackClick}
          onPaymentComplete={handlePaymentComplete}
          orderData={orderData}
        />
        <div className="order-summary-container">
          <OrderSummary
            formData={formData}
            setFormData={setFormData}
            checkout={checkout}
            showPromoCode={false}
            isCheckout={isCheckout}
          />
        </div>
      </div>
    </div>
  );
}
