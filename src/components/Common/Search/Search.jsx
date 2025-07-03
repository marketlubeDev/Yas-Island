import React from "react";
import { useTranslation } from "react-i18next";
// import "./_search.scss";
import CommonIcons from "../../../assets/icons/lens.svg";
import invertLens from "../../../assets/icons/invertLens.svg";
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
      <img
        src={isDarkMode ? invertLens : CommonIcons}
        alt="search"
        width="22px"
        height="22px"
        style={{
          marginRight: "10px",
        }}
      />
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
