import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function GlobalInvertColor() {
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  const isHighContrast = useSelector(
    (state) => state.accessibility.isHighContrast
  );

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--color-base-bg",
      isDarkMode ? "#000" : isHighContrast ? "#fff" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-base-text",
      isDarkMode ? "#FFFFFFCC" : "#18142B"
    );
    document.documentElement.style.setProperty(
      "--color-base-text-secondary",
      isDarkMode ? "#E7EBD4" : "#514760"
    );
    document.documentElement.style.setProperty(
      "--color-base-btn-bg",
      isDarkMode ? "#1A1206" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-base-btn-border",
      isDarkMode ? "#FFAD33" : isHighContrast ? "#075ADD" : "#dcd6e5"
    );
    document.documentElement.style.setProperty(
      "--color-base-chat-btn-bg",
      isDarkMode
        ? "#FFAD33"
        : isHighContrast
        ? "#0052CC"
        : "linear-gradient(180deg, #0597e5 0%, #0758dd 100%)"
    );
    document.documentElement.style.setProperty(
      "--color-base-chat-btn-text",
      isDarkMode ? "#000" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-base-side-bar-border",
      isDarkMode ? "#F7B141" : isHighContrast ? "#084EBE" : "#F7D148"
    );
    document.documentElement.style.setProperty(
      "--color-base-side-bar-invert-border",
      isDarkMode ? "transparent" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-base-side-bar-item-bg",
      isDarkMode ? "#160802" : "#e9f7fd"
    );
    document.documentElement.style.setProperty(
      "--color-base-side-bar-item-box",
      isDarkMode ? "#FCBA58" : "#80bfe4"
    );
    document.documentElement.style.setProperty(
      "--color-base-side-bar-item-box-border",
      isDarkMode ? "#FCBA58" : "#80bfe4"
    );
    document.documentElement.style.setProperty(
      "--color-base-side-bar-item-icon-bg",
      isDarkMode
        ? "#F8A622"
        : isHighContrast
        ? "#0052CC"
        : "linear-gradient(135deg, #da3164 0%, #ae219f 50%, #547ee0 100%)"
    );
    document.documentElement.style.setProperty(
      "--color-base-side-bar-item-right-bg",
      isDarkMode ? "#000" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-base-side-bar-item-right-text",
      isDarkMode ? "#E7EBD4" : "rgba(#18142b80, 0.5)"
    );
    document.documentElement.style.setProperty(
      "--color-base-side-bar-item-right-text-active",
      isDarkMode ? "#FFAD33" : "#2563c0"
    );
    document.documentElement.style.setProperty(
      "--color-base-side-bar-item-inactive-border",
      isDarkMode ? "#F7B141" : "#e3daf2"
    );

    // product_Card
    document.documentElement.style.setProperty(
      "--color-base-product-card-bg",
      isDarkMode ? "#0B0C0C" : "#f0f0f0"
    );
    document.documentElement.style.setProperty(
      "--color-base-product-card-scroll-bar",
      isDarkMode
        ? "#FFAD33"
        : isHighContrast
        ? "#0052CC"
        : "linear-gradient(180deg, #d1b8ff 0%, #68abe7 100%)"
    );
    document.documentElement.style.setProperty(
      "--color-base-product-card-scroll-bar-border",
      isDarkMode
        ? "#81A343"
        : "linear-gradient(180deg, #ff8ff0 0%, #68abe7 100%)"
    );
    document.documentElement.style.setProperty(
      "--color-base-product-card-card-item-bg",
      isDarkMode ? "#000" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-base-product-card-card-item-border",
      isDarkMode ? "#332509" : "#ccdaf6"
    );
    document.documentElement.style.setProperty(
      "--color-base-product-card-divider",
      isDarkMode ? "#262626" : "#d9d9d9"
    );
    document.documentElement.style.setProperty(
      "--color-base-product-card-price",
      isDarkMode ? "#CED0AB" : "#594f67"
    );
    document.documentElement.style.setProperty(
      "--color-base-product-card-add-cart-btn-bg",
      isDarkMode ? "#1A1206" : isHighContrast ? "#E5EDF9" : "#fff8a5"
    );
    // Accessibility Modal
    document.documentElement.style.setProperty(
      "--color-base-accessibility-modal-title",
      isDarkMode ? "#E7EBD4" : "#18142B"
    );
    document.documentElement.style.setProperty(
      "--color-base-accessibility-modal-subtitle",
      isDarkMode ? "#A6B098" : "#514760"
    );
    document.documentElement.style.setProperty(
      "--color-base-accessibility-modal-card-bg",
      isDarkMode ? "#472F1B" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-base-accessibility-modal-card-border",
      isDarkMode ? "#FFAD33" : "#e3daf2"
    );
    document.documentElement.style.setProperty(
      "--color-base-accessibility-modal-btn-bg",
      isDarkMode ? "#FFAD33" : isHighContrast ? "#0052CC" : "#ffe600"
    );

    //mobile product page
    document.documentElement.style.setProperty(
      "--color-base-mobile-product-page-bg",
      isDarkMode ? "#0B0C0C" : "#fff"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-product-page-title",
      isDarkMode ? "#E7EBD4" : isHighContrast ? "#18142B" : "#231942"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-product-page-subtitle",
      isDarkMode ? "#FFFFFFCC" : isHighContrast ? "#312F54" : "#6c6c8a"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-product-page-btn-bg",
      isDarkMode ? "#1A1206" : isHighContrast ? "#E5EDF9" : "#fff8a5"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-product-page-btn-text",
      isDarkMode ? "#E7EBD4" : "#231942"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-product-page-btn-border",
      isDarkMode ? "#FFAD33" : isHighContrast ? "#0052CC" : "#f7d148"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-product-page-vat-text",
      isDarkMode ? "#CED0AB" : isHighContrast ? "#312F54" : "#bdbdc6"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-product-page-price",
      isDarkMode ? "#E7EBD4" : "#231942"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-product-page-card-bg",
      isDarkMode ? "#000000" : "#fff"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-product-page-card-border",
      isDarkMode ? "#332509" : "#f2f2f2"
    );

    //mobiletop
    document.documentElement.style.setProperty(
      "--color-base-mobile-top-bg",
      isDarkMode ? "#0B0C0C" : "#fff"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-search-section-title",
      isDarkMode ? "#E7EBD4" : "#231942"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-search-section-input-bg",
      isDarkMode ? "#0B0C0C" : "#fff"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-search-section-input-border",
      isDarkMode ? "#FFAD33" : isHighContrast ? "#7E85B4" : "#dcd6e5"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-search-section-input-text",
      isDarkMode ? "#E7EBD4" : "#231942"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-search-section-input-placeholder",
      isDarkMode ? "#E7EBD4" : isHighContrast ? "#18142B" : "#978FA1"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-search-section-filter-btn-bg",
      isDarkMode ? "#0B0C0C" : "#fff"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-search-section-filter-btn-text",
      isDarkMode ? "#E7EBD4" : isHighContrast ? "#18142B" : "#231942"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-search-section-filter-btn-border",
      isDarkMode
        ? "rgba(255, 173, 51, 0.50)"
        : isHighContrast
        ? "#7E85B4"
        : "#DCD6E5"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-top-item-bg",
      isDarkMode ? "#0B0C0C" : "#fff"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-top-item-text",
      isDarkMode ? "#E7EBD4" : "#6c6c8a"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-top-item-borderbottom",
      isDarkMode ? "#FFAD33" : "#b9b3d3"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-top-item-bordertop",
      isDarkMode ? "#FFAD33" : "#b9b3d3"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-top-item-right-border",
      isDarkMode ? "#F7B141" : "#e0e0e0"
    );

    //mobileheader
    document.documentElement.style.setProperty(
      "--color-base-mobile-header-bg",
      isDarkMode ? "#0B0C0C" : "#fff"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-header-icon-btn-border",
      isDarkMode ? "#F7B141" : isHighContrast ? "#075ADD" : "#bcbcc9"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-header-icon-btn-bg",
      isDarkMode ? "#0B0C0C" : "#fff"
    );

    //mobilebottomnav
    document.documentElement.style.setProperty(
      "--color-base-mobile-bottom-nav-bg",
      isDarkMode ? "#000000" : "#fff"
    );

    document.documentElement.style.setProperty(
      "--color-base-bottom-nav-border-top",
      isDarkMode ? "#F7A525" : "none"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-bottom-nav-item-text",
      isDarkMode ? "#E7EBD4" : "#231942"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-bottom-nav-item-icon-active-color",
      isDarkMode ? "#000" : "#231942"
    );

    //mobileheaderlangdropdown
    document.documentElement.style.setProperty(
      "--color-base-mobile-header-lang-dropdown-bg",
      isDarkMode ? "#000000" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-base-mobile-header-lang-dropdown-boxshadow",
      isDarkMode
        ? " 4px solid rgba(255, 173, 51, 0.50);"
        : "0 4px 12px rgba(0, 0, 0, 0.1)"
    );
    document.documentElement.style.setProperty(
      "--color-base-mobile-header-lang-dropdown-item-lang-bg",
      isDarkMode ? "#000000" : "#f5f5f5"
    );
    document.documentElement.style.setProperty(
      "--color-base-mobile-header-lang-dropdown-item-lang-text",
      isDarkMode ? "#E7EBD4" : "#222"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-header-lang-dropdown-item-lang-check",
      isDarkMode ? "#FFAD33" : "#007bff"
    );
    document.documentElement.style.setProperty(
      "--color-base-mobile-header-lang-dropdown-border",
      isDarkMode ? "#483686" : "#e3dff1"
    );
    document.documentElement.style.setProperty(
      "--color-base-mobile-header-lang-dropdown-item-text",
      isDarkMode ? "#b6a6e4" : "#231942"
    );

    //searchdropdown
    document.documentElement.style.setProperty(
      "--color-search-dropdown-bg",
      isDarkMode ? "#000000" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-search-dropdown-option",
      isDarkMode ? "#000000" : "#f5f5f5"
    );
    document.documentElement.style.setProperty(
      "--color-search-dropdown-option-text",
      isDarkMode ? "#E7EBD4" : isHighContrast ? "#18142B" : "#222"
    );

    //attraction detail modal
    document.documentElement.style.setProperty(
      "--color-dtl-header-bg",
      isDarkMode ? "#000000" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-dtl-header-color",
      isDarkMode ? "#E7EBD4" : "#231942"
    );
    document.documentElement.style.setProperty(
      "--color-dtl-main-title",
      isDarkMode ? "#E7EBD4" : "#231942"
    );
    document.documentElement.style.setProperty(
      "--color-dtl-desc",
      isDarkMode ? "rgba(255, 255, 255, 0.80)" : "#6c6c8a"
    );
    document.documentElement.style.setProperty(
      "--color-dtl-footer-bg",
      isDarkMode ? "#000000" : "#fff"
    );

    document.documentElement.style.setProperty(
      "--color-dtl-footer-divider",
      isDarkMode ? "#262626" : "#e3dff1"
    );
    document.documentElement.style.setProperty(
      "--color-dtl-footer-vrl-divider",
      isDarkMode ? "#262626" : "#e3dff1"
    );
    document.documentElement.style.setProperty(
      "--color-dtl-footer-price",
      isDarkMode ? "#E7EBD4" : isHighContrast ? "#18142B" : "#231942"
    );
    document.documentElement.style.setProperty(
      "--color-dtl-footer-vat",
      isDarkMode ? "#CED0AB" : isHighContrast ? "#312F54" : "#bdbdc6"
    );
    document.documentElement.style.setProperty(
      "--color-dtl-add-btn-bg",
      isDarkMode ? "#FFAD33" : isHighContrast ? "#0052CC" : "#ffe600"
    );
    document.documentElement.style.setProperty(
      "--color-dtl-add-btn-clr",
      isDarkMode ? "#000" : isHighContrast ? "#FFFFFF" : "#231942"
    );
    document.documentElement.style.setProperty(
      "--color-popup-box-border",
      isDarkMode ? "#FFAD33" : isHighContrast ? "#0052CC" : "none"
    );
    document.documentElement.style.setProperty(
      "--color-popup-box-shadow",
      isDarkMode
        ? "0px -16px 54px 0px rgba(228, 219, 202, 0.17)"
        : "0 2px 12px rgba(44, 44, 84, 0.1)"
    );

    document.documentElement.style.setProperty(
      "--color-dtl-add-btn-shadow",
      isDarkMode ? "#000" : "#231942"
    );
    document.documentElement.style.setProperty(
      "--color-dtl-close-btn-bg",
      isDarkMode ? "#000" : "#f6f6fa"
    );

    document.documentElement.style.setProperty(
      "--color-dtl-body-bg",
      isDarkMode ? "#000000" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-dtl-content-bg",
      isDarkMode ? "#000000" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-dtl-content-border",
      isDarkMode ? "#ffad337f" : "#fff"
    );

    //mobile booking modal
    document.documentElement.style.setProperty(
      "--color-bkg-header-bg",
      isDarkMode ? "#000000" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-title-clr",
      isDarkMode ? "#E7EBD4" : "#231942"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-clndr-bg",
      isDarkMode ? "#000000" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-clndr-border",
      isDarkMode ? "#262626" : "#e3dff1"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-clndr-dayname-clr",
      isDarkMode ? "#FFAD33" : isHighContrast ? "#0052CC" : "#ff69b4"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-clndr-date-clr",
      isDarkMode ? "#E7EBD4" : "#231942"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-clndr-date-slct-bg",
      isDarkMode ? "#F8A622" : isHighContrast ? "#0052CC" : "#231942"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-clndr-date-slct-clr",
      isDarkMode ? "#000000" : "#DCDBFF"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-guest-title-clr",
      isDarkMode ? "#E7EBD4" : "#231942"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-guest-summary-clr",
      isDarkMode ? "#E7EBD4" : "#231942"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-guest-summary-clr",
      isDarkMode ? "#E7EBD4" : "#231942"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-guest-summary-before",
      isDarkMode ? "#262626" : "#d9d9d9"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-guest-btn-border",
      isDarkMode ? "#909883" : "#d3b8ff"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-guest-note",
      isDarkMode ? "#CED0AB" : "#bdbdc6"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-body-bg",
      isDarkMode ? "#000000" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-footer-bg",
      isDarkMode ? "#000000" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-modal-border",
      isDarkMode ? "#909883" : "#6f677c"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-checkout-btn-bg",
      isDarkMode ? "#000000" : isHighContrast ? "#0759DD" : "#FFEA00"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-checkout-btn-clr",
      isDarkMode ? "#E7EBD4" : isHighContrast ? "#FFFFFF" : "#18142b"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-checkout-btn-border",
      isDarkMode ? "#FFAD33" : isHighContrast ? "#0759DD" : "#ffea00"
    );

    document.documentElement.style.setProperty(
      "--cnfm-btn-clr",
      isDarkMode ? "#FFAD33" : isHighContrast ? "#0052CC" : "#ffea00"
    );

    document.documentElement.style.setProperty(
      "--color-bkg-checkout-btn-clr-span",
      isDarkMode ? "#E7EBD4" : isHighContrast ? "#F1F834" : "#f83482"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-save-btn-bg",
      isDarkMode ? "#F8A622" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-save-btn-clr",
      isDarkMode ? "#000" : "#18142b"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-save-btn-border",
      isDarkMode ? "#F8A622" : isHighContrast ? "#0052CC" : "#DCD6E5"
    );

    //payment header
    document.documentElement.style.setProperty(
      "--color-pymnt-container-bg",
      isDarkMode ? "#0B0C0C" : "#f4f3f3"
    );
    document.documentElement.style.setProperty(
      "--color-pymnt-title-clr",
      isDarkMode ? "#E7EBD4" : "#231942"
    );
    document.documentElement.style.setProperty(
      "--color-pymnt-step-clr",
      isDarkMode ? "#A6B098" : "#594f67"
    );
    document.documentElement.style.setProperty(
      "--color-pymnt-step-active-clr",
      isDarkMode ? "#A6B098" : "#231942"
    );
    document.documentElement.style.setProperty(
      "--color-pymnt-step-divider-before",
      isDarkMode ? "#F8A622" : "#1976d2"
    );
    document.documentElement.style.setProperty(
      "--color-pymnt-step-divider-after",
      isDarkMode ? "#232323" : "#dcdcdc"
    );

    //email verification
    document.documentElement.style.setProperty(
      "--color-email-form-bg",
      isDarkMode ? "#0B0C0C" : "#f4f3f3"
    );
    document.documentElement.style.setProperty(
      "--color-email-form-box",
      isDarkMode ? "#000000" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-email-form-label",
      isDarkMode ? "#E7EBD4" : "#231942"
    );

    document.documentElement.style.setProperty(
      "--color-email-form-confirm-btn-text",
      isDarkMode ? "#E7EBD4" : isHighContrast ? "#FFFFFF" : "#231942"
    );

    document.documentElement.style.setProperty(
      "--color-email-form-input-border",
      isDarkMode ? "#909883" : "#231942"
    );
    document.documentElement.style.setProperty(
      "--color-email-form-input-border-mb",
      isDarkMode ? "#909883" : "none"
    );
    document.documentElement.style.setProperty(
      "--color-email-form-confirm-btn",
      isDarkMode ? "#FFAD33" : isHighContrast ? "#0052CC" : "#ffe600"
    );
    document.documentElement.style.setProperty(
      "--color-email-form-confirm-btn-clr",
      isDarkMode ? "#000000" : isHighContrast ? "#fff" : "#231942"
    );

    //producthead
    document.documentElement.style.setProperty(
      "--color-text-primary-chevron",
      isHighContrast ? "#000" : "#bdbdc6"
    );

    //confirm email
    document.documentElement.style.setProperty(
      "--color-confirm-otp-bg",
      isDarkMode ? "#000000" : "#f4f3f3"
    );
    document.documentElement.style.setProperty(
      "--color-confirm-otp-label",
      isDarkMode ? "#F1F1F1" : "#231942"
    );
    document.documentElement.style.setProperty(
      "--color-confirm-otp-input-border",
      isDarkMode ? "#DCE1D4" : "#e3e3e3"
    );
    document.documentElement.style.setProperty(
      "--color-otp-btn-border",
      isDarkMode ? "#FFAD33" : "#d3b8ff"
    );
    document.documentElement.style.setProperty(
      "--color-otp-btn-clr",
      isDarkMode ? "#E7EBD4" : "#231942"
    );

    //checkout
    document.documentElement.style.setProperty(
      "--color-checkout-summary-bg",
      isDarkMode ? "#0B0807" : "#f4f3f3"
    );

    //accessibility
    document.documentElement.style.setProperty(
      "--color-accessibility-popup-option-border",
      isDarkMode ? "#FFAD33" : "#e3daf2"
    );
    document.documentElement.style.setProperty(
      "--color-otp-action-btn-border",
      isDarkMode ? "#FFAD33" : "#dcd6e5"
    );
    document.documentElement.style.setProperty(
      "--color-checkout-summary-border",
      isDarkMode ? "#909883" : "none"
    );
    document.documentElement.style.setProperty(
      "--color-accessibility-popup-icon-border",
      isDarkMode
        ? "linear-gradient(135deg, #3F6270 0%, #D37B2F 50%, #FFAD33 100%)"
        : "#d3b8ff"
    );
    document.documentElement.style.setProperty(
      "--color-cart-item-border",
      isDarkMode ? "#909883" : "none"
    );
    document.documentElement.style.setProperty(
      "--color-cart-price-color",
      isDarkMode ? "#FFAD33" : "#075faf"
    );
    document.documentElement.style.setProperty(
      "--color-country-code-clr",
      isDarkMode ? "#E7EBD4" : "#ada5b7"
    );
    document.documentElement.style.setProperty(
      "--color-checkout-summary-row-bg",
      isDarkMode ? "#0B0807" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-promo-input-border",
      isDarkMode ? "#909883" : "#6f677c"
    );
    document.documentElement.style.setProperty(
      "--color-email-form-box-shadow",
      isDarkMode
        ? "0px -16px 54px 0px rgba(228, 219, 202, 0.17)"
        : "0 2px 16px rgba(44, 44, 84, 0.09)"
    );

    document.documentElement.style.setProperty(
      "--ip-border",
      isDarkMode ? "##909883" : "#ddd"
    );

    document.documentElement.style.setProperty(
      "--ip-label",
      isDarkMode ? "#E7EBD4" : "#333"
    );
    document.documentElement.style.setProperty(
      "--color-close-btn-border",
      isDarkMode ? " rgba(255, 173, 51, 0.50)" : "#dcd6e5"
    );
    document.documentElement.style.setProperty(
      "--color-base-mobile-top-item-text-active",
      isDarkMode ? "#FFAD33" : "#1976d2"
    );
    document.documentElement.style.setProperty(
      "--cart-border",
      isDarkMode
        ? "linear-gradient(90deg, #F9A251 0%, #CB5F26 100%) 1"
        : "linear-gradient(90deg, #065dae 0%, #34a0d9 100%) 1"
    );
    document.documentElement.style.setProperty(
      "--cart-item-name",
      isDarkMode ? "#AEB89F" : "#514760"
    );

    document.documentElement.style.setProperty(
      "--cart-item-price",
      isDarkMode ? "#F8A050" : "#075faf"
    );

    document.documentElement.style.setProperty(
      "--cart-item-date",
      isDarkMode ? "#CBCBCB" : "#514760"
    );

    document.documentElement.style.setProperty(
      "--cart-item-day",
      isDarkMode ? "#fff" : "#594f67"
    );

    document.documentElement.style.setProperty(
      "--cart-item-var",
      isDarkMode ? "#A6B098" : "#4c4358"
    );

    document.documentElement.style.setProperty(
      "--cart-total-price",
      isDarkMode ? "#A6B098" : "#4f475b"
    );

    document.documentElement.style.setProperty(
      "--payment-right-bg",
      isDarkMode ? "##0B0C0C" : "#f4f7f8"
    );

    document.documentElement.style.setProperty(
      "--btn-clr",
      isDarkMode ? "#18142b" : isHighContrast ? "#fff" : "#18142b"
    );

    document.documentElement.style.setProperty(
      "--btn-save",
      isDarkMode ? "#FFAD33" : isHighContrast ? "#0052CC" : "#ffa500"
    );
    document.documentElement.style.setProperty(
      "--main-body",
      isDarkMode ? "#0B0C0C" : "#f4f3f3"
    );
    document.documentElement.style.setProperty(
      "--cart-btn-var",
      isDarkMode ? "#000" : isHighContrast ? "#fff" : "#ffea00"
    );
    document.documentElement.style.setProperty(
      "--cart-btn-text",
      isDarkMode ? "#fff" : isHighContrast ? "#18142b" : "#18142b"
    );
    document.documentElement.style.setProperty(
      "--cart-btn-brd",
      isDarkMode ? "#FFAD33" : isHighContrast ? "#0052CC" : "#ffea00"
    );
    document.documentElement.style.setProperty(
      "--payment-right-bg",
      isDarkMode ? "#0B0C0C" : "#f4f7f8"
    );
    document.documentElement.style.setProperty(
      "--payment-right-title",
      isDarkMode ? "#000" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--apply-btn-bg",
      isDarkMode ? "#0B0C0C" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--verifi-cont",
      isDarkMode ? "#0B0C0C" : "#f4f7f8"
    );
    document.documentElement.style.setProperty(
      "--email-text",
      isDarkMode ? "#A49DAD" : "#18142b"
    );
    document.documentElement.style.setProperty(
      "--spam-notice",
      isDarkMode ? "#FFAD33" : "#ff63af"
    );
    document.documentElement.style.setProperty(
      "--pay-check-price",
      isDarkMode ? "#E7EBD4" : "#594f67"
    );
    document.documentElement.style.setProperty(
      "--ip-bodr-btm",
      isDarkMode ? "#909883" : "#ddd"
    );
    document.documentElement.style.setProperty(
      "--order-smry-ttl",
      isDarkMode ? "#fff" : "#18142b"
    );

    document.documentElement.style.setProperty(
      "--color-popup-box-bg",
      isDarkMode
        ? "linear-gradient(0deg, #472f1b 0%, #472f1b 100%), #000"
        : "#fff"
    );

    document.documentElement.style.setProperty(
      "--color-cart-check-btn-bg",
      isDarkMode ? "#000000" : isHighContrast ? "#0052CC" : "#ffea00"
    );

    document.documentElement.style.setProperty(
      "--color-cart-check-btn-text",
      isDarkMode ? "#E7EBD4" : isHighContrast ? "#FFFFFF" : "#231942"
    );

    document.documentElement.style.setProperty(
      "--color-cart-save-btn-bg",
      isDarkMode ? "#FFAD33" : isHighContrast ? "#fff" : "#ffae00"
    );

    document.documentElement.style.setProperty(
      "--color-cart-save-btn-border",
      isDarkMode ? "none" : isHighContrast ? "#0052CC" : "none"
    );

    document.documentElement.style.setProperty(
      "--color-email-form-otp-warning",
      isDarkMode ? "#FFAD33" : isHighContrast ? "#0052CC" : "#ff63af"
    );

    return () => {
      document.documentElement.style.setProperty(
        "--pay-check-price",
        "#594f67"
      );
      document.documentElement.style.setProperty("--verifi-cont", "#f4f7f8");
      document.documentElement.style.setProperty("--apply-btn-bg", "#fff");
      document.documentElement.style.setProperty(
        "--payment-right-title",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--payment-right-bg",
        "#f4f7f8"
      );
      document.documentElement.style.setProperty("--cart-btn-brd", "#ffea00");
      document.documentElement.style.setProperty("--cart-btn-text", "#18142b");
      document.documentElement.style.setProperty("--main-body", "#f4f3f3");
      document.documentElement.style.setProperty("--color-base-bg", "#fff");
      document.documentElement.style.setProperty(
        "--color-base-text",
        "#18142B"
      );
      document.documentElement.style.setProperty(
        "--color-base-text-secondary",
        "#514760"
      );
      document.documentElement.style.setProperty("--color-base-btn-bg", "#fff");
      document.documentElement.style.setProperty(
        "--color-base-btn-border",
        "#dcd6e5"
      );
      document.documentElement.style.setProperty(
        "--color-base-chat-btn-bg",
        "linear-gradient(180deg, #0597e5 0%, #0758dd 100%)"
      );
      document.documentElement.style.setProperty(
        "--color-base-chat-btn-text",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--color-base-side-bar-border",
        "#f7d148"
      );
      document.documentElement.style.setProperty(
        "--color-base-side-bar-invert-border",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--color-base-side-bar-item-bg",
        "#e9f7fd"
      );
      document.documentElement.style.setProperty(
        "--color-base-side-bar-item-box",
        "#160802"
      );
      document.documentElement.style.setProperty(
        "--color-base-side-bar-item-box-border",
        "#80bfe4"
      );
      document.documentElement.style.setProperty(
        "--color-base-side-bar-item-icon-bg",
        "linear-gradient(135deg, #da3164 0%, #ae219f 50%, #547ee0 100%)"
      );
      document.documentElement.style.setProperty(
        "--color-base-side-bar-item-right-bg",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--color-base-side-bar-item-right-text",
        "rgba(#18142b80, 0.5)"
      );
      document.documentElement.style.setProperty(
        "--color-base-side-bar-item-right-text-active",
        "#2563c0"
      );
      document.documentElement.style.setProperty(
        "--color-base-side-bar-item-inactive-border",
        "#e3daf2"
      );

      // product_Card
      document.documentElement.style.setProperty(
        "--color-base-product-card-bg",
        "#f0f0f0"
      );

      document.documentElement.style.setProperty(
        "--color-base-product-card-scroll-bar",
        "linear-gradient(180deg, #d1b8ff 0%, #68abe7 100%)"
      );

      document.documentElement.style.setProperty(
        "--color-base-product-card-scroll-bar-border",
        "#ccdaf6"
      );
      document.documentElement.style.setProperty(
        "--color-base-product-card-card-item-bg",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--color-base-product-card-card-item-border",
        "#ccdaf6"
      );
      document.documentElement.style.setProperty(
        "--color-base-product-card-divider",
        "#d9d9d9"
      );
      document.documentElement.style.setProperty(
        "--color-base-product-card-price",
        "#594f67"
      );
      document.documentElement.style.setProperty(
        "--color-base-product-card-add-cart-btn-bg",
        "#fff8a5"
      );

      // Accessibility Modal
      document.documentElement.style.setProperty(
        "--color-base-accessibility-modal-title",
        "#18142B"
      );
      document.documentElement.style.setProperty(
        "--color-base-accessibility-modal-subtitle",
        "#514760"
      );
      document.documentElement.style.setProperty(
        "--color-base-accessibility-modal-card-bg",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--color-base-accessibility-modal-card-border",
        "#e3daf2"
      );
      document.documentElement.style.setProperty(
        "--color-base-accessibility-modal-btn-bg",
        "#ffe600"
      );

      //mobile product page
      document.documentElement.style.setProperty(
        "--color-base-mobile-product-page-bg",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--color-base-mobile-product-page-title",
        "#231942"
      );
      document.documentElement.style.setProperty(
        "--color-base-mobile-product-page-subtitle",
        "#6c6c8a"
      );
      document.documentElement.style.setProperty(
        "--color-base-mobile-product-page-btn-bg",
        "#fff8a5"
      );

      document.documentElement.style.setProperty(
        "--color-base-mobile-product-page-btn-text",
        "#23194"
      );
      document.documentElement.style.setProperty(
        "--color-base-mobile-product-page-btn-border",
        "#f7d148"
      );
      document.documentElement.style.setProperty(
        "--color-base-mobile-product-page-vat-text",
        "#bdbdc6"
      );
      document.documentElement.style.setProperty(
        "--color-base-mobile-product-page-price",
        "#231942"
      );
      document.documentElement.style.setProperty(
        "--color-base-mobile-product-page-card-bg",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--color-base-mobile-product-page-card-border",
        "#f2f2f2"
      );

      //mobiletop
      document.documentElement.style.setProperty(
        "--color-base-mobile-top-bg",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--color-base-mobile-search-section-title",
        "#231942"
      );
      document.documentElement.style.setProperty(
        "--color-base-mobile-search-section-input-bg",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--color-base-mobile-search-section-input-border",
        "#dcd6e5"
      );
      document.documentElement.style.setProperty(
        "--color-base-mobile-search-section-filter-btn-bg",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--color-base-mobile-search-section-filter-btn-text",
        "#231942"
      );
      document.documentElement.style.setProperty(
        "--color-base-mobile-search-section-filter-btn-border",
        "#DCD6E5"
      );

      document.documentElement.style.setProperty(
        "--color-base-mobile-top-item-bg",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--color-base-mobile-top-item-text",
        "#6c6c8a"
      );
      document.documentElement.style.setProperty(
        "--color-base-mobile-top-item-borderbottom",
        "#b9b3d3"
      );
      document.documentElement.style.setProperty(
        "--color-base-mobile-top-item-bordertop",
        "#b9b3d3"
      );
      document.documentElement.style.setProperty(
        "--color-base-mobile-top-item-right-border",
        "#e0e0e0"
      );

      //mobilebottomnav
      document.documentElement.style.setProperty(
        "--color-base-mobile-bottom-nav-bg",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--color-base-bottom-nav-border-top",
        "none"
      );
      document.documentElement.style.setProperty(
        "--color-base-mobile-bottom-nav-item-text",
        "#231942"
      );
      document.documentElement.style.setProperty(
        "--color-base-mobile-bottom-nav-item-icon-active-color",
        "#231942"
      );

      //search dropdown
      document.documentElement.style.setProperty(
        "--color-search-dropdown-bg",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--color-search-dropdown-option",
        "#f5f5f5"
      );
      document.documentElement.style.setProperty(
        "--color-search-dropdown-option-text",
        "#222"
      );

      //attraction detail modal
      document.documentElement.style.setProperty(
        "--color-dtl-header-bg",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--color-dtl-header-color",
        "#231942"
      );
      document.documentElement.style.setProperty(
        "--color-dtl-main-title",
        "#231942"
      );
      document.documentElement.style.setProperty("--color-dtl-desc", "#6c6c8a");
      document.documentElement.style.setProperty(
        "--color-dtl-footer-bg",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--color-dtl-footer-divider",
        "#e3dff1"
      );
      document.documentElement.style.setProperty(
        "--color-dtl-footer-vrl-divider",
        "#e3dff1"
      );
      document.documentElement.style.setProperty(
        "--color-dtl-footer-price",
        "#231942"
      );
      document.documentElement.style.setProperty(
        "--color-dtl-footer-vat",
        "#bdbdc6"
      );
      document.documentElement.style.setProperty(
        "--color-dtl-add-btn-bg",
        "#ffe600"
      );
      document.documentElement.style.setProperty(
        "--color-dtl-add-btn-clr",
        "#231942"
      );
      document.documentElement.style.setProperty(
        "--color-dtl-add-btn-shadow",
        "#231942"
      );
      document.documentElement.style.setProperty(
        "--color-dtl-close-btn-bg",
        "#f6f6fa"
      );
      document.documentElement.style.setProperty("--color-dtl-body-bg", "#fff");
      document.documentElement.style.setProperty(
        "--color-dtl-content-bg",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--color-dtl-content-border",
        "#fff"
      );

      //mobile booking modal
      document.documentElement.style.setProperty(
        "--color-bkg-header-bg",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--color-bkg-title-clr",
        "#231942"
      );
      document.documentElement.style.setProperty(
        "--color-bkg-clndr-bg",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--color-bkg-clndr-border",
        "#e3dff1"
      );
      document.documentElement.style.setProperty(
        "--color-bkg-clndr-dayname-clr",
        "#ff69b4"
      );
      document.documentElement.style.setProperty(
        "--color-bkg-clndr-date-clr",
        "#231942"
      );
      document.documentElement.style.setProperty(
        "--color-bkg-clndr-date-slct-bg",
        "#231942"
        // "#F8A622"
      );
      document.documentElement.style.setProperty(
        "--color-bkg-clndr-date-slct-clr",
        "#DCDBFF"
      );
      document.documentElement.style.setProperty(
        "--color-bkg-guest-title-clr",
        "#231942"
      );
      document.documentElement.style.setProperty(
        "--color-bkg-guest-summary-clr",
        "#18142b"
      );
      document.documentElement.style.setProperty(
        "--color-bkg-guest-summary-after",
        "#e1e1ef"
      );
      document.documentElement.style.setProperty(
        "--color-bkg-guest-summary-before",
        "#e1e1ef"
      );
      document.documentElement.style.setProperty(
        "--color-bkg-guest-btn-border",
        "#d3b8ff"
      );
      document.documentElement.style.setProperty(
        "--color-bkg-guest-note",
        "#bdbdc6"
      );
      document.documentElement.style.setProperty("--color-bkg-body-bg", "#fff");
      document.documentElement.style.setProperty(
        "--color-bkg-footer-bg",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--color-bkg-modal-border",
        "#6F677C"
      );
      document.documentElement.style.setProperty(
        "--color-bkg-checkout-btn-bg",
        "#ffea00"
      );
      document.documentElement.style.setProperty(
        "--color-bkg-checkout-btn-border",
        "#ffea00"
      );
      document.documentElement.style.setProperty(
        "--color-bkg-checkout-btn-clr",
        "#18142b"
      );
      document.documentElement.style.setProperty(
        "--color-bkg-checkout-btn-clr-span",
        "#f83482"
      );
      document.documentElement.style.setProperty(
        "--color-bkg-save-btn-bg",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--color-bkg-save-btn-clr",
        "#18142b"
      );
      document.documentElement.style.setProperty(
        "--color-bkg-save-btn-border",
        "#dcd6e5"
      );
      document.documentElement.style.setProperty(
        "--color-bkg-guest-summary-before",
        "#d9d9d9"
      );

      //payment header
      document.documentElement.style.setProperty(
        "--color-pymnt-container-bg",
        "#f4f3f3"
      );
      document.documentElement.style.setProperty(
        "--color-pymnt-title-clr",
        "#231942"
      );
      document.documentElement.style.setProperty(
        "--color-pymnt-step-clr",
        "#594f67"
      );
      document.documentElement.style.setProperty(
        "--color-pymnt-step-active-clr",
        "#231942"
      );
      document.documentElement.style.setProperty(
        "--color-pymnt-step-divider-before",
        "#1976d2"
      );
      document.documentElement.style.setProperty(
        "--color-pymnt-step-divider-after",
        "#dcdcdc"
      );

      //email verification
      document.documentElement.style.setProperty(
        "--color-email-form-bg",
        "#f4f3f3"
      );
      document.documentElement.style.setProperty(
        "--color-email-form-box",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--color-email-form-label",
        "#231942"
      );
      document.documentElement.style.setProperty(
        "--color-email-form-input-border",
        "#231942"
      );
      document.documentElement.style.setProperty(
        "--color-email-form-input-border-mb",
        "none"
      );
      document.documentElement.style.setProperty(
        "--color-email-form-confirm-btn",
        "#ffe600"
      );
      document.documentElement.style.setProperty(
        "--color-email-form-confirm-btn-clr",
        "#231942"
      );

      //confirm email
      document.documentElement.style.setProperty(
        "--color-confirm-otp-bg",
        "#f4f3f3"
      );
      document.documentElement.style.setProperty(
        "--color-confirm-otp-label",
        "#231942"
      );
      document.documentElement.style.setProperty(
        "--color-confirm-otp-input-border",
        "#e3e3e3"
      );
      document.documentElement.style.setProperty(
        "--color-otp-btn-border",
        "#dcd6e5"
      );
      document.documentElement.style.setProperty(
        "--color-otp-btn-clr",
        "#231942"
      );
      document.documentElement.style.setProperty(
        "--color-otp-action-btn-border",
        "#dcd6e5"
      );

      //checkout
      document.documentElement.style.setProperty(
        "--color-checkout-summary-bg",
        "#f4f3f3"
      );

      //accessibility
      document.documentElement.style.setProperty(
        "--color-accessibility-popup-option-border",
        "#e3daf2"
      );
      document.documentElement.style.setProperty(
        "--color-checkout-summary-border",
        "none"
      );
      document.documentElement.style.setProperty(
        "--color-accessibility-popup-icon-border",
        "#d3b8ff"
      );

      //mycart
      document.documentElement.style.setProperty(
        "--color-cart-item-border",
        "none"
      );
      document.documentElement.style.setProperty(
        "--color-cart-price-color",
        "#FFAD33"
      );
      document.documentElement.style.setProperty(
        "--color-country-code-clr",
        "#ada5b7"
      );
      document.documentElement.style.setProperty(
        "--color-checkout-summary-row-bg",
        "#0B0807"
      );
      document.documentElement.style.setProperty(
        "--color-promo-input-border",
        "#6f677c"
      );
      document.documentElement.style.setProperty(
        "--color-email-form-box-shadow",
        "0px -16px 54px 0px rgba(228, 219, 202, 0.17)"
      );
      document.documentElement.style.setProperty(
        "--color-close-btn-border",
        "#dcd6e5"
      );
      document.documentElement.style.setProperty(
        "--color-base-mobile-top-item-text-active",
        "#FFAD33"
      );

      document.documentElement.style.setProperty("--ip-label", "#333");

      document.documentElement.style.setProperty("--ip-border", "#ddd");

      document.documentElement.style.setProperty(
        "--cart-border",
        "linear-gradient(90deg, #065dae 0%, #34a0d9 100%) 1"
      );

      document.documentElement.style.setProperty("--cart-item-name", "#514760");

      document.documentElement.style.setProperty(
        "--cart-item-price",
        "#075faf"
      );

      document.documentElement.style.setProperty("--cart-item-date", "#514760");

      document.documentElement.style.setProperty("--cart-item-day", "#594f67");

      document.documentElement.style.setProperty("--cart-item-var", "#4c4358");

      document.documentElement.style.setProperty(
        "--cart-total-price",
        "#4f475b"
      );

      document.documentElement.style.setProperty(
        "--payment-right-bg",
        "#f4f7f8"
      );
      document.documentElement.style.setProperty(
        "--color-base-mobile-product-page-vat-tax-text",
        "#bdbdc6"
      );
      document.documentElement.style.setProperty(
        "--color-popup-box-shadow",
        "0 2px 16px rgba(44, 44, 84, 0.09)"
      );
      document.documentElement.style.setProperty(
        "--color-popup-box-border",
        "none"
      );
      document.documentElement.style.setProperty(
        "--color-popup-box-bg",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--color-cart-check-btn-text",
        "#231942"
      );
      document.documentElement.style.setProperty(
        "--color-email-form-otp-warning",
        "#ff63af"
      );
    };
  }, [isDarkMode, isHighContrast]);

  return null;
}
