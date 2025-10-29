import React, { useMemo, useRef, useState, useEffect } from "react";
import MobileBottomNav from "../../Home/MobileComponents/MobilebottomNav";
import MobileTop from "../../Home/MobileComponents/MobileTop";
import AttractionsListMbl from "./Components/AttractionsListMbl";
import {
  packages,
  hotels,
  dining,
  events,
  shopping,
} from "../../../data/dummyAll";

export default function MobileAllProductsPage() {
  const [showBottomNav, setShowBottomNav] = useState(true);
  const scrollPositionRef = useRef(0);
  const scrollContainerRef = useRef(null);

  const allDummyProducts = useMemo(() => {
    const list = [
      ...(packages || []),
      ...(hotels || []),
      ...(dining || []),
      ...(events || []),
      ...(shopping || []),
    ];
    return list
      .filter(Boolean)
      .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;
      const currentScrollTop = container.scrollTop;
      const scrollDifference = currentScrollTop - scrollPositionRef.current;
      const threshold = 5;
      if (Math.abs(scrollDifference) > threshold) {
        if (scrollDifference < 0) {
          setShowBottomNav(true);
        } else if (scrollDifference > 0) {
          setShowBottomNav(false);
        }
        scrollPositionRef.current = currentScrollTop;
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="mobile-product-page">
      <MobileTop className="mobile-topnav" />
      <div className="mobile-content" ref={scrollContainerRef}>
        <AttractionsListMbl productList={allDummyProducts} isLoading={false} />
      </div>
      <MobileBottomNav isVisible={showBottomNav} />
    </div>
  );
}
