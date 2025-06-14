import React from "react";
import { Outlet } from "react-router";
import Footer from "./layouts/Footer/Footer";
import Home from "./pages/Home/Home";
import { useResponsive } from "./hooks/responsiveHook/useResponsive";
import Header from "./layouts/Header/Header";
import GlobalZoomEffect from "./components/GlobalZoomEffect";
import GlobalInvertColor from "./components/GlobalInvertColor";

export default function App() {
  useResponsive();

  return (
    <div>
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
