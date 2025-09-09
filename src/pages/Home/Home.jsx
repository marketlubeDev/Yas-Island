import React from "react";
import LandingPage from "./LandingPage";
import Footer from "../../layouts/Footer/Footer";
import { useLocation } from "react-router-dom";
import MobileHeader from "./MobileComponents/MobileHeader";
import { useResponsive } from "../../hooks/responsiveHook/useResponsive";

export default function Home({ children }) {
  const location = useLocation();
  const { isSmallPhone, isPhone, isTablets, isBigTablets } = useResponsive();
  const isMobile = isSmallPhone || isPhone || isTablets || isBigTablets;

  // Routes that render a left sidebar/grid layout
  const hasSidebarRoutes = [
    "/",
    "/all",
    "/upcoming",
    "/packages",
    "/hotels",
    "/dining",
    "/live",
    "/shopping",
  ];

  const segments = location.pathname.split("/").filter(Boolean);
  const isSingleSegment = segments.length === 1;
  const singleSegmentNonSidebar = new Set([
    "email-verification",
    "otp-confirmation",
    "payment-details",
    "card-payment",
    "payment-success",
    "payment-response",
  ]);

  const hasSidebar =
    hasSidebarRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/product") ||
    (isSingleSegment && !singleSegmentNonSidebar.has(segments[0]));

  const shouldRenderGlobalFooter = !hasSidebar && !isMobile;

  return (
    <div className="home" style={{ minHeight: isMobile ? "100vh" : "auto" }}>
      <MobileHeader />
      {/* <LandingPage /> */}
      {children}
      {shouldRenderGlobalFooter && <Footer />}
    </div>
  );
}
