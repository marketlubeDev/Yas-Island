import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import updateSurvey from "../../../serivces/survey/survey";
import smileGreen from "../../../assets/images/green.png";
import smileDark from "../../../assets/images/happy.png";
import smileYellow from "../../../assets/images/yellow.jpg";
import smileYellowDark from "../../../assets/images/normal.png";
import smileRed from "../../../assets/images/red.jpg";
import smileRedDark from "../../../assets/images/sad.png";

function SmileSectionMbl({
  selected,
  setSelected,
  setShowThankYou,
  setCountdown,
}) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmojiClick = async (emojiType) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    // First set the selected state to show visual feedback
    setSelected(emojiType);

    try {
      const response = await updateSurvey(emojiType);
      if (response.status === 200) {
        setShowThankYou(true);
        setCountdown(3); // Reset countdown when thank you is shown
      }
    } catch (error) {
      toast.error(t("toastMessages.somethingWentWrong"), {
        position: "top-center",
      });
      // Reset selection on error
      setSelected(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="experience-rate-options"
      style={{
        pointerEvents: isSubmitting ? "none" : "auto",
        opacity: isSubmitting ? 0.7 : 1,
        transition: "opacity 0.3s",
      }}
    >
      <div
        className={`experience-rate-option${
          selected === "Satisfied" ? " selected-green" : ""
        }${isSubmitting && selected === "Satisfied" ? " submitting" : ""}`}
        onClick={() => handleEmojiClick("Satisfied")}
      >
        <div className="smile-circle">
          <img src={smileGreen} alt="Excellent" className="excellent-emoji" />
          <img
            src={smileDark}
            alt="Excellent Dark"
            className="excellent-emoji-dark"
          />
        </div>
        <div>{t("payment.response.excellent")}</div>
      </div>
      <div
        className={`experience-rate-option${
          selected === "Neutral" ? " selected-yellow" : ""
        }${isSubmitting && selected === "Neutral" ? " submitting" : ""}`}
        onClick={() => handleEmojiClick("Neutral")}
      >
        <div className="smile-circle">
          <img src={smileYellow} alt="Average" className="average-emoji" />
          <img
            src={smileYellowDark}
            alt="Average Dark"
            className="average-emoji-dark"
          />
        </div>
        <div>{t("payment.response.average")}</div>
      </div>
      <div
        className={`experience-rate-option${
          selected === "Unsatisfied" ? " selected-red" : ""
        }${isSubmitting && selected === "Unsatisfied" ? " submitting" : ""}`}
        onClick={() => handleEmojiClick("Unsatisfied")}
      >
        <div className="smile-circle">
          <img src={smileRed} alt="Poor" className="poor-emoji" />
          <img src={smileRedDark} alt="Poor Dark" className="poor-emoji-dark" />
        </div>
        <div>{t("payment.response.poor")}</div>
      </div>
    </div>
  );
}

export default SmileSectionMbl;
