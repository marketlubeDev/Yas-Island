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

  // Zoom Card Click
  const handleZoomCardClick = () => {
    // Find current zoom level index
    const currentIndex = zoomOptions.findIndex(
      (option) => option.level === zoomLevel
    );
    // Move to next zoom level, or back to first if at the end
    const nextIndex = (currentIndex + 1) % zoomOptions.length;
    dispatch(setZoomLevel(zoomOptions[nextIndex].level));
  };

  const zoomOptions = [
    { level: 1, label: "1x" },
    { level: 1.12, label: "1.25x" },
    { level: 1.25, label: "1.5x" },
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
          <div
            className={`option-card ${isDarkMode ? "active" : ""}`}
            onClick={handleDarkModeClick}
          >
            <div className="option-icon">
              <img src={Invert} alt={t("accessibility.colorBlindness")} />
            </div>
            <p>{t("accessibility.colorBlindness")}</p>
            <div
              className="mode-switch"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "16px",
                padding: "6px 8px",
                borderRadius: "999px",
                border:
                  "1px solid var(--color-base-accessibility-modal-card-border)",
                backgroundColor: "var(--color-base-product-card-card-item-bg)",
              }}
            >
              <button
                type="button"
                className={`switch-option ${
                  getCurrentColorMode() === "normal" ? "active" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleColorModeClick("normal");
                }}
                style={{
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "999px",
                  cursor: "pointer",
                  fontSize: "calc(12px * var(--zoom-scale))",
                  fontWeight: 600,
                  backgroundColor:
                    getCurrentColorMode() === "normal"
                      ? "var(--color-base-accessibility-modal-btn-text)"
                      : "transparent",
                  color:
                    getCurrentColorMode() === "normal"
                      ? "#fff"
                      : "var(--color-base-accessibility-modal-btn-text)",
                }}
              >
                {t("accessibility.default")}
              </button>
              <span className="vertical-divider-card" />
              <button
                type="button"
                className={`switch-option ${
                  getCurrentColorMode() === "invert" ? "active" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleColorModeClick("invert");
                }}
                style={{
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "999px",
                  cursor: "pointer",
                  fontSize: "calc(12px * var(--zoom-scale))",
                  fontWeight: 600,
                  backgroundColor:
                    getCurrentColorMode() === "invert"
                      ? "var(--color-base-accessibility-modal-btn-text)"
                      : "transparent",
                  color:
                    getCurrentColorMode() === "invert"
                      ? "#fff"
                      : "var(--color-base-accessibility-modal-btn-text)",
                }}
              >
                {t("accessibility.invertColors")}
              </button>
            </div>
          </div>

          <div
            className={`option-card ${zoomLevel !== 1 ? "active" : ""}`}
            onClick={handleZoomCardClick}
            style={{ cursor: "pointer" }}
          >
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoomClick(option.level);
                  }}
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
                    fontSize: "calc(12px * var(--zoom-scale))",
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
