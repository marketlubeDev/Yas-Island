import React from "react";
import { Outlet } from "react-router";
import Home from "./pages/Home/Home";
import { useResponsive } from "./hooks/responsiveHook/useResponsive";
import GlobalZoomEffect from "./components/GlobalZoomEffect";
import GlobalInvertColor from "./components/GlobalInvertColor";
import { useLanguage } from "./context/LanguageContext";
import { useI18nSync } from "./hooks/useI18nSync";
import QRCodeDetector from "./components/QRCodeDetector";

export default function App() {
  useResponsive();
  useI18nSync();
  const { isRTL } = useLanguage();

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <GlobalZoomEffect />
      <GlobalInvertColor />
      {/* QR Code Detection - handles QR code logic */}
      <QRCodeDetector />
      <Home>
        <Outlet />
      </Home>
    </div>
  );
}
