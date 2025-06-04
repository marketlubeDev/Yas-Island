import React, { useState, useRef, useEffect } from "react";

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
          <img src={allIcon} alt="All" className="mobile-top__icon" />
          <span>All</span>
        </div>
        <div className="mobile-top__item mobile-top__item--active">
          <img
            src={attractionsIcon}
            alt="Attractions"
            className="mobile-top__icon"
          />
          <span>Attractions</span>
          <div className="mobile-top__underline"></div>
        </div>
        <div className="mobile-top__item">
          <img src={packagesIcon} alt="Packages" className="mobile-top__icon" />
          <span>Packages</span>
        </div>
        <div className="mobile-top__item">
          <img src={hotelsIcon} alt="Hotels" className="mobile-top__icon" />
          <span>Hotels</span>
        </div>
        <div className="mobile-top__item">
          <img src={diningIcon} alt="Dining" className="mobile-top__icon" />
          <span>Dining</span>
        </div>
      </div>

      <div className="mobile-top-search-section">
        <h2 className="mobile-top-search-section__title">Select attractions</h2>
        <div className="mobile-top-search-section__searchbar">
          <input
            type="text"
            placeholder='Search Attractions " Ferrari World"'
          />
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
              Sort by <span className="chevron">&#9662;</span>
            </button>
            {showSortDropdown && (
              <div className="mobile-top-search-section__dropdown">
                <div className="mobile-top-search-section__dropdown-option">
                  <span>Price (High to Low)</span>
                  <span className="mobile-top-search-section__check">✓</span>
                </div>
                <div className="mobile-top-search-section__dropdown-option">
                  <span>Price (Low to High)</span>
                </div>
              </div>
            )}
          </div>
          <div style={{ position: "relative" }} ref={filterBtnRef}>
            <button
              className="mobile-top-search-section__filter-btn"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              Filter by <span className="chevron">&#9662;</span>
            </button>
            {showFilterDropdown && (
              <div className="mobile-top-search-section__dropdown">
                <div className="mobile-top-search-section__dropdown-option">
                  <span>Attractions</span>
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
