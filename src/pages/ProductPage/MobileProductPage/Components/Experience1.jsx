import React, { useState } from "react";
import MobileHeader from "./MobileHeader"; // Adjust the import path as needed
import ticketImg from "../../../../assets/images/ticket.svg"; // Replace with your actual ticket image path
import smileGreen from "../../../../assets/images/green.png";
import smileYellow from "../../../../assets/images/yellow.jpg";
import smileRed from "../../../../assets/images/red.jpg";

function Experience1() {
  const [selected, setSelected] = useState(null); // 'excellent', 'average', 'poor'

  return (
    <div className="outer-modal-bg">
      <div className="experience-modal">
        <div className="email-verification-header-fixed">
          <MobileHeader />
        </div>
        <div className="experience-content">
          <img src={ticketImg} alt="Ticket" className="experience-ticket-img" />
          <div className="experience-message">
            Your ticket has been sent
            <br />
            to the registered mail ID
          </div>
          <hr className="experience-divider" />
          <div className="experience-rate-title">
            How Would You Rate Your Experience
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
              <div>Excellent</div>
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
              <div>Average</div>
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
              <div>Poor</div>
            </div>
          </div>
          {selected && (
            <div style={{ marginTop: 24, color: "#bdbdc6", fontSize: 15 }}>
              Thank you! visit again
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Experience1;
