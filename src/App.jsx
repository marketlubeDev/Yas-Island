import React from "react";
import { Outlet } from "react-router";
import Footer from "./layouts/Footer/Footer";
import Home from "./pages/Home/Home";
import { useResponsive } from "./hooks/responsiveHook/useResponsive";
import Header from "./layouts/Header/Header";
import GlobalZoomEffect from "./components/GlobalZoomEffect";

export default function App() {
  useResponsive();

  return (
    <div>
      <GlobalZoomEffect />
      <Header />
      <Home>
        <Outlet />
      </Home>
      {/* <Footer /> */}
    </div>
  );
}
