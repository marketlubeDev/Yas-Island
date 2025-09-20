import React, { useState, useEffect } from "react";
import ticketImg from "../../assets/images/yas.png";
import SmileSection from "./MobileComponents/SmileSectionMbl";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import MobileHeader from "../Home/MobileComponents/MobileHeader";
import thanksmile from "../../assets/icons/thanksmile.svg";

function PaymentResponseMobile() {
  const [selected, setSelected] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Scroll to top and prevent body scroll when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    // Prevent body scroll
    document.body.style.overflow = "hidden";

    // Cleanup: restore body scroll when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Handle countdown and redirect when thank you is shown
  useEffect(() => {
    if (showThankYou) {
      if (countdown === 0) {
        navigate("/");
        return;
      }
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showThankYou, countdown, navigate]);

  return (
    <>
      {/* <MobileHeader /> */}
      <div className="experience-outer-bg">
        <div className="experience-content-container">
          <div className="experience-content">
            {!showThankYou && (
              <>
                <img
                  src={ticketImg}
                  alt="Ticket"
                  className="experience-ticket-img"
                />
                <div className="experience-message">
                  {t("payment.response.ticketSent1")}
                  <br />
                  {t("payment.response.ticketSent2")}
                </div>
                <hr className="experience-divider" />
                <div className="experience-rate-title">
                  {t("payment.response.rateExperience")}
                </div>

                <SmileSection
                  selected={selected}
                  setSelected={setSelected}
                  setShowThankYou={setShowThankYou}
                  setCountdown={setCountdown}
                />
              </>
            )}

            {showThankYou && (
              <div className="experience-thankyou-container">
                <div className="experience-smiley-circle">
                  <img
                    src={thanksmile}
                    alt="Smiley"
                    className="experience-smiley-img"
                  />
                </div>
                <p className="experience-feedback-text">
                  {t("payment.response.thankYou")}
                </p>
                <p className="experience-feedback-text">
                  {t("payment.response.redirecting")} {countdown}{" "}
                  {t("payment.response.seconds")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentResponseMobile;
