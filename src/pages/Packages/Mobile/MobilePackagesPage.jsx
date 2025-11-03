import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MobileTop from "../../Home/MobileComponents/MobileTop";
import MobileBottomNav from "../../Home/MobileComponents/MobilebottomNav";
import UpcomingPages from "../../Upcoming/Desktop/UpcomingPages";
import ErrorDisplay from "../../../components/ErrorDisplay/ErrorDisplay";

export default function PackagesMobilePage() {
  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(null);
  const [iframeError, setIframeError] = useState(null);
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
  };

  const retryIframeLoad = () => {
    setIframeError(null);
    setIframeHeight(null);
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
  }, [currentLanguage]);

  const iframeSrc =
    currentLanguage === "ar"
      ? "/statics/Yas_Packages_ar.html"
      : "/statics/Yas_Packages_en.html";

  return (
    <>
      <MobileTop className="mobile-topnav" />
      <div className="packages-page" style={{ padding: 0 }}>
        {iframeError ? (
          <ErrorDisplay
            title={"Unable to load packages"}
            message={
              "We couldn't load the packages content. Please try again or check your connection."
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
            style={{
              border: 0,
              width: "100%",
              height: iframeHeight ? `${iframeHeight}px` : "auto",
              display: "block",
            }}
          />
        )}
        {!iframeError && <MobileBottomNav />}
      </div>
    </>
  );
}
