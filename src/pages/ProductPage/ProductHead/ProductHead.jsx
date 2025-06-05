import React, { useState, useRef, useEffect } from "react";
import Search from "../../../components/Common/Search/Search";
import { useSelector } from "react-redux";
import Selector from "../../../components/Common/Selectors/Selector";

export default function ProductHead() {
  const { isDesktop, isBigDesktop } = useSelector((state) => state.responsive);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Price (High to Low)");
  const [selectedFilter, setSelectedFilter] = useState("Attractions");
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
    <div className="product-head">
      <Search />
      {isDesktop ||
        (isBigDesktop && (
          <div className="product-head__right">
            <div className="product-head__filters">
              <div style={{ position: "relative" }} ref={sortBtnRef}>
                <button
                  className="product-head__filter-btn"
                  onClick={() => setShowSortDropdown((v) => !v)}
                >
                  Sort by <span className="chevron">&#9662;</span>
                </button>
                {showSortDropdown && (
                  <div className="product-head__dropdown">
                    <div
                      className="product-head__dropdown-option"
                      onClick={() => {
                        setSelectedSort("Price (High to Low)");
                        setShowSortDropdown(false);
                      }}
                    >
                      <span>Price (High to Low)</span>
                      {selectedSort === "Price (High to Low)" && (
                        <span className="product-head__check">✓</span>
                      )}
                    </div>
                    <div
                      className="product-head__dropdown-option"
                      onClick={() => {
                        setSelectedSort("Price (Low to High)");
                        setShowSortDropdown(false);
                      }}
                    >
                      <span>Price (Low to High)</span>
                      {selectedSort === "Price (Low to High)" && (
                        <span className="product-head__check">✓</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div style={{ position: "relative" }} ref={filterBtnRef}>
                <button
                  className="product-head__filter-btn"
                  onClick={() => setShowFilterDropdown((v) => !v)}
                >
                  Filter by <span className="chevron">&#9662;</span>
                </button>
                {showFilterDropdown && (
                  <div className="product-head__dropdown">
                    <div
                      className="product-head__dropdown-option"
                      onClick={() => {
                        setSelectedFilter("Attractions");
                        setShowFilterDropdown(false);
                      }}
                    >
                      <span>Attractions</span>
                      {selectedFilter === "Attractions" && (
                        <span className="product-head__check">✓</span>
                      )}
                    </div>
                    <div
                      className="product-head__dropdown-option"
                      onClick={() => {
                        setSelectedFilter("Packages");
                        setShowFilterDropdown(false);
                      }}
                    >
                      <span>Packages</span>
                      {selectedFilter === "Packages" && (
                        <span className="product-head__check">✓</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
