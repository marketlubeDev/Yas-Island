import React, { useState, useRef, useEffect } from "react";
import logo from "../../../../assets/images/moblogo.svg";
import accessibilityIcon from "../../../../assets/icons/assess.svg";
import globeIcon from "../../../../assets/icons/globe.svg";
import { useNavigate } from "react-router-dom";
import Accessibility from "../Components/Accessibility";
import { useLanguage } from "../../../../context/LanguageContext";

function MobileHeader() {
  const navigate = useNavigate();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const langBtnRef = useRef(null);
  const { language, toggleLanguage } = useLanguage();

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
            src={logo}
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
            <img src={accessibilityIcon} alt="Accessibility" />
          </button>

          <div style={{ position: "relative" }} ref={langBtnRef}>
            <button
              className="mobile-header__lang-btn"
              aria-label="Language"
              onClick={() => setShowLangDropdown((v) => !v)}
              type="button"
            >
              <img src={globeIcon} alt="Language" />
              <span>{language === "العربية" ? "العربية" : "English"}</span>
              <span className="chevron">&#9662;</span>
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
                  <span className="mobile-header__lang-text">العربية</span>
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
