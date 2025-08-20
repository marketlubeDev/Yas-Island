import React from "react";
import LandingPage from "./LandingPage";
import Footer from "../../layouts/Footer/Footer";
import { useLocation } from "react-router-dom";

export default function Home({ children }) {
  const location = useLocation();
  const shouldRenderGlobalFooter = location.pathname !== "/";

  return (
    <div className="home">
      {/* <LandingPage /> */}
      {children}
      {shouldRenderGlobalFooter && <Footer />}
    </div>
  );
}
