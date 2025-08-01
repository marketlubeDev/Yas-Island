import React, { useState, useRef, useEffect } from "react";
import mobLogo from "../../../assets/images/moblogo.svg";
import invertedLogo from "../../../assets/icons/invertedlogo.svg";
import accessibilityIcon from "../../../assets/icons/assess.svg";
import dropdownIcon from "../../../assets/icons/DownOutlined.svg";
import dropdownIconInverter from "../../../assets/icons/invertdown.svg";
import globeIcon from "../../../assets/icons/globe.svg";
import { useNavigate } from "react-router-dom";
import AccessibilityMbl from "./AccessibilityMbl";
import { useLanguage } from "../../../context/LanguageContext";
import { useSelector, useDispatch } from "react-redux";
import accessibilityIconInverter from "../../../assets/icons/assessinverter.svg";
import globeIconInverter from "../../../assets/icons/invertGlob.svg";
import { setLanguage } from "../../../global/languageSlice";
import {
  setProducts,
  setCurrentSort,
  setCurrentPark,
  setSearchQuery,
} from "../../../global/productSlice";

function MobileHeader() {
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  const navigate = useNavigate();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const langBtnRef = useRef(null);
  const { toggleLanguage } = useLanguage();
  const accessibilityIconSrc = isDarkMode
    ? accessibilityIconInverter
    : accessibilityIcon;
  const globeIconSrc = isDarkMode ? globeIconInverter : globeIcon;
  const dropdownIconSrc = isDarkMode ? dropdownIconInverter : dropdownIcon;
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

  const changeLanguage = (lng) => {
    // Only proceed if the language is actually changing
    if (currentLanguage !== lng) {
      // Update Redux state - this will trigger i18n change via useI18nSync
      dispatch(setLanguage(lng));
      dispatch(setProducts([]));

      dispatch(setCurrentSort(""));
      dispatch(setCurrentPark(""));
      dispatch(setSearchQuery(""));

      // Update LanguageContext for UI display
      const newLanguage = lng === "en" ? "English" : "العربية";
      toggleLanguage(newLanguage);
    }
  };

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
      <div className="mobile-header animate-mobile-header">
        <div className="mobile-header__left">
          <img
            src={isDarkMode ? invertedLogo : mobLogo}
            alt="YAS Island Logo"
            className="mobile-header__logo animate-mobile-logo"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </div>
        <div className="mobile-header__right animate-mobile-actions">
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
              <span>{currentLanguage === "ar" ? "Ar" : "En"}</span>
              <img
                src={dropdownIconSrc}
                alt="down arrow"
                className="chevron"
                style={{ width: 12, height: 12, marginLeft: 4, marginTop: 4 }}
              />
            </button>
            {showLangDropdown && (
              <div
                className={
                  "mobile-header__lang-dropdown" +
                  (currentLanguage === "ar"
                    ? " mobile-header__lang-dropdown--ar"
                    : " mobile-header__lang-dropdown--en")
                }
              >
                <div
                  className="mobile-header__lang-option"
                  onClick={() => {
                    changeLanguage("en");
                    setShowLangDropdown(false);
                  }}
                >
                  <span className="mobile-header__lang-text">English</span>
                  {currentLanguage === "en" && (
                    <span className="mobile-header__lang-check">✓</span>
                  )}
                </div>
                <div
                  className="mobile-header__lang-option"
                  onClick={() => {
                    changeLanguage("ar");
                    setShowLangDropdown(false);
                  }}
                >
                  <span className="mobile-header__lang-text">Arabic</span>
                  {currentLanguage === "ar" && (
                    <span className="mobile-header__lang-check">✓</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AccessibilityMbl
        onClose={() => setShowAccessibility(false)}
        visible={showAccessibility}
      />
    </>
  );
}

export default MobileHeader;
