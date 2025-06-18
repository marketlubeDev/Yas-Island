import React from "react";
import { Modal } from "antd";
import Invert from "../../../assets/icons/invert.svg";
import Zoom from "../../../assets/icons/lens.svg";
import closeIcon from "../../../assets/icons/close.svg";
import closeIconInverter from "../../../assets/icons/closeinverter.svg";
import { useSelector } from "react-redux";

// import "./AccessibilityModal.css";

export default function AccessibilityModal({ isOpen, onClose }) {
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      closeIcon={
        <span className="custom-modal-close">
          <img src={isDarkMode ? closeIconInverter : closeIcon} alt="close" />
        </span>
      }
      className="accessibility-modal"
      width="40%"
    >
      <div className="modal-content">
        <h2>Accessibility</h2>
        <p className="subtitle">choose options</p>

        <div className="options-container">
          <div className="option-card">
            <div className="option-icon">
              <img src={Invert} alt="Invert" />
            </div>
            <p>
              Color blindness
              <br />
              mode
            </p>
          </div>

          <div className="option-card">
            <div className="option-icon">
              <img src={Zoom} alt="Zoom" />
            </div>
            <p>Zoom mode</p>
          </div>
        </div>

        <button className="continue-button" onClick={onClose}>
          Continue
        </button>
      </div>
    </Modal>
  );
}
