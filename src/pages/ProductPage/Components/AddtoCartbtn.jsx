import React from "react";
import { useTranslation } from "react-i18next";

export default function AddtoCartbtn({ onClick }) {
  const { t } = useTranslation();

  return (
    <div className="AddtoCartbtn">
      <button className="AddtoCartbtn__button" onClick={onClick}>
        {t("common.addToCart")}
      </button>
    </div>
  );
}
