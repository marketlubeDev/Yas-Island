import React, { useState, useMemo, useEffect, useRef } from "react";
import { useSelector, shallowEqual } from "react-redux";
import ProductCard from "./Components/ProductCard";
import SideBar from "../../layouts/SideBar/SideBar";
import AccessibilityModal from "./Components/AccessibilityModal";
import useGetProductList from "../../apiHooks/product/product";
import Loader from "../../components/Loading/Loader";
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";

export default function ProductPage() {
  const { productList, currentPark, currentSort, searchQuery } = useSelector(
    (s) => ({
      productList: s.product.allProducts,
      currentPark: s.product.currentPark,
      currentSort: s.product.currentSort,
      searchQuery: s.product.searchQuery,
    }),
    shallowEqual
  );

  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] =
    useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const { isLoading, isError } = useGetProductList();

  const containerRef = useRef(null);
  const sentinelRef = useRef(null);

  const getProductPrice = (p) => {
    const vs = p?.product_variants;
    if (!Array.isArray(vs) || vs.length === 0) return 0;
    const v = vs.find((x) => x?.isdefault) ?? vs[0];
    const n = Number(v?.gross);
    return Number.isFinite(n) ? n : 0;
  };

  const normalizeSort = (label) => {
    if (!label) return null;
    const l = String(label).toLowerCase().trim();
    if (l.includes("high") && l.includes("low"))
      return l.includes("high to low") ? "desc" : "asc";
    if (l.includes("الأعلى")) return "desc";
    if (l.includes("الأقل")) return "asc";
    return null;
  };

  const filteredProducts = useMemo(() => {
    const list = Array.isArray(productList) ? productList : [];
    const q = searchQuery ? String(searchQuery).toLowerCase().trim() : "";
    const sortDir = normalizeSort(currentSort);

    let out = list;

    if (q) {
      out = out.filter((p) => {
        if ((p?.product_title ?? "").toLowerCase().includes(q)) return true;
        if ((p?.productshortdesc ?? "").toLowerCase().includes(q)) return true;
        const parks = Array.isArray(p?.parks) ? p.parks : [];
        return parks.some((pk) =>
          (pk?.parkname_localized ?? "").toLowerCase().includes(q)
        );
      });
    }

    if (currentPark) {
      const name = String(currentPark);
      out = out.filter(
        (p) =>
          Array.isArray(p?.parks) &&
          p.parks.some((pk) => pk?.parkname_localized === name)
      );
    }

    if (sortDir) {
      out = [...out].sort((a, b) => {
        const pa = getProductPrice(a);
        const pb = getProductPrice(b);
        return sortDir === "desc" ? pb - pa : pa - pb;
      });
    }

    return out;
  }, [productList, currentPark, currentSort, searchQuery]);

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
  }, [isLoading, filteredProducts.length]);

  if (isError) return <div>Error loading products...</div>;

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
      // transition: "transform 160ms ease, opacity 160ms ease",
      willChange: "transform, opacity",
    }),
  };

  return (
    <div className="product">
      <SideBar />
      <div className="product-content" style={styles.productContent}>
        <Header />

        {isLoading ? (
          <div style={styles.centerPane}>
            <Loader />
          </div>
        ) : (
          <>
            <div
              className="product-scroll"
              ref={containerRef}
              style={styles.scroll}
            >
              <ProductCard productList={filteredProducts} />
              <div ref={sentinelRef} style={{ height: 1 }} />
            </div>
            <div style={styles.footerOverlay(footerVisible)}>
              <Footer />
            </div>
          </>
        )}

        <AccessibilityModal
          isOpen={isAccessibilityModalOpen}
          onClose={() => setIsAccessibilityModalOpen(false)}
        />
      </div>
    </div>
  );
}
