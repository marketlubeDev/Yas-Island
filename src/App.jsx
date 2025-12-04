import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";
import Home from "./pages/Home/Home";
import { useResponsive } from "./hooks/responsiveHook/useResponsive";
import GlobalZoomEffect from "./components/GlobalZoomEffect";
import GlobalInvertColor from "./components/GlobalInvertColor";
import GlobalThemeClass from "./components/GlobalThemeClass";
import { useLanguage } from "./context/LanguageContext";
import { useI18nSync } from "./hooks/useI18nSync";
import { useDynamicTitle } from "./hooks/useDynamicTitle";
import QRCodeDetector from "./components/QRCodeDetector";
import { cleanExpiredItems } from "./global/cartSlice";
import YasChat from "./layouts/YasChat/YasChat";
import QrLocation from "./components/QrLocation";
import TranslationSkeleton from "./components/TranslationSkeleton/TranslationSkeleton";

export default function App() {
  const dispatch = useDispatch();
  const { isRTL, isLoadingTranslations } = useLanguage();

  // Call all hooks (React requires hooks to be called in the same order)
  useResponsive();
  useI18nSync();
  useDynamicTitle();

  // Clean expired cart items when app loads
  useEffect(() => {
    dispatch(cleanExpiredItems());
  }, [dispatch]);

  // Show skeleton loader while translations are loading
  // This prevents any content from rendering with English fallback text
  if (isLoadingTranslations) {
    return <TranslationSkeleton />;
  }

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <GlobalThemeClass />
      <GlobalZoomEffect />
      <GlobalInvertColor />
      <YasChat />
      {/* QR Code Detection - handles QR code logic */}
      <QRCodeDetector />
      <QrLocation />
      <Home>
        <Outlet />
      </Home>
    </div>
  );
}
