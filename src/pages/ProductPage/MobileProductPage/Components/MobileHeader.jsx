import React, { useState, useRef, useEffect } from "react";
import mobLogo from "../../../../assets/images/moblogo.svg";
import invertedLogo from "../../../../assets/icons/invertedlogo.svg";
import accessibilityIcon from "../../../../assets/icons/assess.svg";
import dropdownIcon from "../../../../assets/icons/DownOutlined.svg";
import dropdownIconInverter from "../../../../assets/icons/invertdown.svg";
import globeIcon from "../../../../assets/icons/globe.svg";
import { useNavigate } from "react-router-dom";
import Accessibility from "../Components/Accessibility";
import { useLanguage } from "../../../../context/LanguageContext";
import { useSelector } from "react-redux";
import accessibilityIconInverter from "../../../../assets/icons/assessinverter.svg";
import globeIconInverter from "../../../../assets/icons/invertGlob.svg";

function MobileHeader() {
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  const navigate = useNavigate();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const langBtnRef = useRef(null);
  const { language, toggleLanguage } = useLanguage();
  const accessibilityIconSrc = isDarkMode
    ? accessibilityIconInverter
    : accessibilityIcon;
  const globeIconSrc = isDarkMode ? globeIconInverter : globeIcon;
  const dropdownIconSrc = isDarkMode ? dropdownIconInverter : dropdownIcon;

  // Optional: Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (langBtnRef.current && !langBtnRef.current.contains(event.target)) {
        setShowLangDropdown(false);
      }
    }
    if (showLangDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLangDropdown]);

  return (
    <>
      <div className="mobile-header">
        <div className="mobile-header__left">
          <img
            src={isDarkMode ? invertedLogo : mobLogo}
            alt="YAS Island Logo"
            className="mobile-header__logo"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </div>
        <div className="mobile-header__right">
          <button
            className="mobile-header__icon-btn"
            aria-label="Accessibility"
            onClick={() => {
              setShowAccessibility(!showAccessibility);
              window.scrollTo(0, 0);
            }}
          >
            <img src={accessibilityIconSrc} alt="Accessibility" />
          </button>

          <div style={{ position: "relative" }} ref={langBtnRef}>
            <button
              className="mobile-header__lang-btn"
              aria-label="Language"
              onClick={() => setShowLangDropdown((v) => !v)}
              type="button"
            >
              <img src={globeIconSrc} alt="Language" />
              <span>{language === "العربية" ? "Ar" : "En"}</span>
              <img
                src={dropdownIconSrc}
                alt="down arrow"
                className="chevron"
                style={{ width: 12, height: 12, marginLeft: 4 }}
              />
            </button>
            {showLangDropdown && (
              <div className="mobile-header__lang-dropdown">
                <div
                  className="mobile-header__lang-option"
                  onClick={() => {
                    toggleLanguage("English");
                    setShowLangDropdown(false);
                  }}
                >
                  <span className="mobile-header__lang-text">English</span>
                  {language === "English" && (
                    <span className="mobile-header__lang-check">✓</span>
                  )}
                </div>
                <div
                  className="mobile-header__lang-option"
                  onClick={() => {
                    toggleLanguage("العربية");
                    setShowLangDropdown(false);
                  }}
                >
                  <span className="mobile-header__lang-text">Arabic</span>
                  {language === "العربية" && (
                    <span className="mobile-header__lang-check">✓</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Accessibility
        onClose={() => setShowAccessibility(false)}
        visible={showAccessibility}
      />
    </>
  );
}

export default MobileHeader;
