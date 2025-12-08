import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MobileTop from "../../Home/MobileComponents/MobileTop";
import MobileBottomNav from "../../Home/MobileComponents/MobilebottomNav";
import UpcomingPages from "../../Upcoming/Desktop/UpcomingPages";
import ErrorDisplay from "../../../components/ErrorDisplay/ErrorDisplay";
import Loader from "../../../components/Loading/Loader";

export default function MobileHotelsPage() {
  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(null);
  const [iframeError, setIframeError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadToken, setReloadToken] = useState(0);
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

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

      const ro = new ResizeObserver(() => computeHeight());
      ro.observe(doc.documentElement);
      ro.observe(doc.body);
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

  const iframeSrc =
    currentLanguage === "ar"
      ? "/statics/Yas_Hotels_ar.html"
      : "/statics/Yas_Hotels_en.html";

  return (
    <>
      <MobileTop className="mobile-topnav" />
      <div className="packages-page" style={{ padding: 0 }}>
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
            <div style={{ transform: "scale(0.6)" }}>
              <Loader />
            </div>
          </div>
        )}
        {iframeError ? (
          <ErrorDisplay
            title={"Unable to load hotels"}
            message={
              "We couldn't load the hotels content. Please try again or check your connection."
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
              height: iframeHeight ? `${iframeHeight}px` : "calc(100vh - 8rem)",
              minHeight: "calc(100vh - 8rem)",
              display: isLoading ? "none" : "block",
              overflow: "hidden",
            }}
          />
        )}
        {!iframeError && <MobileBottomNav />}
      </div>
    </>
  );
}
