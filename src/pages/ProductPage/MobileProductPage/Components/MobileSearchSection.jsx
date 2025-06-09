import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

import searchIcon from "../../../../assets/icons/lens.svg";

function MobileSearchSection() {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const sortBtnRef = useRef(null);
  const filterBtnRef = useRef(null);
  const { t } = useTranslation();

  const sortOptions = [
    {
      label: t("productHead.priceHighToLow"),
      isSelected: true
    }
    // Uncomment to add more options:
    // { label: t("productHead.priceLowToHigh"), isSelected: false }
  ];

  const filterOptions = [
    {
      label: t("productHead.attractions"),
      isSelected: true
    }
  ];

  const filterButtons = [
    {
      label: t("productHead.sortBy"),
      isOpen: showSortDropdown,
      onClick: () => setShowSortDropdown(!showSortDropdown),
      ref: sortBtnRef,
      options: sortOptions
    },
    {
      label: t("productHead.filterBy"),
      isOpen: showFilterDropdown,
      onClick: () => setShowFilterDropdown(!showFilterDropdown),
      ref: filterBtnRef,
      options: filterOptions
    }
  ];

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
        {filterButtons.map((button, index) => (
          <div key={index} style={{ position: "relative" }} ref={button.ref}>
            <button
              className="mobile-top-search-section__filter-btn"
              onClick={button.onClick}
            >
              {button.label} <span className="chevron">&#9662;</span>
            </button>
            {button.isOpen && (
              <div className="mobile-top-search-section__dropdown">
                {button.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="mobile-top-search-section__dropdown-option">
                    <span>{option.label}</span>
                    {option.isSelected && (
                      <span className="mobile-top-search-section__check">✓</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MobileSearchSection; 