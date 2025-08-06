import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLanguage } from "../../context/LanguageContext";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";

const NoResultsFound = ({
  searchQuery = "",
  currentPark = "",
  currentSort = "",
  onClearFilters,
  onExploreAll,
}) => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const hasActiveFilters = searchQuery || currentPark || currentSort;

  // Container styles matching ProductCard container
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 15rem)",
    padding: "2rem",
    backgroundColor: "var(--color-base-product-card-bg)",
    textAlign: "center",
    fontFamily: '"YAS Font", sans-serif',
    animation: "fadeInUp 0.8s ease-out",
  };

  // Icon styles matching website's icon patterns
  const iconStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "var(--color-base-side-bar-item-bg)",
    border: "2px solid var(--color-base-side-bar-item-box-border)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
    color: "var(--color-base-text)",
    fontSize: "2rem",
    animation: "cardHoverFloat 3s ease-in-out infinite",
  };

  // Title styles matching ProductCard title patterns
  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "700",
    color: "var(--color-base-text)",
    marginBottom: "1rem",
    lineHeight: "normal",
    textTransform: "capitalize",
    fontFamily: '"YAS Font", sans-serif',
  };

  // Subtitle styles matching product description patterns
  const subtitleStyle = {
    fontSize: "1.1rem",
    color: "var(--color-base-text-secondary)",
    marginBottom: "2rem",
    maxWidth: "600px",
    lineHeight: "1.6",
    fontFamily: '"YAS Font", sans-serif',
  };

  // Button container styles
  const buttonContainerStyle = {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "2rem",
  };

  // Primary button styles matching cart button patterns
  const primaryButtonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.8rem 1.5rem",
    backgroundColor: "var(--color-base-product-card-add-cart-btn-bg)",
    border: "2px solid var(--color-base-mobile-product-page-btn-border)",
    borderRadius: "2rem",
    color: "var(--color-base-text)",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: '"YAS Font", sans-serif',
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  };

  // Secondary button styles matching website's secondary button patterns
  const secondaryButtonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.8rem 1.5rem",
    backgroundColor: "var(--color-base-btn-bg)",
    border: "2px solid var(--color-base-btn-border)",
    borderRadius: "2rem",
    color: "var(--color-base-text)",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: '"YAS Font", sans-serif',
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const handleClearFilters = () => {
    if (onClearFilters) {
      onClearFilters();
    }
  };

  const handleExploreAll = () => {
    if (onExploreAll) {
      onExploreAll();
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
      <div style={buttonContainerStyle}>
        {hasActiveFilters && (
          <button
            style={primaryButtonStyle}
            onClick={handleClearFilters}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
            }}
          >
            <FaTimes size={14} />
            {t("noResults.clearFilters", "Clear Filters")}
          </button>
        )}

        <button
          style={secondaryButtonStyle}
          onClick={handleExploreAll}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-3px)";
            e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
          }}
        >
          <MdOutlineExplore size={16} />
          {t("noResults.exploreAll", "Explore All Attractions")}
        </button>
      </div>
    </div>
  );
};

export default NoResultsFound;
