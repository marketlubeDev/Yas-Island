import React, { useMemo, useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SideBar from "../../../layouts/SideBar/SideBar";
import Header from "../../../layouts/Header/Header";
import Footer from "../../../layouts/Footer/Footer";
import { hotels as dummyHotels } from "../../../data/dummyAll";

export default function HotelsPage() {
  const [footerVisible, setFooterVisible] = useState(false);
  const containerRef = useRef(null);
  const sentinelRef = useRef(null);
  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(null);
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

  const items = useMemo(
    () => [...dummyHotels].sort((a, b) => a.display_order - b.display_order),
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

  // Adjust iframe height to fit its content
  const handleIframeLoad = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    try {
      const doc = iframe.contentWindow?.document;
      if (!doc) return;
      const computeHeight = () => {
        const body = doc.body;
        const html = doc.documentElement;
        const newHeight = Math.max(
          body?.scrollHeight || 0,
          body?.offsetHeight || 0,
          html?.clientHeight || 0,
          html?.scrollHeight || 0,
          html?.offsetHeight || 0
        );
        setIframeHeight(newHeight);
      };
      computeHeight();
      // Watch for dynamic changes within the iframe
      const ro = new ResizeObserver(() => computeHeight());
      ro.observe(doc.documentElement);
      ro.observe(doc.body);
      // Cleanup when iframe reloads/unmounts
      iframe._yasResizeObserver = ro;
    } catch (e) {
      // Cross-origin safety: if access fails, skip dynamic sizing
    }
  };

  useEffect(() => {
    return () => {
      const ro = iframeRef.current?._yasResizeObserver;
      if (ro) ro.disconnect();
    };
  }, []);

  // Reset height when language changes so it recalculates after new content loads
  useEffect(() => {
    setIframeHeight(null);
  }, [currentLanguage]);

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

  const iframeSrc =
    currentLanguage === "ar"
      ? "/statics/Yas_Hotels.html"
      : "/statics/Yas_Hotels.html";

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
          <div
            className="packages-page"
            style={{ backgroundColor: "transparent", padding: 0 }}
          >
            <iframe
              title="Static Content"
              src={iframeSrc}
              ref={iframeRef}
              onLoad={handleIframeLoad}
              style={{
                border: 0,
                width: "100%",
                height: iframeHeight ? `${iframeHeight}px` : "auto",
                display: "block",
              }}
            />
          </div>
        </div>
        <div style={styles.footerOverlay(footerVisible)}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
