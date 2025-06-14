import React from "react";
import { Outlet } from "react-router";
import Footer from "./layouts/Footer/Footer";
import Home from "./pages/Home/Home";
import { useResponsive } from "./hooks/responsiveHook/useResponsive";
import Header from "./layouts/Header/Header";
import GlobalZoomEffect from "./components/GlobalZoomEffect";
import GlobalInvertColor from "./components/GlobalInvertColor";
import { useLanguage } from "./context/LanguageContext";

export default function App() {
  useResponsive();
  const { isRTL } = useLanguage();

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <GlobalZoomEffect />
      <GlobalInvertColor />
      <Header />
      <Home>
        <Outlet />
      </Home>
      {/* <Footer /> */}
    </div>
  );
}
