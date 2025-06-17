import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "../../../context/LanguageContext";
import arrow from "../../../assets/icons/left.svg";
import invertLeft from "../../../assets/icons/invertLeft.svg";
import accessibility from "../../../assets/icons/assess.svg";
import invertAccessibility from "../../../assets/icons/invertAccess.svg";
import globe from "../../../assets/icons/globe.svg";
import invertGlobe from "../../../assets/icons/invertGlob.svg";
import cart from "../../../assets/icons/cart.svg";
import invertCart from "../../../assets/icons/invertCart.svg";
import { setLanguage } from "../../../global/languageSlice";

export default function MainProductHead({ onAccessibilityOpen, onCartOpen }) {
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const langBtnRef = useRef(null);
  const { t, i18n } = useTranslation();
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  const { toggleLanguage, language } = useLanguage();
  const dispatch = useDispatch();

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


  const changeLanguage = (lng) => {
    console.log(lng, "lndfdfdfdfg");

    const newLanguage = lng === "en" ? "English" : "العربية";
    toggleLanguage(newLanguage);
    dispatch(setLanguage(lng));
  };

  return (
    <div className="product-header">
      <button
        className={language === "العربية" ? "ar-back-button" : "back-buttonn"}
        onClick={() => window.history.back()}
      >
        <img src={isDarkMode ? invertLeft : arrow} alt={t("common.back")} />
        {t("common.back")}
      </button>
      <h1 className="product-header__title">{t("common.selectAttractions")}</h1>
      <div className="header-actions">
        <button
          className="accessibility-button"
          aria-label={t("common.accessibility")}
          onClick={onAccessibilityOpen}
        >
          <span className="product-header__icon">
            <img
              src={isDarkMode ? invertAccessibility : accessibility}
              alt={t("common.accessibility")}
            />
          </span>
        </button>
        <div
          className="language-selector"
          ref={langBtnRef}
          style={{ position: "relative" }}
        >
          <button
            className="mobile-header__lang-btn"
            aria-label={t("common.language")}
            onClick={() => setShowLangDropdown((v) => !v)}
            type="button"
          >
            <img
              src={isDarkMode ? invertGlobe : globe}
              alt={t("common.language")}
            />
            <span>{i18n.language === "en" ? "English" : "العربية"}</span>
            <span className="chevron">&#9662;</span>
          </button>
          {showLangDropdown && (
            <div className="mobile-header__lang-dropdown">
              <div
                className="mobile-header__lang-option"
                onClick={() => {
                  changeLanguage("en");
                  setShowLangDropdown(false);
                }}
              >
                <span className="mobile-header__lang-text">English</span>
                {i18n.language === "en" && (
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
                <span className="mobile-header__lang-text">العربية</span>
                {i18n.language === "ar" && (
                  <span className="mobile-header__lang-check">✓</span>
                )}
              </div>
            </div>
          )}
        </div>
        <button
          className={language === "العربية" ? "ar-cart-button" : "cart-button"}
          style={{
            borderWidth: isDarkMode ? "2px" : "1px",
          }}
          onClick={onCartOpen}
        >
          <span className="cart-icon">
            <img
              src={isDarkMode ? invertCart : cart}
              alt={t("common.viewCart")}
            />
          </span>
          {t("common.viewCart")}
        </button>
      </div>
    </div>
  );
}
