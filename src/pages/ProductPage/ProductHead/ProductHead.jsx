import React from "react";
import Search from "../../../components/Common/Search/Search";
import { useSelector } from "react-redux";
import Selector from "../../../components/Common/Selectors/Selector";

export default function ProductHead() {
  const { isDesktop, isBigDesktop } = useSelector((state) => state.responsive);

  return (
    <div className="product-head">
      <Search />
      {isDesktop ||
        (isBigDesktop && (
          <div className="product-head__right">
            <Selector
              label="Sort by"
              value="price (high to low)"
              options={["price (high to low)"]}
            />
            <Selector
              label="Filter by"
              value="attractions"
              options={["attractions"]}
            />
          </div>
        ))}
    </div>
  );
}
