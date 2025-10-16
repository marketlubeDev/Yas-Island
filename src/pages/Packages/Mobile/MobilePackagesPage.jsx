import React, { useMemo } from "react";
import MobileTop from "../../Home/MobileComponents/MobileTop";
import MobileBottomNav from "../../Home/MobileComponents/MobilebottomNav";
import dummyPackages from "../../../data/packages";
import AttractionsListMbl from "../../ProductPage/MobileProductPage/Components/AttractionsListMbl";

// Packages are shaped like products with `product_variants`, so we can
// reuse the same mobile attractions card list used on the product page.

export default function MobilePackagesPage() {
  const items = useMemo(
    () => [...dummyPackages].sort((a, b) => a.display_order - b.display_order),
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
