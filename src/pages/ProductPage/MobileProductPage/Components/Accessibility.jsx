import React from "react";
import { Modal } from "antd";
import colorblindIcon from "../../../../assets/icons/colorblindness.svg";
import zoomIcon from "../../../../assets/icons/zoom.svg";
import closeIcon from "../../../../assets/icons/close.svg";
import { useNavigate } from "react-router-dom";

function Accessibility({ onClose, visible }) {
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
    <Modal
      open={visible}
      onCancel={handleClose}
      footer={null}
      closable={true}
      centered
      width={400}
      className="accessibility-modal"
      closeIcon={
        <span className="custom-modal-close">
          <img src={closeIcon} alt="accessibility.close" />
        </span>
      }
    >
      <div className="accessibility-popup-card">
        <div className="accessibility-popup-title">Accessibility</div>
        <div className="accessibility-popup-subtitle">Choose options</div>
        <div className="accessibility-popup-options">
          <div className="accessibility-popup-option">
            
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
    </Modal>
  );
}

export default Accessibility;
