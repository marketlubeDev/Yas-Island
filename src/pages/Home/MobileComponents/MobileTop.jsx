import React from "react";
import { useLocation } from "react-router-dom";
import MobileNavigationTabs from "./MobileNavigationTabs";
import MobileSearchSection from "./MobileSearchSection";

function MobileTop({ className }) {
  const location = useLocation();

  // Routes where search section should be hidden
  const hideSearchRoutes = ["/packages", "/hotels", "/dining", "/events"];
  const shouldHideSearch = hideSearchRoutes.includes(location.pathname);

  return (
    <div className={className} id="mobile-topnav-fixed">
      <MobileNavigationTabs />
      {!shouldHideSearch && <MobileSearchSection />}
    </div>
  );
}

export default MobileTop;
