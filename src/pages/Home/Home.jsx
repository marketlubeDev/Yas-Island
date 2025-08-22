import React, { useEffect, useState } from "react";
import LandingPage from "./LandingPage";
import Footer from "../../layouts/Footer/Footer";
import { useLocation } from "react-router-dom";
import MobileHeader from "./MobileComponents/MobileHeader";
import Header from "../../layouts/Header/Header";
import SideBar from "../../layouts/SideBar/SideBar";
import { useResponsive } from "../../hooks/responsiveHook/useResponsive";

export default function Home({ children }) {
  const location = useLocation();
  const shouldRenderGlobalFooter =
    location.pathname !== "/" && location.pathname !== "/upcoming";
  const { isSmallPhone, isPhone, isTablets } = useResponsive();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(isSmallPhone || isPhone || isTablets);
  }, [isSmallPhone, isPhone, isTablets]);

  return (
    <div className="home" style={{ height: "100vh" }}>
      {isMobile && <MobileHeader />}

      <div className={` ${isMobile ? "" : "product"}`}>
        {!isMobile && <SideBar />}
        <div className="product-content">
          {!isMobile && <Header />}
          {/* <LandingPage /> */}
          {children}
        </div>
      </div>
      {shouldRenderGlobalFooter && <Footer />}
    </div>
  );
}
