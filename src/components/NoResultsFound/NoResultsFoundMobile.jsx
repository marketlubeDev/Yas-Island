import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLanguage } from "../../context/LanguageContext";
import { FaSearch, FaTimes } from "react-icons/fa";

const NoResultsFoundMobile = ({
  searchQuery = "",
  currentPark = "",
  currentSort = "",
  onClearFilters,
  onExploreAll,
}) => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const hasActiveFilters = searchQuery || currentPark || currentSort;

  // Container styles matching mobile product page patterns
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    backgroundColor: "var(--color-base-mobile-product-page-bg)",
    textAlign: "center",
    fontFamily: '"YAS Font", sans-serif',
    animation: "fadeInUp 0.8s ease-out",
  };

  // Icon styles matching mobile patterns
  const iconStyle = {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "var(--color-base-side-bar-item-bg)",
    border: "2px solid var(--color-base-side-bar-item-box-border)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1.5rem",
    color: "var(--color-base-text)",
    fontSize: "1.5rem",
    animation: "cardHoverFloat 3s ease-in-out infinite",
  };

  // Title styles matching mobile product page title patterns
  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "var(--color-base-mobile-product-page-title)",
    marginBottom: "0.75rem",
    lineHeight: "normal",
    textTransform: "capitalize",
    fontFamily: '"YAS Font", sans-serif',
  };

  // Subtitle styles matching mobile product page subtitle patterns
  const subtitleStyle = {
    fontSize: "1rem",
    color: "var(--color-base-mobile-product-page-subtitle)",
    marginBottom: "1.5rem",
    maxWidth: "300px",
    lineHeight: "1.5",
    fontFamily: '"YAS Font", sans-serif',
  };

  // Button container styles
  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1.5rem",
    width: "100%",
    maxWidth: "300px",
  };

  // Primary button styles matching mobile cart button patterns
  const primaryButtonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.8rem 1.2rem",
    backgroundColor: "var(--color-base-mobile-product-page-btn-bg)",
    border: "2px solid var(--color-base-mobile-product-page-btn-border)",
    borderRadius: "2rem",
    color: "var(--color-base-mobile-product-page-btn-text)",
    fontSize: "0.95rem",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: '"YAS Font", sans-serif',
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
  };

  const handleClearFilters = () => {
    if (onClearFilters) {
      onClearFilters();
    }
  };

  return (
    <div style={containerStyle}>
      {/* Main Icon */}
      <div style={iconStyle}>
        <FaSearch />
      </div>

      {/* Title */}
      <h2 style={titleStyle}>
        {hasActiveFilters
          ? t("noResults.titleWithFilters", "No results found")
          : t("noResults.title", "No attractions available")}
      </h2>

      {/* Subtitle */}
      <p style={subtitleStyle}>
        {hasActiveFilters
          ? t(
              "noResults.subtitleWithFilters",
              "We couldn't find any attractions matching your search criteria. Try adjusting your filters or search terms."
            )
          : t(
              "noResults.subtitle",
              "There are currently no attractions available. Please check back later or contact our support team."
            )}
      </p>

      {/* Action Buttons */}
      {hasActiveFilters && (
        <div style={buttonContainerStyle}>
          <button
            style={primaryButtonStyle}
            onClick={handleClearFilters}
            onTouchStart={(e) => {
              e.target.style.transform = "scale(0.98)";
              e.target.style.boxShadow = "0 1px 4px rgba(0, 0, 0, 0.2)";
            }}
            onTouchEnd={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            <FaTimes size={12} />
            {t("noResults.clearFilters", "Clear Filters")}
          </button>
        </div>
      )}
    </div>
  );
};

export default NoResultsFoundMobile;
