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
import { setProducts } from "../../global/productSlice";
import { setIsCartOpen } from "../../global/cartSlice";

export default function HeaderLogo() {
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const navigate = useNavigate();
  const location = useLocation();
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);

  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] =
    useState(false);

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
  // const cartItems = useSelector((state) => state.checkout.cartItems) || [];
  const { cartItems } = useSelector((state) => state.cart);


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
  };

  const onAccessibilityOpen = () => setIsAccessibilityModalOpen(true);
  const onCartOpen = () => dispatch(setIsCartOpen(true));

  const headerActions = (
    <div className="header-actions">
      <div>
        {isPaymentRoute && (
          <div
            className={`header-logo ${
              language === "العربية" ? "header-logo-ar" : ""
            }`}
            onClick={handleLogoClick}
            style={
              {
                // paddingLeft: "2rem",
                // paddingRight: "2rem",
              }
            }
          >
            <img
              src={logo}
              alt="logo"
              className="header-logo-img"
              style={{
                width: "5.5rem",
              }}
            />
            <img
              src={isDarkMode ? invertDesc : desc}
              alt="desc"
              className="header-logo-desc"
              style={{
                width: "6.5rem",
              }}
            />
          </div>
        )}{" "}
      </div>
      <div className="header-actions-right">
        <button
          className="accessibility-button"
          aria-label={t("common.accessibility")}
          onClick={onAccessibilityOpen}
          style={{
            ...(isPaymentRoute && {}),
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
              ...(isPaymentRoute && {}),
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
              // top: "-12px",
              // right: "-2rem",

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
    </div>
  );

  return (
    <>
      <div
        className={`header-logo-container ${
          isPaymentRoute ? "payment-route" : ""
        }`}
        style={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          className={`${
            isPaymentRoute ? "product-top-pay" : "product-top-sec"
          }`}
          style={{ width: "100%" }}
        >
          {headerActions}
          {!isPaymentRoute && <ProductHead />}
        </div>
      </div>

      <AccessibilityModal
        isOpen={isAccessibilityModalOpen}
        onClose={() => setIsAccessibilityModalOpen(false)}
      />
      <CartModal
        isOpen={isCartOpen}
        onClose={() => dispatch(setIsCartOpen(false))}
      />
    </>
  );
}
