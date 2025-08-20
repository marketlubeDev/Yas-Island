import React from "react";
import MobileNavigationTabs from "./MobileNavigationTabs";
import MobileSearchSection from "./MobileSearchSection";

function MobileTop({ className }) {
  return (
    <div className={className} id="mobile-topnav-fixed">
      <MobileNavigationTabs />
      <MobileSearchSection />
    </div>
  );
}

export default MobileTop;
