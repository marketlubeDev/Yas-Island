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
    console.log("Chat click - current state:", isChatOpen);

    const closeChat = () => {
      let closed = false;
      console.log("Attempting to close chat");

      if (window.sprChat) {
        try {
          window.sprChat("close");
          closed = true;
          console.log("Closed via window.sprChat");
        } catch (error) {
          console.log("Error closing via sprChat:", error);
        }
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
            console.log("Found close button:", sel);
            el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            closed = true;
            break;
          }
        }
      }

      return closed;
    };

    const openChat = () => {
      let opened = false;
      console.log("Attempting to open chat");

      if (window.sprChat) {
        try {
          window.sprChat("open");
          opened = true;
          console.log("Opened via window.sprChat");
        } catch (error) {
          console.log("Error opening via sprChat:", error);
        }
      }

      if (!opened) {
        const launcher = document.querySelector(
          '.spr-chat__launcher, [class*="spr-chat__launcher"], .ezg1tqb0'
        );
        if (launcher) {
          console.log("Found chat launcher, clicking it");
          launcher.dispatchEvent(new MouseEvent("click", { bubbles: true }));
          opened = true;
        } else {
          console.log("No chat launcher found");
        }
      }

      return opened;
    };

    // Check if we're in a production environment with actual Sprinklr
    const hasRealChat = !!(
      window.sprChat || document.querySelector(".spr-chat__launcher, .ezg1tqb0")
    );

    if (hasRealChat) {
      console.log("Real chat detected, using Sprinklr integration");
      // In production with real Sprinklr, let the chat widget manage its own state
      // We'll update our state based on the actual chat state detection
      if (isChatOpen) {
        const closed = closeChat();
        if (closed) {
          // Let the mutation observer or periodic check update the state
          setTimeout(() => {
            // Fallback state update if observer doesn't catch it
            const box = document.querySelector(".spr-chat__box");
            const isStillOpen = !!(
              box &&
              box.offsetParent !== null &&
              getComputedStyle(box).visibility !== "hidden" &&
              getComputedStyle(box).opacity !== "0" &&
              !box.classList.contains("spr-chat--minimized")
            );
            if (!isStillOpen) {
              setIsChatOpen(false);
            }
          }, 500);
        }
      } else {
        const opened = openChat();
        if (opened) {
          // Let the mutation observer or periodic check update the state
          setTimeout(() => {
            // Fallback state update if observer doesn't catch it
            const box = document.querySelector(".spr-chat__box");
            const isNowOpen = !!(
              box &&
              box.offsetParent !== null &&
              getComputedStyle(box).visibility !== "hidden" &&
              getComputedStyle(box).opacity !== "0" &&
              !box.classList.contains("spr-chat--minimized")
            );
            if (isNowOpen) {
              setIsChatOpen(true);
            }
          }, 500);
        }
      }
    } else {
      console.log("No real chat detected, using simple toggle");
      // In development or when Sprinklr isn't available, use simple toggle
      setIsChatOpen(!isChatOpen);
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

    const updateChatOpenState = () => {
      // Only run state detection if we have real Sprinklr chat
      const hasRealChat = !!(
        window.sprChat ||
        document.querySelector(".spr-chat__launcher, .ezg1tqb0")
      );

      if (hasRealChat) {
        const box = document.querySelector(".spr-chat__box");
        const isOpen = !!(
          box &&
          box.offsetParent !== null &&
          getComputedStyle(box).visibility !== "hidden" &&
          getComputedStyle(box).opacity !== "0" &&
          !box.classList.contains("spr-chat--minimized")
        );

        console.log("Real chat state detected:", isOpen);
        setIsChatOpen(isOpen);
      }
      // In development, don't auto-detect state, let manual toggle handle it
    };

    setIsIpadTarget(computeIsIpadTarget());

    // Initial chat state check
    updateChatOpenState();

    const onResize = () => setIsIpadTarget(computeIsIpadTarget());
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    // Set up mutation observer for production chat state detection
    const hasRealChat = !!(
      window.sprChat || document.querySelector(".spr-chat__launcher, .ezg1tqb0")
    );
    let observer = null;
    let intervalCheck = null;

    if (hasRealChat) {
      console.log("Setting up real chat monitoring");
      observer = new MutationObserver(() => updateChatOpenState());
      observer.observe(document.body, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["style", "class"],
      });

      // Periodic check for production
      intervalCheck = setInterval(updateChatOpenState, 2000);

      // Listen for Sprinklr events if available
      if (window.sprChat && window.sprChat.on) {
        window.sprChat.on("open", () => {
          console.log("Sprinklr chat opened via event");
          setIsChatOpen(true);
        });
        window.sprChat.on("close", () => {
          console.log("Sprinklr chat closed via event");
          setIsChatOpen(false);
        });
      }
    } else {
      console.log("No real chat detected, skipping monitoring setup");
    }

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (observer) observer.disconnect();
      if (intervalCheck) clearInterval(intervalCheck);
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
          onClick={(e) => {
            console.log("Chat button clicked:", e.target);
            handleChatClick();
          }}
          style={{ cursor: "pointer" }}
        >
          <img
            src={isChatOpen ? crossIconSrc : chatIconSrc}
            alt={isChatOpen ? t("common.close") : t("common.chatWithUs")}
            onClick={(e) => {
              console.log("Image clicked:", e.target);
              e.stopPropagation();
              handleChatClick();
            }}
            style={{ cursor: "pointer", pointerEvents: "auto" }}
          />
          {!isChatOpen && (
            <span
              onClick={(e) => {
                console.log("Text clicked:", e.target);
                e.stopPropagation();
                handleChatClick();
              }}
              style={{ cursor: "pointer" }}
            >
              {t("common.chatWithUs")}
            </span>
          )}
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
