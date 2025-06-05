import React from "react";
import { useTranslation } from "react-i18next";
import "./_search.scss";
import CommonIcons from "../../../assets/icons/lens.svg";

export default function Search() {
  const { t } = useTranslation();
  const fontSize = ".8rem";

  return (
    <div className="search base-filter" style={{ fontSize }}>
      <img
        src={CommonIcons}
        alt="search"
        width="22px"
        height="22px"
        style={{
          marginRight: "10px",
        }}
      />
      <input type="text" placeholder={t("common.searchPlaceholder")} />
    </div>
  );
}
