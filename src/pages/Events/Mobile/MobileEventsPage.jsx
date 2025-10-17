import React, { useMemo } from "react";
import MobileTop from "../../Home/MobileComponents/MobileTop";
import MobileBottomNav from "../../Home/MobileComponents/MobilebottomNav";
import { events as dummyEvents } from "../../../data/dummyAll";
import AttractionsListMbl from "../../ProductPage/MobileProductPage/Components/AttractionsListMbl";

export default function MobileEventsPage() {
  const items = useMemo(
    () => [...dummyEvents].sort((a, b) => a.display_order - b.display_order),
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
