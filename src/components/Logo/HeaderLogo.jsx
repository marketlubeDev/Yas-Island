import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import desc from "../../assets/logo/desc.svg";
import "./_logo.scss";
import ProductHead from "../../pages/ProductPage/ProductHead/ProductHead";
import AccessibilityModal from "../../pages/ProductPage/Components/AccessibilityModal";
import CartModal from "../../pages/Home/Components/CartModal";
import invertDesc from "../../assets/images/invertDesc.svg";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext";
import { setLanguage } from "../../global/languageSlice";
import accessibility from "../../assets/icons/assess.svg";
import invertAccessibility from "../../assets/icons/invertAccess.svg";
import globe from "../../assets/icons/globe.svg";
import invertGlobe from "../../assets/icons/invertGlob.svg";
import cart from "../../assets/icons/cart.svg";
import invertCart from "../../assets/icons/invertCart.svg";
import down from "../../assets/icons/down.svg";
import invertdown from "../../assets/icons/invertdown.svg";
import queryClient from "../../../config/reactQuery";

export default function HeaderLogo() {
  const navigate = useNavigate();
  const location = useLocation();
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);

  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] =
    useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const handleLogoClick = () => {
    navigate("/");
  };

  const isProductRoute = location.pathname === "/product";
  const isPaymentRoute = location.pathname === "/payment";

  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const langBtnRef = useRef(null);
  const { t, i18n } = useTranslation();
  const { toggleLanguage, language } = useLanguage();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.checkout.cartItems) || [];

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
    const newLanguage = lng === "en" ? "English" : "العربية";
    toggleLanguage(newLanguage);
    dispatch(setLanguage(lng));
    dispatch(setProducts([]));
    queryClient.invalidateQueries({ queryKey: ["productList"] });
  };

  const onAccessibilityOpen = () => setIsAccessibilityModalOpen(true);
  const onCartOpen = () => setIsCartModalOpen(true);

  const headerActions = (
    <div className="header-actions">
      <button
        className="accessibility-button"
        aria-label={t("common.accessibility")}
        onClick={onAccessibilityOpen}
        style={{
          ...(isPaymentRoute && {
         
          }),
        }}
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
          className="web-header__lang-btn"
          aria-label={t("common.language")}
          onClick={() => setShowLangDropdown((v) => !v)}
          type="button"
          style={{
            ...(isPaymentRoute && {
         
            }),
          }}
        >
          <img
            src={isDarkMode ? invertGlobe : globe}
            alt={t("common.language")}
          />
          <span
            style={{
              color: isDarkMode ? "#E7EBD4" : "#18142B",
            }}
          >
            {i18n.language === "en" ? "English" : "العربية"}
          </span>
          <img
            src={isDarkMode ? invertdown : down}
            alt="chevron"
            className="chevron"
          />
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
          ...(isPaymentRoute && {
            top: "-19px",
            right: "-2rem",
            left: language === "العربية" ? "auto" : undefined,
          }),
        }}
        onClick={onCartOpen}
      >
        <span className="cart-icon">
          <img
            src={isDarkMode ? invertCart : cart}
            alt={t("common.viewCart")}
          />
          {cartItems && cartItems.length > 0 && (
            <span className="cart-notification">{cartItems.length}</span>
          )}
        </span>
        {t("common.viewCart")}
      </button>
    </div>
  );

  return (
    <>
      <div
        className="header-logo-container"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          className="header-logo"
          onClick={handleLogoClick}
          style={{
            cursor: "pointer",
            display: "flex",
            flexDirection: isProductRoute ? "column" : "row",
            alignItems: "center",
            height: isProductRoute ? "130px" : "118px",
            width: isProductRoute ? "12rem" : "",
            position: isProductRoute ? "relative" : "static",
            top: isProductRoute ? "1rem" : "0",
          }}
        >
          <img
            src={logo}
            alt="logo"
            className="header-logo-img"
            style={{
              width: isProductRoute ? "7rem" : "7rem",
              position: isProductRoute ? "relative" : "static",
              top: isProductRoute ? "8px" : "0",
            }}
          />
          <img
            src={isDarkMode ? invertDesc : desc}
            alt="desc"
            className="header-logo-desc"
            style={{
              width: isProductRoute ? "8rem" : "8rem",
              position: isProductRoute ? "relative" : "static",
              bottom: isProductRoute ? "16px" : "0",
            }}
          />
        </div>
        {isProductRoute ? (
          <div style={{ width: "87%" }}>
            {headerActions}
            <ProductHead />
          </div>
        ) : (
          headerActions
        )}
      </div>

      <AccessibilityModal
        isOpen={isAccessibilityModalOpen}
        onClose={() => setIsAccessibilityModalOpen(false)}
      />
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />
    </>
  );
}
