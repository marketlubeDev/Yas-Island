import React, { useState } from "react";
import ticketImg from "../../assets/images/ticket.svg";
import SmileSection from "./MobileComponents/SmileSectionMbl";
import { useTranslation } from "react-i18next";
import MobileHeader from "../Home/MobileComponents/MobileHeader";

function PaymentResponseMobile() {
  const [selected, setSelected] = useState(null); // 'excellent', 'average', 'poor'
  const { t } = useTranslation();

  return (
    <>
      <MobileHeader />
      <div className="experience-outer-bg">
        <div className="experience-content-container">
          <div className="experience-content">
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

            <SmileSection selected={selected} setSelected={setSelected} />

            {selected && (
              <div style={{ marginTop: 24, color: "#bdbdc6", fontSize: 15 }}>
                {t("payment.response.thankYou")}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentResponseMobile;
