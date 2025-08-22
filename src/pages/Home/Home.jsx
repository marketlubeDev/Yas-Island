import React from "react";
import LandingPage from "./LandingPage";
import Footer from "../../layouts/Footer/Footer";
import { useLocation } from "react-router-dom";
import MobileHeader from "./MobileComponents/MobileHeader";

export default function Home({ children }) {
  const location = useLocation();
  const shouldRenderGlobalFooter =
    location.pathname !== "/" && location.pathname !== "/upcoming";

  return (
    <div className="home" style={{ height: "100vh" }}>
      <MobileHeader />
      {/* <LandingPage /> */}
      {children}
      {shouldRenderGlobalFooter && <Footer />}
    </div>
  );
}
