import React, { useState, useRef, useEffect } from "react";
import Ticket from "../../../assets/icons/ticket.svg";
import Excellent from "../../../assets/icons/great.svg";
import Average from "../../../assets/icons/smile.svg";
import Poor from "../../../assets/icons/poor.svg";
import { useNavigate } from "react-router-dom";
import thanksmile from "../../../assets/icons/thanksmile.svg";

export default function PaymentResponse() {
  const [selectedEmoji, setSelectedEmoji] = useState(null); // 'excellent', 'average', 'poor', or null
  const emojiRef = useRef(null);
  const navigate = useNavigate();
  const [showThankYou, setShowThankYou] = useState(false);

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

  const handleEmojiClick = (emojiType) => {
    setSelectedEmoji(emojiType === selectedEmoji ? null : emojiType);
    setShowThankYou(true);

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className="payment-response">
      {!showThankYou && (
        <>
          <div className="ticket-section">
            <img src={Ticket} alt="Ticket" />
            <div className="ticket-message">
              Your ticket has been sent <br /> to the registered mail ID!
            </div>
          </div>
          <hr className="divider" />
          <div className="feedback-section">
            <div className="feedback-title">
              How would you rate your experience
            </div>

            <div className="feedback-options" ref={emojiRef}>
              <div
                className="option"
                onClick={() => handleEmojiClick("excellent")}
              >
                <img
                  className="emoji green"
                  src={Excellent}
                  alt="Excellent"
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedEmoji === "excellent" ? "green" : "#e1f1ff",
                    transition: "background-color 0.3s ease",
                  }}
                />
                <div className="label">Excellent</div>
              </div>
              <div
                className="option"
                onClick={() => handleEmojiClick("average")}
              >
                <img
                  className="emoji yellow"
                  src={Average}
                  alt="Average"
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedEmoji === "average" ? "#FFBE0B" : "#e1f1ff",
                    transition: "background-color 0.3s ease",
                  }}
                />
                <div className="label">Average</div>
              </div>
              <div className="option" onClick={() => handleEmojiClick("poor")}>
                <img
                  className="emoji red"
                  src={Poor}
                  alt="Poor"
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedEmoji === "poor" ? "#F42E48" : "#e1f1ff",
                    transition: "background-color 0.3s ease",
                  }}
                />
                <div className="label">Poor</div>
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
          <p className="feedback-text">Thank you! Visit again</p>
        </div>
      )}
    </div>
  );
}
