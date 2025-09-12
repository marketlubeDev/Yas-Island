import React from "react";
import { useTranslation } from "react-i18next";
// import "./_search.scss";
import CommonIcons from "../../../assets/icons/CommonIcons.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setSearchQuery } from "../../../global/productSlice";

export default function Search() {
  const { t } = useTranslation();
  const fontSize = ".8rem";
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  const searchQuery = useSelector((state) => state.product.searchQuery);
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="search base-filter" style={{ fontSize }}>
      <div style={{ marginRight: "10px" }}>
        <CommonIcons
          type="search"
          width="22px"
          height="22px"
          color={isDarkMode ? "#FFAD33" : "#231942"}
        />
      </div>
      <input
        type="text"
        placeholder={t("common.searchPlaceholder")}
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ fontSize: "18px", fontStyle: "normal", fontWeight: "400" }}
      />
    </div>
  );
}
