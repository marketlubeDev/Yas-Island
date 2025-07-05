import React from "react";
import { useTranslation } from "react-i18next";
import smileGreen from "../../../assets/images/green.png";
import smileDark from "../../../assets/images/happy.png";
import smileYellow from "../../../assets/images/yellow.jpg";
import smileYellowDark from "../../../assets/images/normal.png";
import smileRed from "../../../assets/images/red.jpg";
import smileRedDark from "../../../assets/images/sad.png";

function SmileSectionMbl({ selected, setSelected }) {
  const { t } = useTranslation();

  return (
    <div className="experience-rate-options">
      <div
        className={`experience-rate-option${
          selected === "excellent" ? " selected-green" : ""
        }`}
        onClick={() => setSelected("excellent")}
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
          selected === "average" ? " selected-yellow" : ""
        }`}
        onClick={() => setSelected("average")}
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
          selected === "poor" ? " selected-red" : ""
        }`}
        onClick={() => setSelected("poor")}
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
