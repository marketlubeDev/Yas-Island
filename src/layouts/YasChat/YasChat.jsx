import { css } from "@emotion/react";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function YasChat() {
  const { currentLanguage } = useSelector((state) => state.language);
  const cssRef = useRef(null);

  useEffect(() => {
    if (currentLanguage === "ar") {
      cssRef.current = `
        /* Chat launcher button (stable + fallback hashed class) */
        .spr-chat__launcher,
        [class*="spr-chat__launcher"],
        .ezg1tqb0 {
          right: 20px !important;
          left: auto !important;
          bottom: 65px !important;
          opacity: 0 !important;
        }
        /* Chat button styling container (stable + fallback hashed class) */
        .spr-chat__launcher-container,
        [class*="spr-chat__launcher-container"],
        .css-15gnlaj {
          width: 160px !important;
          height: 40px !important;
        }
        /* Chat box position */
        .spr-chat__box {
          left: auto !important;
          right: 20px !important;
          transform-origin: right bottom !important;
          bottom: 80px !important;
        }

        /* Mobile: bottom-center placement */
        @media (max-width: 768px) {
          .spr-chat__launcher,
          [class*="spr-chat__launcher"],
          .ezg1tqb0 {
            left: 50% !important;
            right: auto !important;
            bottom: 24px !important;
            transform: translateX(-50%) !important;
          }
          .spr-chat__launcher-container,
          [class*="spr-chat__launcher-container"],
          .css-15gnlaj {
            width: 160px !important;
            height: 40px !important;
          }
          .spr-chat__box {
            left: 50% !important;
            right: auto !important;
            bottom: 80px !important;
            transform: translateX(-50%) !important;
            transform-origin: bottom center !important;
          }
          .spr-chat__notification {
            left: 50% !important;
            right: auto !important;
            bottom: 80px !important;
            transform: translateX(-50%) !important;
            transform-origin: bottom center !important;
          }
        }

        /* iPad Air portrait (820px) - center like mobile */
        @media (min-width: 810px) and (max-width: 830px) {
          .spr-chat__launcher,
          [class*="spr-chat__launcher"],
          .ezg1tqb0 {
            left: 50% !important;
            right: auto !important;
            bottom: 24px !important;
            transform: translateX(-50%) !important;
          }
          .spr-chat__box,
          .spr-chat__notification {
            left: 50% !important;
            right: auto !important;
            bottom: 80px !important;
            transform: translateX(-50%) !important;
            transform-origin: bottom center !important;
          }
        }

        /* iPad Mini landscape (≈1133x744) - center like mobile */
        @media (hover: none) and (pointer: coarse) and (min-width: 1024px) and (max-width: 1134px) and (max-height: 834px) {
          .spr-chat__launcher,
          [class*="spr-chat__launcher"],
          .ezg1tqb0 {
            left: 50% !important;
            right: auto !important;
            bottom: 24px !important;
            transform: translateX(-50%) !important;
          }
          .spr-chat__box,
          .spr-chat__notification {
            left: 50% !important;
            right: auto !important;
            bottom: 80px !important;
            transform: translateX(-50%) !important;
            transform-origin: bottom center !important;
          }
        }

        /* iPad Air landscape (≈1180x820) - center like mobile */
        @media (hover: none) and (pointer: coarse) and (min-width: 1080px) and (max-width: 1180px) and (max-height: 920px) {
          .spr-chat__launcher,
          [class*="spr-chat__launcher"],
          .ezg1tqb0 {
            left: 50% !important;
            right: auto !important;
            bottom: 24px !important;
            transform: translateX(-50%) !important;
          }
          .spr-chat__box,
          .spr-chat__notification {
            left: 50% !important;
            right: auto !important;
            bottom: 80px !important;
            transform: translateX(-50%) !important;
            transform-origin: bottom center !important;
          }
        }
      `;
    } else {
      cssRef.current = `
        /* Chat launcher button (stable + fallback hashed class) */
        .spr-chat__launcher,
        [class*="spr-chat__launcher"],
        .ezg1tqb0 {
          left: 20px !important;
          right: auto !important;
          bottom: 65px !important;
          opacity: 0 !important;
        }
        /* Chat button styling container (stable + fallback hashed class) */
        .spr-chat__launcher-container,
        [class*="spr-chat__launcher-container"],
        .css-15gnlaj {
          width: 160px !important;
          height: 40px !important;
        }
        /* Chat box position */
        .spr-chat__box {
          right: auto !important;
          left: 20px !important;
          transform-origin: left bottom !important;
          bottom: 80px !important;
        }

        /* Mobile: bottom-center placement */
        @media (max-width: 768px) {
          .spr-chat__launcher,
          [class*="spr-chat__launcher"],
          .ezg1tqb0 {
            left: 50% !important;
            right: auto !important;
            bottom: 24px !important;
            transform: translateX(-50%) !important;
          }
          .spr-chat__launcher-container,
          [class*="spr-chat__launcher-container"],
          .css-15gnlaj {
            width: 160px !important;
            height: 40px !important;
          }
          .spr-chat__box {
            left: 50% !important;
            right: auto !important;
            bottom: 80px !important;
            transform: translateX(-50%) !important;
            transform-origin: bottom center !important;
          }
          .spr-chat__notification {
            left: 50% !important;
            right: auto !important;
            bottom: 80px !important;
            transform: translateX(-50%) !important;
            transform-origin: bottom center !important;
          }
        }

        /* iPad Air portrait (820px) - center like mobile */
        @media (min-width: 810px) and (max-width: 830px) {
          .spr-chat__launcher,
          [class*="spr-chat__launcher"],
          .ezg1tqb0 {
            left: 50% !important;
            right: auto !important;
            bottom: 24px !important;
            transform: translateX(-50%) !important;
          }
          .spr-chat__box,
          .spr-chat__notification {
            left: 50% !important;
            right: auto !important;
            bottom: 80px !important;
            transform: translateX(-50%) !important;
            transform-origin: bottom center !important;
          }
        }

        /* iPad Mini landscape (≈1133x744) - center like mobile */
        @media (hover: none) and (pointer: coarse) and (min-width: 1024px) and (max-width: 1134px) and (max-height: 834px) {
          .spr-chat__launcher,
          [class*="spr-chat__launcher"],
          .ezg1tqb0 {
            left: 50% !important;
            right: auto !important;
            bottom: 24px !important;
            transform: translateX(-50%) !important;
          }
          .spr-chat__box,
          .spr-chat__notification {
            left: 50% !important;
            right: auto !important;
            bottom: 80px !important;
            transform: translateX(-50%) !important;
            transform-origin: bottom center !important;
          }
        }

        /* iPad Air landscape (≈1180x820) - center like mobile */
        @media (hover: none) and (pointer: coarse) and (min-width: 1080px) and (max-width: 1180px) and (max-height: 920px) {
          .spr-chat__launcher,
          [class*="spr-chat__launcher"],
          .ezg1tqb0 {
            left: 50% !important;
            right: auto !important;
            bottom: 24px !important;
            transform: translateX(-50%) !important;
          }
          .spr-chat__box,
          .spr-chat__notification {
            left: 50% !important;
            right: auto !important;
            bottom: 80px !important;
            transform: translateX(-50%) !important;
            transform-origin: bottom center !important;
          }
        }
      `;
    }

    // Update inline style immediately if already injected
    if (typeof document !== "undefined") {
      const styleEl = document.getElementById("yas-chat-inline-style");
      if (styleEl) styleEl.textContent = cssRef.current;
    }
  }, [currentLanguage]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const settings = {
      appId: "670e1a41771ace477a7b6b14_app_1111003793",
      skin: "MODERN",
    };

    window.sprChatSettings = settings;

    const scriptId = "spr-chat-widget";
    const scriptSrc =
      "https://prod15-live-chat.sprinklr.com/api/livechat/handshake/widget/" +
      settings.appId;

    const loadScript = () => {
      const existing = document.getElementById(scriptId);
      if (existing) return;

      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "text/javascript";
      script.async = true;
      script.src = scriptSrc;
      script.onerror = function () {
        if (window.sprChat) window.sprChat.loaded = false;
      };
      script.onload = function () {
        if (window.sprChat) window.sprChat.loaded = true;
      };
      const firstScript = document.getElementsByTagName("script")[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    };

    const ensureStub = () => {
      const current = window.sprChat;
      const isLoaded = typeof current === "function" && !!current.loaded;
      if (isLoaded) return current;

      if (typeof current !== "function") {
        const stub = function () {
          stub.m(arguments);
        };
        stub.q = [];
        stub.m = function (args) {
          stub.q.push(args);
        };
        window.sprChat = stub;
        return stub;
      }
      return current;
    };

    const spr = ensureStub();

    // Inject chat CSS via a style tag so !important works and timing isn't an issue
    const STYLE_ID = "yas-chat-inline-style";
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.type = "text/css";
      const baseCss = `
        /* Close button base (hidden by default; shown via MQ + open state) */
        #yas-chat-close-btn {
          position: fixed;
          z-index: 900;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
          border-radius: 9999px;
          border: none;
          background: #231942;
          color: #ffffff;
          display: none;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          cursor: pointer;
        }

        /* Ensure chat stays below app drawers/modals */
        .spr-chat__box,
        .spr-chat__notification,
        .spr-chat__overlay,
        .spr-chat__backdrop,
        .spr-chat__launcher,
        [class*="spr-chat__overlay"],
        [class*="spr-chat__container"] {
          z-index: 900 !important;
        }

        /* Completely hide chat on Payment Details page */
        body.page-payment-details .spr-chat__launcher,
        body.page-payment-details [class*="spr-chat__launcher"],
        body.page-payment-details .spr-chat__box,
        body.page-payment-details .spr-chat__notification,
        body.page-payment-details .spr-chat__overlay,
        body.page-payment-details .spr-chat__backdrop {
          display: none !important;
          pointer-events: none !important;
        }

        /* Completely hide chat on Payment Checkout/Email Verification page */
        body.page-payment-checkout .spr-chat__launcher,
        body.page-payment-checkout [class*="spr-chat__launcher"],
        body.page-payment-checkout .spr-chat__box,
        body.page-payment-checkout .spr-chat__notification,
        body.page-payment-checkout .spr-chat__overlay,
        body.page-payment-checkout .spr-chat__backdrop {
          display: none !important;
          pointer-events: none !important;
        }

        /* When chat is open on target devices: hide launcher, show close button */
        @media (max-width: 768px), (min-width: 810px) and (max-width: 830px), (hover: none) and (pointer: coarse) and (min-width: 1024px) and (max-width: 1134px) and (max-height: 834px), (hover: none) and (pointer: coarse) and (min-width: 1080px) and (max-width: 1180px) and (max-height: 920px) {
          .yas-chat-open .spr-chat__launcher,
          .yas-chat-open [class*="spr-chat__launcher"],
          .yas-chat-open .ezg1tqb0 { display: none !important; }
          .yas-chat-open #yas-chat-close-btn { display: flex; }
        }
      `;
      style.appendChild(
        document.createTextNode(baseCss + "\n" + cssRef.current)
      );
      document.head.appendChild(style);
    }

    if (typeof spr === "function" && spr.loaded) {
      spr("update", settings);
    } else if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", loadScript, { once: true });
    } else {
      loadScript();
    }

    // Determine if current viewport is an iPad Air/Mini target
    const isIpadTarget = () => {
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
      return mq1 || mqAirPortrait || mqMiniLandscape || mqAirLandscape;
    };

    // Observe chat open/close state and toggle body class
    const updateOpenState = () => {
      const box = document.querySelector(".spr-chat__box");
      const isOpen = !!(
        box &&
        box.offsetParent !== null &&
        getComputedStyle(box).visibility !== "hidden" &&
        getComputedStyle(box).opacity !== "0"
      );
      document.body.classList.toggle("yas-chat-open", isIpadTarget() && isOpen);
    };

    const enforcePageOverrides = () => {
      const isPaymentPage =
        document.body.classList.contains("page-payment-details") ||
        document.body.classList.contains("page-payment-checkout");
      const targets = document.querySelectorAll(
        '.spr-chat__launcher, [class*="spr-chat__launcher"], .spr-chat__box, .spr-chat__notification, .spr-chat__overlay, .spr-chat__backdrop, [class^="spr-chat"], [class*=" spr-chat"]'
      );
      targets.forEach((el) => {
        if (!(el && el.style)) return;
        if (isPaymentPage) {
          el.style.setProperty("display", "none", "important");
          el.style.setProperty("pointer-events", "none", "important");
        } else {
          // Restore interactivity but keep lowered z-index
          el.style.removeProperty("display");
          el.style.removeProperty("pointer-events");
          el.style.setProperty("z-index", "900", "important");
        }
      });
    };

    const observer = new MutationObserver(() => {
      updateOpenState();
      enforcePageOverrides();
    });
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });
    window.addEventListener("resize", updateOpenState);
    window.addEventListener("orientationchange", updateOpenState);

    // Initial state evaluation (after small delay to allow widget to render if already loaded)
    setTimeout(() => {
      updateOpenState();
      enforcePageOverrides();
    }, 300);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateOpenState);
      window.removeEventListener("orientationchange", updateOpenState);
    };
  }, []);

  return null;
}
