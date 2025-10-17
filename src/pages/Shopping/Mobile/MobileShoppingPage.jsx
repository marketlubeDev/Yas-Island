import React, { useMemo } from "react";
import MobileTop from "../../Home/MobileComponents/MobileTop";
import MobileBottomNav from "../../Home/MobileComponents/MobilebottomNav";
import { shopping as dummyShopping } from "../../../data/dummyAll";
import AttractionsListMbl from "../../ProductPage/MobileProductPage/Components/AttractionsListMbl";

export default function MobileShoppingPage() {
  const items = useMemo(
    () => [...dummyShopping].sort((a, b) => a.display_order - b.display_order),
    []
  );

  return (
    <>
      <MobileTop className="mobile-topnav" />
      <div className="packages-page">
        <AttractionsListMbl productList={items} isLoading={false} />
        <MobileBottomNav />
      </div>
    </>
  );
}
