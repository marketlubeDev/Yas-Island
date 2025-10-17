import React, { useMemo, useRef, useState, useEffect } from "react";
import SideBar from "../../../layouts/SideBar/SideBar";
import Header from "../../../layouts/Header/Header";
import Footer from "../../../layouts/Footer/Footer";
import { packages as dummyPackages } from "../../../data/dummyAll";
import ProductCard from "../../ProductPage/Components/ProductCard";

const getPrice = (pkg) => {
  const variants = Array.isArray(pkg?.product_variants)
    ? pkg.product_variants
    : [];
  if (variants.length === 0) return 0;
  const def = variants.find((v) => v?.isdefault) ?? variants[0];
  const n = Number(def?.gross);
  return Number.isFinite(n) ? n : 0;
};

export default function PackagesPage() {
  const [footerVisible, setFooterVisible] = useState(false);
  const containerRef = useRef(null);
  const sentinelRef = useRef(null);

  const items = useMemo(
    () => [...dummyPackages].sort((a, b) => a.display_order - b.display_order),
    []
  );

  useEffect(() => {
    const root = containerRef.current;
    const target = sentinelRef.current;
    if (!root || !target) return;
    const obs = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { root, threshold: 0.99 }
    );
    obs.observe(target);
    return () => obs.disconnect();
  }, []);

  const styles = {
    productContent: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      minHeight: "100%",
    },
    scroll: {
      position: "relative",
      overflow: "auto",
      flex: 1,
      WebkitOverflowScrolling: "touch",
    },
    footerOverlay: (visible) => ({
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      transform: visible ? "translateY(0%)" : "translateY(100%)",
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? "auto" : "none",
      willChange: "transform, opacity",
    }),
  };

  return (
    <div className="product">
      <SideBar />
      <div className="product-content" style={styles.productContent}>
        <Header />
        <div
          className="product-scroll"
          ref={containerRef}
          style={styles.scroll}
        >
          <div className="packages-page">
            <ProductCard productList={items} />
            <div ref={sentinelRef} style={{ height: 1 }} />
          </div>
        </div>
        <div style={styles.footerOverlay(footerVisible)}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
