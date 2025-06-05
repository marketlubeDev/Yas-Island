import React from "react";
import { useNavigate } from "react-router-dom";

function Accessibility({ onClose }) {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    window.scrollTo(0, 0);
  };

  const handleContinue = () => {
    onClose();
    window.scrollTo(0, 0);
  };

  return (
    <div className="accessibility-popup-overlay">
      <div className="accessibility-popup-card">
        <button className="accessibility-popup-close" onClick={handleClose}>
          ×
        </button>
        <div className="accessibility-popup-title">Accessibility</div>
        <div className="accessibility-popup-subtitle">Choose options</div>
        <div className="accessibility-popup-options">
          <div className="accessibility-popup-option">
            {/* Color blindness SVG */}
            <div className="accessibility-popup-icon">
              <svg width="48" height="48" viewBox="0 0 48 48">
                <defs>
                  <linearGradient
                    id="colorblind-gradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#b3c6ff" />
                    <stop offset="100%" stopColor="#e0c3fc" />
                  </linearGradient>
                </defs>
                <circle
                  cx="24"
                  cy="24"
                  r="22"
                  fill="url(#colorblind-gradient)"
                  stroke="#e3e3e3"
                  strokeWidth="2"
                />
                <path d="M24 12a12 12 0 1 1 0 24V12z" fill="#231942" />
              </svg>
            </div>
            <div className="accessibility-popup-label">
              Color blindness
              <br />
              mode
            </div>
          </div>
          <div className="accessibility-popup-option">
            {/* Search/Zoom SVG */}
            <div className="accessibility-popup-icon">
              <svg width="48" height="48" viewBox="0 0 48 48">
                <defs>
                  <linearGradient
                    id="zoom-gradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#b3c6ff" />
                    <stop offset="100%" stopColor="#e0c3fc" />
                  </linearGradient>
                </defs>
                <circle
                  cx="24"
                  cy="24"
                  r="22"
                  fill="url(#zoom-gradient)"
                  stroke="#e3e3e3"
                  strokeWidth="2"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="10"
                  fill="none"
                  stroke="#231942"
                  strokeWidth="2"
                />
                <line
                  x1="32"
                  y1="32"
                  x2="40"
                  y2="40"
                  stroke="#231942"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="accessibility-popup-label">Zoom mode</div>
          </div>
        </div>
        <button
          className="accessibility-popup-continue"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default Accessibility;
