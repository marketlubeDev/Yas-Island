import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaExclamationTriangle, FaRedo } from "react-icons/fa";

const ErrorDisplay = ({ title, message, onRetry, showRetryButton = true }) => {
  const { t } = useTranslation();

  // Detect mobile viewport
  const [isMobile, setIsMobile] = useState(false);
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const dir =
      typeof document !== "undefined" ? document.documentElement.dir : "ltr";
    setIsRTL(String(dir).toLowerCase() === "rtl");
  }, []);

  // Container styles matching ProductCard container
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: isMobile ? "calc(100vh - 12rem)" : "calc(100vh - 15rem)",
    padding: isMobile ? "1.25rem" : "2rem",
    backgroundColor: "var(--color-base-product-card-bg)",
    textAlign: "center",
    fontFamily: '"YAS Font", sans-serif',
    animation: "fadeInUp 0.8s ease-out",
    transform: isMobile ? "scale(0.92)" : undefined,
    transformOrigin: "top center",
  };

  // Error icon styles with warning/error theme
  const iconStyle = {
    width: isMobile
      ? "calc(72px * var(--zoom-scale))"
      : "calc(100px * var(--zoom-scale))",
    height: isMobile
      ? "calc(72px * var(--zoom-scale))"
      : "calc(100px * var(--zoom-scale))",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 59, 48, 0.1)", // Light red background
    border: "3px solid rgba(255, 59, 48, 0.3)", // Red border
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: isMobile ? "1rem" : "1.5rem",
    color: "#ff3b30", // Red color
    fontSize: isMobile
      ? "calc(2rem * var(--zoom-scale))"
      : "calc(2.5rem * var(--zoom-scale))",
    animation: "errorPulse 2s ease-in-out infinite",
  };

  // No inner rotation; keep icon static

  // Title styles with error emphasis
  const titleStyle = {
    fontSize: isMobile
      ? "calc(1.5rem * var(--zoom-scale))"
      : "calc(2rem * var(--zoom-scale))",
    fontWeight: "700",
    color: "var(--color-base-text)",
    marginBottom: isMobile ? "0.75rem" : "1rem",
    lineHeight: "normal",
    fontFamily: '"YAS Font", sans-serif',
  };

  // Subtitle/message styles
  const messageStyle = {
    fontSize: isMobile
      ? "calc(0.95rem * var(--zoom-scale))"
      : "calc(1.1rem * var(--zoom-scale))",
    color: "var(--color-base-text-secondary)",
    marginBottom: isMobile ? "1.25rem" : "2rem",
    maxWidth: isMobile ? "480px" : "600px",
    lineHeight: "1.6",
    fontFamily: '"YAS Font", sans-serif',
  };

  // Retry button styles
  const retryButtonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: isMobile
      ? "calc(0.7rem * var(--zoom-scale)) calc(1.4rem * var(--zoom-scale))"
      : "calc(0.9rem * var(--zoom-scale)) calc(2rem * var(--zoom-scale))",
    backgroundColor: "var(--color-base-product-card-add-cart-btn-bg)",
    border: "2px solid var(--color-base-mobile-product-page-btn-border)",
    borderRadius: "2rem",
    color: "var(--color-base-text)",
    fontSize: isMobile
      ? "calc(0.95rem * var(--zoom-scale))"
      : "calc(1.1rem * var(--zoom-scale))",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: '"YAS Font", sans-serif',
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: isMobile
      ? "0 3px 16px rgba(0, 0, 0, 0.12)"
      : "0 4px 20px rgba(0, 0, 0, 0.15)",
  };

  // Error details box style
  const errorBoxStyle = {
    backgroundColor: "rgba(255, 59, 48, 0.05)",
    border: "1px solid rgba(255, 59, 48, 0.2)",
    borderRadius: "12px",
    padding: isMobile ? "0.75rem 1rem" : "1rem 1.5rem",
    marginBottom: isMobile ? "1rem" : "2rem",
    maxWidth: isMobile ? "420px" : "500px",
    width: "100%",
  };

  const errorTextStyle = {
    fontSize: isMobile
      ? "calc(0.9rem * var(--zoom-scale))"
      : "calc(0.95rem * var(--zoom-scale))",
    color: "var(--color-base-text-secondary)",
    fontFamily: '"YAS Font", sans-serif',
    margin: 0,
  };

  return (
    <div style={containerStyle}>
      {/* Error Icon with animation */}
      <div style={iconStyle}>
        <FaExclamationTriangle />
      </div>

      {/* Title */}
      <h2 style={titleStyle}>
        {title || t("error.title", "Oops! Something went wrong")}
      </h2>

      {/* Error Message Box */}
      <div style={errorBoxStyle}>
        <p style={errorTextStyle}>
          {message ||
            t(
              "error.message",
              "We encountered an error while loading the products. This could be due to a network issue or server problem."
            )}
        </p>
      </div>

      {/* Suggestions */}
      <p style={messageStyle}>
        {t(
          "error.suggestions",
          "Please try refreshing the page or check your internet connection. If the problem persists, contact our support team."
        )}
      </p>

      {/* Retry Button */}
      {showRetryButton && onRetry && (
        <button
          style={retryButtonStyle}
          onClick={onRetry}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-3px) scale(1.02)";
            e.target.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0) scale(1)";
            e.target.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
          }}
        >
          <FaRedo
            size={16}
            style={{ transform: isRTL ? "scaleX(-1)" : undefined }}
          />
          {t("error.retry", "Try Again")}
        </button>
      )}

      <style>
        {`
          @keyframes errorPulse {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(255, 59, 48, 0.4);
            }
            50% {
              transform: scale(1.05);
              box-shadow: 0 0 0 10px rgba(255, 59, 48, 0);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* iconSpin removed - keep icon static */
        `}
      </style>
    </div>
  );
};

export default ErrorDisplay;
