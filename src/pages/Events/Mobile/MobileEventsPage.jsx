import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MobileTop from "../../Home/MobileComponents/MobileTop";
import MobileBottomNav from "../../Home/MobileComponents/MobilebottomNav";

export default function MobileEventsPage() {
  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(null);
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

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
      const ro = new ResizeObserver(() => computeHeight());
      ro.observe(doc.documentElement);
      ro.observe(doc.body);
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

  const iframeSrc =
    currentLanguage === "ar"
      ? "/statics/Yas_Events.html"
      : "/statics/Yas_Events.html";

  return (
    <>
      <MobileTop className="mobile-topnav" />
      <div className="packages-page" style={{ padding: 0 }}>
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
        <MobileBottomNav />
      </div>
    </>
  );
}
