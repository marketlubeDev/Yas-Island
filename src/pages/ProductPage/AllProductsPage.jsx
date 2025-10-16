import React, { useMemo, useRef, useState, useEffect } from "react";
import SideBar from "../../layouts/SideBar/SideBar";
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
import ProductCard from "./Components/ProductCard";
import dummyAll from "../../data/dummyAll";

export default function AllProductsPage() {
  const [footerVisible, setFooterVisible] = useState(false);
  const containerRef = useRef(null);
  const sentinelRef = useRef(null);

  const allDummyProducts = useMemo(() => {
    const {
      packages = [],
      hotels = [],
      dining = [],
      events = [],
      shopping = [],
    } = dummyAll || {};
    return [...packages, ...hotels, ...dining, ...events, ...shopping];
  }, []);

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
    centerPane: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
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
          <ProductCard productList={allDummyProducts} />
          <div ref={sentinelRef} style={{ height: 1 }} />
        </div>
        <div style={styles.footerOverlay(footerVisible)}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
