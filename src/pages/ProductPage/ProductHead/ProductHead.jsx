import React, { useState, useRef, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Search from "../../../components/Common/Search/Search";
import { useSelector, useDispatch } from "react-redux";
import Selector from "../../../components/Common/Selectors/Selector";
import { useLanguage } from "../../../context/LanguageContext";
import { setCurrentPark } from "../../../global/productSlice";

export default function ProductHead() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isDesktop, isBigDesktop, isExtraBigDesktop } = useSelector(
    (state) => state.responsive
  );
  const { currentPark, allProducts } = useSelector((state) => state.product);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const sortBtnRef = useRef(null);
  const filterBtnRef = useRef(null);

  const handleParkChange = (e) => {
    dispatch(setCurrentPark(e.target.value));
  };

  // Extract unique park names from all products
  const parkOptions = useMemo(() => {
    const uniqueParks = new Set();
    allProducts?.forEach((product) => {
      product?.parks?.forEach((park) => {
        uniqueParks.add(park.parkname_localized);
      });
    });
    return Array.from(uniqueParks);
  }, [allProducts]);

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
      className={language === "العربية" ? "ar-product-head" : "product-head"}
    >
      <Search />
      {(isDesktop || isBigDesktop || isExtraBigDesktop) && (
        <div className="product-head__right">
          <Selector
            label={t("productHead.sortBy")}
            value={t("productHead.priceHighToLow")}
            options={[t("productHead.priceHighToLow")]}
          />
          <Selector
            label={t("productHead.filterBy")}
            value={currentPark}
            options={parkOptions}
            placeHolder={t("productHead.selectPark")}
            onChange={handleParkChange}
          />
        </div>
      )}
    </div>
  );
}
