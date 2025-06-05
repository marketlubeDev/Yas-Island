import React, { useState, useRef, useEffect } from "react";
import arrow from "../../../assets/icons/left.svg";
import accessibility from "../../../assets/icons/assess.svg";
import globe from "../../../assets/icons/globe.svg";
import cart from "../../../assets/icons/cart.svg";
import downArrow from "../../../assets/icons/downArrow.svg";

export default function MainProductHead({ onAccessibilityOpen, onCartOpen }) {
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
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
    <div className="product-header">
      <button className="back-buttonn" onClick={() => window.history.back()}>
        <img src={arrow} alt="Back" />
        Back
      </button>
      <h1 className="product-header__title">Select attractions</h1>
      <div className="header-actions">
        <button
          className="accessibility-button"
          aria-label="Accessibility options"
          onClick={onAccessibilityOpen}
        >
          <span className="product-header__icon">
            <img src={accessibility} alt="Accessibility" />
          </span>
        </button>
        <div
          className="language-selector"
          ref={langBtnRef}
          style={{ position: "relative" }}
        >
          <button
            className="mobile-header__lang-btn"
            aria-label="Language"
            onClick={() => setShowLangDropdown((v) => !v)}
            type="button"
          >
            <img src={globe} alt="Language" />
            <span>{selectedLang === "English" ? "English" : "العربية"}</span>
            <span className="chevron">&#9662;</span>
          </button>
          {showLangDropdown && (
            <div className="mobile-header__lang-dropdown">
              <div
                className="mobile-header__lang-option"
                onClick={() => {
                  setSelectedLang("English");
                  setShowLangDropdown(false);
                }}
              >
                <span className="mobile-header__lang-text">English</span>
                {selectedLang === "English" && (
                  <span className="mobile-header__lang-check">✓</span>
                )}
              </div>
              <div
                className="mobile-header__lang-option"
                onClick={() => {
                  setSelectedLang("العربية");
                  setShowLangDropdown(false);
                }}
              >
                <span className="mobile-header__lang-text">العربية</span>
                {selectedLang === "العربية" && (
                  <span className="mobile-header__lang-check">✓</span>
                )}
              </div>
            </div>
          )}
        </div>
        <button className="cart-button" onClick={onCartOpen}>
          <span className="cart-icon">
            <img src={cart} alt="Cart" />
          </span>
          View Cart
        </button>
      </div>
    </div>
  );
}
