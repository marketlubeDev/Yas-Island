import React from "react";
import { useTranslation } from "react-i18next";
import Search from "../../../components/Common/Search/Search";
import { useSelector } from "react-redux";
import Selector from "../../../components/Common/Selectors/Selector";

export default function ProductHead() {
  const { t } = useTranslation();
  const { isDesktop, isBigDesktop, isExtraBigDesktop } = useSelector(
    (state) => state.responsive
  );

  console.log(isDesktop, isBigDesktop, isExtraBigDesktop, "saldhslajhdlash");

  return (
    <div className="product-head">
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
            value={t("productHead.attractions")}
            options={[t("productHead.attractions")]}
          />
        </div>
      )}
    </div>
  );
}
