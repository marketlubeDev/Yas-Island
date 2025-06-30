import React from "react";
import { useTranslation } from "react-i18next";
import smileGreen from "../../../../assets/images/green.png";
import smileYellow from "../../../../assets/images/yellow.jpg";
import smileRed from "../../../../assets/images/red.jpg";

function SmileSection({ selected, setSelected }) {
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
          <img src={smileGreen} alt="Excellent" />
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
          <img src={smileYellow} alt="Average" />
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
          <img src={smileRed} alt="Poor" />
        </div>
        <div>{t("payment.response.poor")}</div>
      </div>
    </div>
  );
}

export default SmileSection;
