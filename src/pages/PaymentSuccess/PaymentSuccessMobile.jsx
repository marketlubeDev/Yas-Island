import React from "react";
import { useTranslation } from "react-i18next";
import MobileHeader from "../Home/MobileComponents/MobileHeader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PaymentSuccessMobile() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const timeout = setTimeout(() => {
      navigate("/payment-response");
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <MobileHeader />
      <div className="payment-success-modal-container">
        <div className="payment-success-modal">
          <div className="payment-success-icon">
            {/* Inline SVG for checkmark */}
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="32" fill="#2ECC71" />
              <path
                d="M20 34L29 43L44 27"
                stroke="#fff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            className="payment-success-message"
            style={{ cursor: "pointer" }}
            // onClick={onShowExperience}
            onClick={() => {
              navigate("/payment-response");
            }}  
          >
            {t("payment.success.title")}
          </div>
        </div>{" "}
      </div>
    </>
  );
}

export default PaymentSuccessMobile;
