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
  const shouldRenderGlobalFooter =
    location.pathname !== "/" &&
    location.pathname !== "/upcoming" &&
    location.pathname !== "/packages" &&
    location.pathname !== "/hotels" &&
    location.pathname !== "/dining" &&
    location.pathname !== "/live" &&
    location.pathname !== "/shopping" &&
    !isMobile;

  return (
    <div className="home" style={{ minHeight: isMobile ? "100vh" : "auto" }}>
      <MobileHeader />
      {/* <LandingPage /> */}
      {children}
      {shouldRenderGlobalFooter && <Footer />}
    </div>
  );
}
