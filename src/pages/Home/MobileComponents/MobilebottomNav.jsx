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
    // Use same simple logic as desktop ChatWithUsButton
    if (window.sprChat) {
      if (isChatOpen) {
        window.sprChat("close");
      } else {
        window.sprChat("open");
      }
    }
    // State will be updated by the observer
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

    const updateChatOpenState = () => {
      // Use the same logic as desktop ChatWithUsButton
      const chatBox = document.querySelector(".spr-chat__box");
      const chatWidget = document.querySelector(".ezg1tqb1"); // Sprinklr chat container

      let isOpen = false;

      // Check various indicators of chat being open (same as desktop)
      if (chatBox) {
        isOpen =
          !chatBox.classList.contains("spr-chat--minimized") &&
          chatBox.style.display !== "none";
      } else if (chatWidget) {
        isOpen = chatWidget.style.display !== "none";
      }

      console.log("Chat state detected:", isOpen);

      setIsChatOpen(isOpen);
    };

    setIsIpadTarget(computeIsIpadTarget());

    // Initial chat state check
    updateChatOpenState();

    const onResize = () => setIsIpadTarget(computeIsIpadTarget());
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    // Set up observer to watch for Sprinklr chat state changes (same as desktop)
    let currentState = false;
    const observer = new MutationObserver(() => {
      updateChatOpenState();
      // Update current state after check (same as desktop)
      const chatBox = document.querySelector(".spr-chat__box");
      const chatWidget = document.querySelector(".ezg1tqb1");
      if (chatBox) {
        currentState =
          !chatBox.classList.contains("spr-chat--minimized") &&
          chatBox.style.display !== "none";
      } else if (chatWidget) {
        currentState = chatWidget.style.display !== "none";
      }
    });

    // Start observing when Sprinklr is loaded (same as desktop)
    const waitForSprinklr = setInterval(() => {
      const chatElements = document.querySelector(".spr-chat__box, .ezg1tqb1");
      if (chatElements || window.sprChat) {
        clearInterval(waitForSprinklr);

        // Observe the entire body for Sprinklr changes
        observer.observe(document.body, {
          attributes: true,
          childList: true,
          subtree: true,
          attributeFilter: ["class", "style"],
        });

        // Initial check
        updateChatOpenState();

        // Also listen for Sprinklr events if available
        if (window.sprChat && window.sprChat.on) {
          window.sprChat.on("open", () => {
            setIsChatOpen(true);
          });
          window.sprChat.on("close", () => {
            setIsChatOpen(false);
          });
        }
      }
    }, 100);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      clearInterval(waitForSprinklr);
      observer.disconnect();
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
