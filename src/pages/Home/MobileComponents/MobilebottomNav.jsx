import React, { useState, useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import homeIcon from "../../../assets/icons/home.svg";
import homeIconInverter from "../../../assets/icons/homecolor.svg";
import chatIcon from "../../../assets/icons/message.svg";
import chatIconInverter from "../../../assets/icons/chatcolor.svg";
import closeIcon from "../../../assets/icons/close.svg";
import closeIconInverter from "../../../assets/icons/closeinverter.svg";
import cartIcon from "../../../assets/icons/shopping.svg";
import cartIconInverter from "../../../assets/icons/cartcolor.svg";
import { useNavigate, useLocation } from "react-router-dom";
import MycartMbl from "./MycartMbl";
import { useSelector } from "react-redux";
// import MobileLanding from "./MobileLanding";

function MobileBottomNav({ isVisible = true }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isIpadTarget, setIsIpadTarget] = useState(false);
  const observerRef = useRef(null);
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  const homeIconSrc = isDarkMode ? homeIconInverter : homeIcon;
  const chatIconSrc = isDarkMode ? chatIconInverter : chatIcon;
  const crossIconSrc = isDarkMode ? closeIconInverter : closeIcon;
  const cartIconSrc = isDarkMode ? cartIconInverter : cartIcon;
  const { cartItems } = useSelector((state) => state.cart);

  const handleCartClick = useCallback(() => {
    setIsCartModalOpen(true);
  }, []);

  const handleCloseCart = useCallback(() => {
    setIsCartModalOpen(false);
  }, []);

  const handleChatClick = useCallback(() => {
    const closeChat = () => {
      let closed = false;
      if (window.sprChat) {
        try {
          window.sprChat("close");
          closed = true;
        } catch {}
      }
      if (!closed) {
        const candidates = [
          '.spr-chat__box [aria-label="Close"]',
          '.spr-chat__box [aria-label*="close" i]',
          ".spr-chat__box .spr-chat__close",
          '.spr-chat__box [data-testid*="close"]',
          '.spr-chat__box button[title*="close" i]',
        ];
        for (const sel of candidates) {
          const el = document.querySelector(sel);
          if (el) {
            el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            break;
          }
        }
      }
    };

    const openChat = () => {
      if (window.sprChat) {
        try {
          window.sprChat("open");
          return;
        } catch {}
      }
      const launcher = document.querySelector(
        '.spr-chat__launcher, [class*="spr-chat__launcher"], .ezg1tqb0'
      );
      if (launcher) {
        launcher.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      }
    };

    // Simple toggle: if chat appears to be open, close it; otherwise open it
    if (isChatOpen) {
      closeChat();
      setIsChatOpen(false); // Immediately update state
    } else {
      openChat();
      setIsChatOpen(true); // Immediately update state
    }
  }, [isChatOpen]);

  useEffect(() => {
    const computeIsIpadTarget = () => {
      const mq1 = window.matchMedia("(max-width: 768px)").matches; // mobile baseline
      const mqAirPortrait = window.matchMedia(
        "(min-width: 810px) and (max-width: 830px)"
      ).matches;
      const mqMiniLandscape = window.matchMedia(
        "(hover: none) and (pointer: coarse) and (min-width: 1024px) and (max-width: 1134px) and (max-height: 834px)"
      ).matches;
      const mqAirLandscape = window.matchMedia(
        "(hover: none) and (pointer: coarse) and (min-width: 1080px) and (max-width: 1180px) and (max-height: 920px)"
      ).matches;
      return mqAirPortrait || mqMiniLandscape || mqAirLandscape; // do NOT include phones here
    };

    setIsIpadTarget(computeIsIpadTarget());

    const onResize = () => setIsIpadTarget(computeIsIpadTarget());
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return (
    <>
      <div
        className="mobile-bottom-nav"
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <div
          className={`mobile-bottom-nav__item${
            location.pathname === "/" ? " mobile-bottom-nav__item--active" : ""
          }`}
          onClick={() => {
            navigate("/");
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          style={{ cursor: "pointer" }}
        >
          <img src={homeIconSrc} alt={t("common.home")} />
          <span>{t("common.home")}</span>
        </div>
        <div
          className="mobile-bottom-nav__item"
          onClick={handleChatClick}
          style={{ cursor: "pointer" }}
        >
          <img
            src={isChatOpen ? crossIconSrc : chatIconSrc}
            alt={isChatOpen ? t("common.close") : t("common.chatWithUs")}
          />
          {!isChatOpen && <span>{t("common.chatWithUs")}</span>}
        </div>
        <div
          className="mobile-bottom-nav__item"
          onClick={handleCartClick}
          style={{ cursor: "pointer" }}
        >
          <div style={{ position: "relative", display: "inline-block" }}>
            <img src={cartIconSrc} alt={t("common.cart")} />
            {cartItems.length > 0 && (
              <span
                className="cart-notification-mobile"
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: "linear-gradient(#ff3988, #bf0650)",
                  color: "white",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "bold",
                  minWidth: "20px",
                  zIndex: 1,
                }}
              >
                {cartItems.length}
              </span>
            )}
          </div>

          <span>{t("common.cart")}</span>
        </div>
      </div>
      {isCartModalOpen && (
        <MycartMbl onClose={handleCloseCart} visible={isCartModalOpen} />
      )}
    </>
  );
}

export default MobileBottomNav;
