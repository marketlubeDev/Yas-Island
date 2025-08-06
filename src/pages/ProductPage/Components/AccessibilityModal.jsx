import React from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  setZoomLevel,
  toggleDarkMode,
  setColorMode,
} from "../../../global/accessibilitySlice";

import Invert from "../../../assets/icons/invert.svg";
import Zoom from "../../../assets/icons/lens.svg";
import closeIcon from "../../../assets/icons/close.svg";

// import "./AccessibilityModal.css";

export default function AccessibilityModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const zoomLevel = useSelector((state) => state.accessibility.zoomLevel);
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);

  const handleZoomClick = (level) => {
    dispatch(setZoomLevel(level));
  };

  const zoomOptions = [
    { level: 1, label: "1x" },
    { level: 1.12, label: "1.25x" },
    { level: 1.25, label: "1.5x" },
    { level: 1.5, label: "2x" },
  ];

  const handleDarkModeClick = () => {
    dispatch(toggleDarkMode());
  };

  const handleColorModeClick = (mode) => {
    dispatch(setColorMode(mode));
  };

  const colorModeOptions = [
    { mode: "normal", label: t("accessibility.default") },
    { mode: "invert", label: t("accessibility.invertColors") },
  ];

  const getCurrentColorMode = () => {
    if (isDarkMode) return "invert";
    return "normal";
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      closeIcon={
        <span className="custom-modal-close">
          <img src={closeIcon} alt={t("accessibility.close")} />
        </span>
      }
      className="accessibility-web-modal"
      // width="40%"
    >
      <div className="modal-content">
        <h2>{t("accessibility.title")}</h2>
        <p className="subtitle">{t("accessibility.subtitle")}</p>

        <div className="options-container">
          <div className={`option-card ${isDarkMode ? "active" : ""}`}>
            <div className="option-icon">
              <img src={Invert} alt={t("accessibility.colorBlindness")} />
            </div>
            <p>{t("accessibility.colorBlindness")}</p>
            <div
              className="mode-dots"
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "15px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {colorModeOptions.map((option) => (
                <div
                  key={option.mode}
                  onClick={() => handleColorModeClick(option.mode)}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor:
                      getCurrentColorMode() === option.mode
                        ? "var(--color-base-accessibility-modal-btn-text)"
                        : "#e0e0e0",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    transform:
                      getCurrentColorMode() === option.mode
                        ? "scale(1.2)"
                        : "scale(1)",
                    boxShadow:
                      getCurrentColorMode() === option.mode
                        ? "0 2px 8px rgba(108, 99, 255, 0.3)"
                        : "none",
                  }}
                  title={option.label}
                />
              ))}
            </div>
            <div
              style={{
                marginTop: "8px",
                textAlign: "center",
                fontSize: "12px",
                color: "var(--color-base-accessibility-modal-btn-text)",
                fontWeight: "600",
                padding: "2px 8px",
                backgroundColor:
                  "var(--color-base-product-card-card-item-bg) !important",
                borderRadius: "10px",
                display: "inline-block",
                margin: "8px auto 0",
              }}
            >
              {
                colorModeOptions.find(
                  (option) => option.mode === getCurrentColorMode()
                )?.label
              }
            </div>
          </div>

          <div className={`option-card ${zoomLevel !== 1 ? "active" : ""}`}>
            <div className="option-icon">
              <img src={Zoom} alt={t("accessibility.zoomMode")} />
            </div>
            <p>{t("accessibility.zoomMode")}</p>
            <div
              className="zoom-buttons"
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "15px",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {zoomOptions.map((option) => (
                <button
                  key={option.level}
                  onClick={() => handleZoomClick(option.level)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "16px",
                    border:
                      zoomLevel === option.level
                        ? "2px solid var(--color-base-accessibility-modal-btn-text)"
                        : "1px solid #ddd",
                    backgroundColor:
                      zoomLevel === option.level
                        ? "var(--color-base-accessibility-modal-btn-text)"
                        : "var(--color-base-product-card-card-item-bg)",
                    color:
                      zoomLevel === option.level
                        ? "white"
                        : "var(--color-base-accessibility-modal-btn-text)",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "600",
                    transition: "all 0.2s ease",
                    minWidth: "40px",
                    outline: "none",
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button className="continue-button" onClick={onClose}>
          {t("accessibility.continue")}
        </button>
      </div>
    </Modal>
  );
}
