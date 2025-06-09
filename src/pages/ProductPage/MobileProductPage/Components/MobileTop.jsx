import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

import allIcon from "../../../../assets/icons/dash.svg";
import attractionsIcon from "../../../../assets/icons/beach.svg";
import packagesIcon from "../../../../assets/icons/dropbox.svg";
import hotelsIcon from "../../../../assets/icons/house.svg";
import diningIcon from "../../../../assets/icons/chef.svg";
import searchIcon from "../../../../assets/icons/lens.svg";

function MobileTop() {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const sortBtnRef = useRef(null);
  const filterBtnRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    function handleClickOutside(event) {
      if (sortBtnRef.current && !sortBtnRef.current.contains(event.target)) {
        setShowSortDropdown(false);
      }
      if (
        filterBtnRef.current &&
        !filterBtnRef.current.contains(event.target)
      ) {
        setShowFilterDropdown(false);
      }
    }
    if (showSortDropdown || showFilterDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSortDropdown, showFilterDropdown]);

  return (
    <div>
      <div className="mobile-top">
        <div className="mobile-top__item">
          <img
            src={allIcon}
            alt={t("sidebar.all")}
            className="mobile-top__icon"
          />
          <span>{t("sidebar.all")}</span>
        </div>
        <div className="mobile-top__item mobile-top__item--active">
          <img
            src={attractionsIcon}
            alt={t("sidebar.topAttractions")}
            className="mobile-top__icon"
          />
          <span>{t("sidebar.topAttractions")}</span>
          <div className="mobile-top__underline"></div>
        </div>
        <div className="mobile-top__item">
          <img
            src={packagesIcon}
            alt={t("sidebar.packages")}
            className="mobile-top__icon"
          />
          <span>{t("sidebar.packages")}</span>
        </div>
        <div className="mobile-top__item">
          <img
            src={hotelsIcon}
            alt={t("sidebar.hotels")}
            className="mobile-top__icon"
          />
          <span>{t("sidebar.hotels")}</span>
        </div>
        <div className="mobile-top__item">
          <img
            src={diningIcon}
            alt={t("sidebar.dining")}
            className="mobile-top__icon"
          />
          <span>{t("sidebar.dining")}</span>
        </div>
      </div>

      <div className="mobile-top-search-section">
        <h2 className="mobile-top-search-section__title">
          {t("common.selectAttractions")}
        </h2>
        <div className="mobile-top-search-section__searchbar">
          <input type="text" placeholder={t("common.searchPlaceholder")} />
          <button>
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
        <div className="mobile-top-search-section__filters">
          <div style={{ position: "relative" }} ref={sortBtnRef}>
            <button
              className="mobile-top-search-section__filter-btn"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
            >
              {t("productHead.sortBy")} <span className="chevron">&#9662;</span>
            </button>
            {showSortDropdown && (
              <div className="mobile-top-search-section__dropdown">
                <div className="mobile-top-search-section__dropdown-option">
                  <span>{t("productHead.priceHighToLow")}</span>
                  <span className="mobile-top-search-section__check">✓</span>
                </div>
                {/* <div className="mobile-top-search-section__dropdown-option">
                  <span>{t("productHead.priceLowToHigh")}</span>
                </div> */}
              </div>
            )}
          </div>
          <div style={{ position: "relative" }} ref={filterBtnRef}>
            <button
              className="mobile-top-search-section__filter-btn"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              {t("productHead.filterBy")}{" "}
              <span className="chevron">&#9662;</span>
            </button>
            {showFilterDropdown && (
              <div className="mobile-top-search-section__dropdown">
                <div className="mobile-top-search-section__dropdown-option">
                  <span>{t("productHead.attractions")}</span>
                  <span className="mobile-top-search-section__check">✓</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileTop;
