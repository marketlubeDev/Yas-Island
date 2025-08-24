import React, { useState } from "react";
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
import Selector from "../Common/Selectors/Selector";

import {
  setProducts,
  setCurrentSort,
  setCurrentPark,
  setSearchQuery,
} from "../../global/productSlice";
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

  const isPaymentRoute =
    location.pathname === "/" ||
    location.pathname === "/upcoming" ||
    location.pathname === "/packages" ||
    location.pathname === "/hotels" ||
    location.pathname === "/dining" ||
    location.pathname === "/live" ||
    location.pathname === "/shopping";

  const isCardPaymentPage = location.pathname === "/card-payment";

  // Use common Selector component for language dropdown UI
  const { t, i18n } = useTranslation();
  const { toggleLanguage, language } = useLanguage();
  const dispatch = useDispatch();
  // const cartItems = useSelector((state) => state.checkout.cartItems) || [];
  const { cartItems } = useSelector((state) => state.cart);
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );
  const currentSort = useSelector((state) => state.product.currentSort);
  const currentPark = useSelector((state) => state.product.currentPark);

  // Dropdown open/close handled inside Selector component

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

  const onAccessibilityOpen = () => setIsAccessibilityModalOpen(true);
  const onCartOpen = () => dispatch(setIsCartOpen(true));

  const headerActions = (
    <div className="header-actions">
      <div>
        {!isPaymentRoute && (
          <div
            className={`header-logo ${
              language === "العربية" ? "header-logo-ar" : ""
            }`}
            onClick={handleLogoClick}
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
      <div className="header-actions-right animate-fade-in">
        {!isCardPaymentPage && (
          <button
            className="accessibility-button"
            aria-label={t("common.accessibility")}
            onClick={onAccessibilityOpen}
            style={{
              ...(!isPaymentRoute && {}),
            }}
          >
            <span className="product-header__icon">
              <img
                src={isDarkMode ? invertAccessibility : accessibility}
                alt={t("common.accessibility")}
              />
            </span>
          </button>
        )}
        {!isCardPaymentPage && (
          <div
            className="language-selector"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <Selector
              id="header-language"
              options={["English", "العربية"]}
              value={language}
              onChange={(e) =>
                changeLanguage(e.target.value === "English" ? "en" : "ar")
              }
              style={{ minWidth: "140px" }}
              leftIcon={<img src={isDarkMode ? invertGlobe : globe} alt="" />}
            />
          </div>
        )}
        {!isCardPaymentPage && (
          <button
            className={`${
              language === "العربية" ? "ar-cart-button" : "cart-button"
            } animate-slide-in`}
            style={{
              borderWidth: isDarkMode ? "2px" : "1px",
              ...(!isPaymentRoute && {
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
        )}
      </div>
    </div>
  );

  return (
    <>
      <div
        className={`header-logo-container ${
          !isPaymentRoute ? "payment-route" : ""
        }`}
        style={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          className={`${
            !isPaymentRoute ? "product-top-pay" : "product-top-sec"
          }`}
          style={{ width: "100%" }}
        >
          {headerActions}
          {isPaymentRoute && <ProductHead />}
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
