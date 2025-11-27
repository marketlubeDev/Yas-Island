import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardPaymentDetail from "../../CardPayment/Desktop/Components/CardPaymentDetail";
import OrderSummaryFailed from "../Components/ordersummaryFailed";
import CheckoutSteps from "../../PaymentCheckout/Components/CheckoutSteps";
import leftIcon from "../../../assets/icons/left.svg";
import leftIconDark from "../../../assets/icons/invertLeft.svg";
import { useTranslation } from "react-i18next";

export default function PaymentFailed({ isCheckout }) {
  const navigate = useNavigate();
  const orderData = useSelector((state) => state.order.orderData);
  const { t, i18n } = useTranslation();
  const checkout = useSelector((state) => state.checkout);
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  const { theme } = useSelector((state) => state.accessibility);

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
    navigate("/");
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
      <div className="payment-checkout__header-with-back">
        <h1 className="payment-checkout__title">
          {t("payment.cardPayment.title")}
        </h1>
      </div>
      <div className="payment-checkout__back-button-mbl">
        <button className="back-button-mbl" onClick={handleCheckoutBackClick}>
          <img src={backIconSrc} alt={t("payment.arrow")} />
        </button>
      </div>
      <div className="payment-checkout__content payment-checkout__content--with-header">
        <>
          {" "}
          <div className="payment-container">
            <div className="payfort-container">
              <div
                className={`iframe-container ${theme}`}
                style={{
                  borderRadius: "0rem",
                  minHeight: "34rem",
                  height: "34rem",
                  position: "relative",
                  overflow: "hidden",
                  backgroundColor: isDarkMode
                    ? "#1f1f1f !important"
                    : "#ffffff !important",
                  background: isDarkMode
                    ? "#1f1f1f !important"
                    : "#ffffff !important",
                }}
              >
                <div
                  role="alert"
                  aria-live="assertive"
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "16px",
                    background: isDarkMode ? "black" : "white",
                    zIndex: 2,
                    backdropFilter: "blur(2px)",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      maxWidth: 560,
                      borderRadius: 12,
                      background: isDarkMode ? "#1f1f1f" : "#fff",
                      border: isDarkMode
                        ? "1px solid #4a2c2c"
                        : "1px solid #ffd6d6",
                      boxShadow: isDarkMode
                        ? "0 10px 24px rgba(0,0,0,.3)"
                        : "0 10px 24px rgba(0,0,0,.08)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "12px 16px",
                        background: isDarkMode ? "#2d1b1b" : "#fff5f5",
                        borderBottom: isDarkMode
                          ? "1px solid #4a2c2c"
                          : "1px solid #ffd6d6",
                      }}
                    >
                      <div
                        aria-hidden="true"
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 9999,
                          background: isDarkMode ? "#4a2c2c" : "#ffe3e3",
                          display: "grid",
                          placeItems: "center",
                          color: "#c53030",
                          fontWeight: 800,
                          fontSize: 18,
                        }}
                      >
                        !
                      </div>
                      <div
                        style={{
                          fontWeight: 700,
                          color: isDarkMode ? "#ffffff" : "#1a1a1a",
                        }}
                      >
                        {t("payment.cardPayment.errorTitle", {
                          defaultValue: "Payment was rejected",
                        })}
                      </div>
                    </div>
                    <div
                      style={{
                        padding: "14px 16px",
                        color: isDarkMode ? "#b3b3b3" : "#4a5568",
                      }}
                    >
                      {t("payment.cardPayment.errorMessage", {
                        defaultValue:
                          "The order could not be completed. Please contact our support.",
                      })}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        justifyContent: "flex-end",
                        padding: "12px 16px",
                        background: isDarkMode ? "#262626" : "#fafafa",
                        borderTop: isDarkMode
                          ? "1px solid #404040"
                          : "1px solid #eee",
                      }}
                    >
                      <button
                        type="button"
                        onClick={handleBackClick}
                        style={{
                          background: isDarkMode ? "#404040" : "#fff",
                          color: isDarkMode ? "#ffffff" : "#1a1a1a",
                          border: isDarkMode
                            ? "1px solid #525252"
                            : "1px solid #ddd",
                          borderRadius: 8,
                          padding: ".55rem 1rem",
                          cursor: "pointer",
                        }}
                      >
                        {t("payment.cardPayment.backToDetails", {
                          defaultValue: "Back to details",
                        })}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
        <div className="order-summary-container">
          <OrderSummaryFailed
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
