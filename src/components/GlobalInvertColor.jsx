import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function GlobalInvertColor() {
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--color-base-bg",
      isDarkMode ? "#000" : "#fff"
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
      isDarkMode ? "#FFAD33" : "#dcd6e5"
    );
    document.documentElement.style.setProperty(
      "--color-base-chat-btn-bg",
      isDarkMode
        ? "#FFAD33"
        : "linear-gradient(180deg, #0597e5 0%, #0758dd 100%)"
    );
    document.documentElement.style.setProperty(
      "--color-base-chat-btn-text",
      isDarkMode ? "#000" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-base-side-bar-border",
      isDarkMode ? "#F7B141" : "#F7D148"
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
      isDarkMode ? "#1A1206" : "#fff8a5"
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
      isDarkMode ? "#FFAD33" : "#ffe600"
    );

    //mobile product page
    document.documentElement.style.setProperty(
      "--color-base-mobile-product-page-bg",
      isDarkMode ? "#0B0C0C" : "#fff"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-product-page-title",
      isDarkMode ? "#E7EBD4" : "#231942"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-product-page-subtitle",
      isDarkMode ? "#FFFFFFCC" : "#6c6c8a"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-product-page-btn-bg",
      isDarkMode ? "#1A1206" : "#fff8a5"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-product-page-btn-text",
      isDarkMode ? "#E7EBD4" : "#231942"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-product-page-btn-border",
      isDarkMode ? "#FFAD33" : "#f7d148"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-product-page-vat-text",
      isDarkMode ? "#CED0AB" : "#bdbdc6"
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
      isDarkMode ? "#FFAD33" : "#dcd6e5"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-search-section-input-text",
      isDarkMode ? "#E7EBD4" : "#231942"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-search-section-input-placeholder",
      isDarkMode ? "#E7EBD4" : "#978FA1"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-search-section-filter-btn-bg",
      isDarkMode ? "#0B0C0C" : "#fff"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-search-section-filter-btn-text",
      isDarkMode ? "#E7EBD4" : "#231942"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-search-section-filter-btn-border",
      isDarkMode ? "rgba(255, 173, 51, 0.50)" : "#DCD6E5"
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
      isDarkMode ? "#F7B141" : "#bcbcc9"
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
      "--color-base-mobile-bottom-nav-border-top",
      isDarkMode ? " 4px solid rgba(255, 173, 51, 0.50);" : "#f2f2f2"
    );

    document.documentElement.style.setProperty(
      "--color-base-mobile-bottom-nav-item-text",
      isDarkMode ? "#FFAD33" : "#231942"
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
      isDarkMode ? "#E7EBD4" : "#222"
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
      isDarkMode ? "#E7EBD4" : "#231942"
    );
    document.documentElement.style.setProperty(
      "--color-dtl-footer-vat",
      isDarkMode ? "#CED0AB" : "#bdbdc6"
    );
    document.documentElement.style.setProperty(
      "--color-dtl-add-btn-bg",
      isDarkMode ? "#FFAD33" : "#ffe600"
    );
    document.documentElement.style.setProperty(
      "--color-dtl-add-btn-clr",
      isDarkMode ? "#000" : "#231942"
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
      isDarkMode ? "rgba(255, 173, 51, 0.50)" : "#fff"
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
      isDarkMode ? "#FFAD33" : "#ff69b4"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-clndr-date-clr",
      isDarkMode ? "#E7EBD4" : "#231942"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-clndr-date-slct-bg",
      isDarkMode ? "#000000" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-clndr-date-slct-clr",
      isDarkMode ? "#E7EBD4" : "#231942"
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
      "--color-bkg-guest-summary-after",
      isDarkMode ? "#E7EBD4" : "#231942"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-guest-btn-border",
      isDarkMode ? "#FFAD33" : "#d3b8ff"
    );
    document.documentElement.style.setProperty(
      "--color-bkg-guest-note",
      isDarkMode ? "#CED0AB" : "#bdbdc6"
    );

    return () => {
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
        "--color-base-mobile-bottom-nav-border-top",
        "#f2f2f2"
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
      );
      document.documentElement.style.setProperty(
        "--color-bkg-clndr-date-slct-clr",
        "#fff"
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
    };
  }, [isDarkMode]);

  return null;
}
