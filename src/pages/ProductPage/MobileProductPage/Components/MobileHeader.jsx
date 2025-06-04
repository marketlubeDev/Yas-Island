import React, { useState, useRef, useEffect } from "react";
import logo from "../../../../assets/images/moblogo.svg";
import accessibilityIcon from "../../../../assets/icons/assess.svg";
import globeIcon from "../../../../assets/icons/globe.svg";
import { useNavigate } from "react-router-dom";

function MobileHeader() {
  const navigate = useNavigate();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const langBtnRef = useRef(null);

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
    <div className="mobile-header">
      <div className="mobile-header__left">
        <img src={logo} alt="YAS Island Logo" className="mobile-header__logo" />
      </div>
      <div className="mobile-header__right">
        <button
          className="mobile-header__icon-btn"
          aria-label="Accessibility"
          onClick={() => {
            // navigate("/accessibility");
            // window.scrollTo(0, 0);
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
            <span>En</span>
            <span className="chevron">&#9662;</span>
          </button>
          {showLangDropdown && (
            <div className="mobile-header__lang-dropdown">
              <div className="mobile-header__lang-option">
                <span className="mobile-header__lang-text">English</span>
                <span className="mobile-header__lang-check">✓</span>
              </div>
              <div className="mobile-header__lang-option">
                <span className="mobile-header__lang-text">العربية</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileHeader;
