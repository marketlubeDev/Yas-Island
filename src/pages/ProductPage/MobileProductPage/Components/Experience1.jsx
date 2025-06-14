import React, { useState, useEffect } from "react";
import MobileHeader from "./MobileHeader"; // Adjust the import path as needed
import ticketImg from "../../../../assets/images/ticket.svg"; // Replace with your actual ticket image path
import smileGreen from "../../../../assets/images/green.png";
import smileYellow from "../../../../assets/images/yellow.jpg";
import smileRed from "../../../../assets/images/red.jpg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Experience1() {
  const [selected, setSelected] = useState(null); // 'excellent', 'average', 'poor'
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (selected) {
      const timer = setTimeout(() => {
        navigate("/product"); // Go to MobileProductList page
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [selected, navigate]);

  return (
    <div className="experience-outer-bg">
      <div className="experience-content-container">
        <div className="experience-content">
          <img src={ticketImg} alt="Ticket" className="experience-ticket-img" />
          <div className="experience-message">
            {t("payment.response.ticketSent1")}
            <br />
            {t("payment.response.ticketSent2")}
          </div>
          <hr className="experience-divider" />
          <div className="experience-rate-title">
            {t("payment.response.rateExperience")}
          </div>
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
          {selected && (
            <div style={{ marginTop: 24, color: "#bdbdc6", fontSize: 15 }}>
              {t("payment.response.thankYou")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Experience1;
