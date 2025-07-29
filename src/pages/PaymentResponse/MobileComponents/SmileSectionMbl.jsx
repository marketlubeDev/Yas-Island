import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import updateSurvey from "../../../serivces/survey/survey";
import smileGreen from "../../../assets/images/green.png";
import smileDark from "../../../assets/images/happy.png";
import smileYellow from "../../../assets/images/yellow.jpg";
import smileYellowDark from "../../../assets/images/normal.png";
import smileRed from "../../../assets/images/red.jpg";
import smileRedDark from "../../../assets/images/sad.png";

function SmileSectionMbl({ selected, setSelected }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmojiClick = async (emojiType) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await updateSurvey(emojiType);
      if (response.status === 200) {
        setSelected(emojiType);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="experience-rate-options">
      <div
        className={`experience-rate-option${
          selected === "Satisfied" ? " selected-green" : ""
        }`}
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
        }`}
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
        }`}
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
