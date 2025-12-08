import React, { useMemo, useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SideBar from "../../../layouts/SideBar/SideBar";
import Header from "../../../layouts/Header/Header";
import Footer from "../../../layouts/Footer/Footer";
import { hotels as dummyHotels } from "../../../data/dummyAll";
import UpcomingPages from "../../Upcoming/Desktop/UpcomingPages";
import ErrorDisplay from "../../../components/ErrorDisplay/ErrorDisplay";
import Loader from "../../../components/Loading/Loader";

export default function EventsPage() {
  const [footerVisible, setFooterVisible] = useState(false);
  const containerRef = useRef(null);
  const sentinelRef = useRef(null);
  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(null);
  const [iframeError, setIframeError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadToken, setReloadToken] = useState(0);
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
      setIframeError(null);
      setIsLoading(false);
      const doc = iframe.contentWindow?.document;
      const win = iframe.contentWindow;
      if (!doc || !win) return;

      // Disable scrolling on iframe's document
      if (doc.body) {
        doc.body.style.overflow = "hidden";
      }
      if (doc.documentElement) {
        doc.documentElement.style.overflow = "hidden";
      }

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
        if (newHeight > 0) {
          setIframeHeight(newHeight);
        }
      };

      // Wait for all images to load before calculating height
      const waitForImages = () => {
        const images = doc.querySelectorAll("img");
        if (images.length === 0) {
          computeHeight();
          return;
        }

        let loadedCount = 0;
        const totalImages = images.length;

        const checkComplete = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            // Small delay to ensure layout is complete
            setTimeout(computeHeight, 100);
          }
        };

        images.forEach((img) => {
          if (img.complete) {
            checkComplete();
          } else {
            img.addEventListener("load", checkComplete, { once: true });
            img.addEventListener("error", checkComplete, { once: true });
          }
        });
      };

      // Use window load event if available, otherwise wait a bit
      if (win.document.readyState === "complete") {
        waitForImages();
      } else {
        win.addEventListener("load", waitForImages, { once: true });
        // Fallback: compute after a short delay
        setTimeout(() => {
          if (!iframeHeight) {
            waitForImages();
          }
        }, 500);
      }

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

  const handleIframeError = () => {
    setIframeError("Unable to load content. Please try again.");
    setIsLoading(false);
  };

  const retryIframeLoad = () => {
    setIframeError(null);
    setIframeHeight(null);
    setIsLoading(true);
    setReloadToken((t) => t + 1);
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
    setIsLoading(true);
  }, [currentLanguage]);

  // Reset loading when reloadToken changes
  useEffect(() => {
    setIsLoading(true);
  }, [reloadToken]);

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
      ? "/statics/Yas_Events_ar.html"
      : "/statics/Yas_Events_en.html";

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
            {isLoading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "calc(100vh - 8rem)",
                  width: "100%",
                }}
              >
                <Loader />
              </div>
            )}
            {iframeError ? (
              <ErrorDisplay
                title={"Unable to load events"}
                message={
                  "We couldn't load the events content. Please try again or check your connection."
                }
                onRetry={retryIframeLoad}
                showRetryButton
              />
            ) : (
              <iframe
                title="Static Content"
                src={`${iframeSrc}?v=${reloadToken}`}
                ref={iframeRef}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                scrolling="no"
                style={{
                  border: 0,
                  width: "100%",
                  height: iframeHeight
                    ? `${iframeHeight}px`
                    : "calc(100vh - 8rem)",
                  minHeight: "calc(100vh - 8rem)",
                  display: isLoading ? "none" : "block",
                  overflow: "hidden",
                }}
              />
            )}
          </div>
        </div>
        {!iframeError && (
          <div style={styles.footerOverlay(footerVisible)}>
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
}
