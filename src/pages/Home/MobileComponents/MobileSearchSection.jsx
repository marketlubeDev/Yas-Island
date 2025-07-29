import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useLanguage } from "../../../context/LanguageContext";
import {
  setCurrentPark,
  setCurrentSort,
  setSearchQuery,
} from "../../../global/productSlice";

import searchIcon from "../../../assets/icons/lens.svg";
import invertedSearchIcon from "../../../assets/icons/invertedlens.svg";
import downArrow from "../../../assets/icons/down.svg";
import invertedDownArrow from "../../../assets/icons/invertdown.svg";

function MobileSearchSection() {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const sortBtnRef = useRef(null);
  const filterBtnRef = useRef(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  const { parks, currentPark, currentSort, searchQuery } = useSelector(
    (state) => state.product
  );
  const searchIconSrc = isDarkMode ? invertedSearchIcon : searchIcon;
  const downArrowSrc = isDarkMode ? invertedDownArrow : downArrow;
  const { language } = useLanguage();

  const sortOptions = [
    {
      label: t("productHead.selectSort"),
      value: t("productHead.selectSort"),
      isSelected: currentSort === t("productHead.selectSort"),
    },
    {
      label: t("productHead.priceHighToLow"),
      value: t("productHead.priceHighToLow"),
      isSelected: currentSort === t("productHead.priceHighToLow"),
    },
    {
      label: t("productHead.priceLowToHigh"),
      value: t("productHead.priceLowToHigh"),
      isSelected: currentSort === t("productHead.priceLowToHigh"),
    },
  ];

  const filterOptions = [
    {
      label: t("productHead.selectPark"),
      value: "",
      isSelected: !currentPark,
    },
    ...parks.map((park) => ({
      label: park,
      value: park,
      isSelected: currentPark === park,
    })),
  ];

  const filterButtons = [
    {
      label: t("productHead.selectSort"),
      isOpen: showSortDropdown,
      onClick: () => setShowSortDropdown(!showSortDropdown),
      ref: sortBtnRef,
      options: sortOptions,
      onOptionClick: (value) => {
        dispatch(setCurrentSort(value));
        setShowSortDropdown(false);
      },
    },
    {
      label: currentPark || t("productHead.filterBy"),
      isOpen: showFilterDropdown,
      onClick: () => setShowFilterDropdown(!showFilterDropdown),
      ref: filterBtnRef,
      options: filterOptions,
      onOptionClick: (value) => {
        dispatch(setCurrentPark(value));
        setShowFilterDropdown(false);
      },
    },
  ];

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

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
    <div
      className="mobile-top-search-section"
      style={{ backgroundColor: isDarkMode ? "black" : "#FFFFFF" }}
    >
      <h2 className="mobile-top-search-section__title">
        {/* {t("common.selectAttractions")} */}
      </h2>
      <div className="mobile-top-search-section__searchbar">
        <input
          type="text"
          placeholder={t("common.searchPlaceholderMobile")}
          value={searchQuery}
          onChange={handleSearch}
        />
        <button>
          <img src={searchIconSrc} alt="Search" />
        </button>
      </div>
      <div className="mobile-top-search-section__filters">
        {filterButtons.map((button, index) => (
          <div
            className="mobile-top-search-section__filter-btn-container"
            key={index}
            style={{ position: "relative" }}
            ref={button.ref}
          >
            <button
              className={`mobile-top-search-section__filter-btn${
                language === "العربية"
                  ? " mobile-top-search-section__filter-btn--ar"
                  : ""
              }`}
              onClick={button.onClick}
              style={
                language === "العربية"
                  ? {
                      display: "flex",
                      flexDirection: "row-reverse",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }
                  : {}
              }
            >
              {language === "العربية" ? (
                <>
                  <span>{button.label}</span>
                  <img
                    src={downArrowSrc}
                    alt="down arrow"
                    className="chevron"
                    style={{ width: 12, height: 12, marginTop: 5 }}
                  />
                </>
              ) : (
                <>
                  <span>{button.label}</span>
                  <img
                    src={downArrowSrc}
                    alt="down arrow"
                    className="chevron"
                    style={{ width: 12, height: 12, marginTop: 5 }}
                  />
                </>
              )}
            </button>
            {button.isOpen && (
              <div
                className={`mobile-top-search-section__dropdown${
                  language === "العربية"
                    ? " mobile-top-search-section__dropdown--ar"
                    : ""
                }`}
              >
                {button.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="mobile-top-search-section__dropdown-option"
                    onClick={() => button.onOptionClick(option.value)}
                  >
                    <span>{option.label}</span>
                    {option.isSelected && (
                      <span className="mobile-top-search-section__check">
                        ✓
                      </span>
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
