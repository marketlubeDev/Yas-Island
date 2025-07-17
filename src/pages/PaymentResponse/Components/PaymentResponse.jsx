import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Ticket from "../../../assets/icons/ticket.svg";
import Excellent from "../../../assets/icons/great.svg";
import Average from "../../../assets/icons/smile.svg";
import Poor from "../../../assets/icons/poor.svg";
import { useNavigate } from "react-router-dom";
import thanksmile from "../../../assets/icons/thanksmile.svg";
import updateSurvey from "../../../serivces/survey/survey";
import { toast } from "sonner";

export default function PaymentResponse() {
  const { t } = useTranslation();
  const [selectedEmoji, setSelectedEmoji] = useState(null); // 'excellent', 'average', 'poor', or null
  const emojiRef = useRef(null);
  const navigate = useNavigate();
  const [showThankYou, setShowThankYou] = useState(false);
  const [countdown, setCountdown] = useState(3); // Add countdown state
  const [isSubmitting, setIsSubmitting] = useState(false); // Add isSubmitting state

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setSelectedEmoji(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const handleEmojiClick = async (emojiType) => {
    if (isSubmitting) return; // Prevent double click
    setIsSubmitting(true);
    try {
      const response = await updateSurvey(emojiType);
      if (response.status === 200) {
        setShowThankYou(true);
        setSelectedEmoji(emojiType === selectedEmoji ? null : emojiType);
        setCountdown(3); // Reset countdown when thank you is shown
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data);
    } finally {
      setIsSubmitting(false);
    }
    // Remove navigate timeout from here, handled by countdown
  };

  return (
    <div className="payment-response">
      {!showThankYou && (
        <>
          <div className="ticket-section">
            <img src={Ticket} alt="Ticket" />
            <div className="ticket-message">
              {t("payment.response.ticketSent")}
            </div>
          </div>
          <hr className="divider" />
          <div className="feedback-section">
            <div className="feedback-title">
              {t("payment.response.rateExperience")}
            </div>

            <div
              className="feedback-options"
              ref={emojiRef}
              style={{
                pointerEvents: isSubmitting ? "none" : "auto",
                opacity: isSubmitting ? 0.5 : 1,
                transition: "opacity 0.3s"
              }}
            >
              <div
                className="option"
                onClick={() => handleEmojiClick("Satisfied")}
              >
                <img
                  className="emoji green"
                  src={Excellent}
                  alt={t("payment.response.excellent")}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedEmoji === "excellent" ? "green" : "#e1f1ff",
                    transition: "background-color 0.3s ease",
                  }}
                />
                <div className="label">{t("payment.response.excellent")}</div>
              </div>
              <div
                className="option"
                onClick={() => handleEmojiClick("Neutral")}
              >
                <img
                  className="emoji yellow"
                  src={Average}
                  alt={t("payment.response.average")}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedEmoji === "average" ? "#FFBE0B" : "#e1f1ff",
                    transition: "background-color 0.3s ease",
                  }}
                />
                <div className="label">{t("payment.response.average")}</div>
              </div>
              <div className="option" onClick={() => handleEmojiClick("Unsatisfied")}>
                <img
                  className="emoji red"
                  src={Poor}
                  alt={t("payment.response.poor")}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedEmoji === "poor" ? "#F42E48" : "#e1f1ff",
                    transition: "background-color 0.3s ease",
                  }}
                />
                <div className="label">{t("payment.response.poor")}</div>
              </div>
            </div>

            {/* <hr className="divider" /> */}
          </div>
        </>
      )}
      {showThankYou && (
        <div className="thankyou-container">
          <div className="smiley-circle">
            <img src={thanksmile} alt="Smiley" className="smiley-img" />
          </div>
          <p className="feedback-text">{t("payment.response.thankYou")}</p>
          <p className="feedback-text">{t("payment.response.redirecting")} {countdown} {t("payment.response.seconds")}</p>

        </div>
      )}
    </div>
  );
}
