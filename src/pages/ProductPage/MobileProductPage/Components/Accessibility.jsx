import React from "react";
import colorblindIcon from "../../../../assets/icons/colorblindness.svg";
import zoomIcon from "../../../../assets/icons/zoom.svg";
import closeIcon from "../../../../assets/icons/close.svg";
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
      <button className="accessibility-popup-close" onClick={handleClose}>
        <img src={closeIcon} alt="Close" width={28} height={28} />
      </button>
      <div className="accessibility-popup-card">
        <div className="accessibility-popup-title">Accessibility</div>
        <div className="accessibility-popup-subtitle">Choose options</div>
        <div className="accessibility-popup-options">
          <div className="accessibility-popup-option">
            {/* Color blindness SVG */}
            <div className="accessibility-popup-icon-circle">
              <img
                src={colorblindIcon}
                alt="Color blindness"
                width={32}
                height={32}
              />
            </div>
            <div className="accessibility-popup-label">
              Color blindness
              <br />
              mode
            </div>
          </div>
          <div className="accessibility-popup-option">
            {/* Search/Zoom SVG */}
            <div className="accessibility-popup-icon-circle">
              <img src={zoomIcon} alt="Zoom mode" width={32} height={32} />
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
