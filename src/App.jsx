import React from "react";
import { Outlet } from "react-router";
import Footer from "./layouts/Footer/Footer";
import Home from "./pages/Home/Home";
import { useResponsive } from "./hooks/responsiveHook/useResponsive";
import Header from "./layouts/Header/Header";

export default function App() {
  useResponsive();

  return (
    <div>
      <Header />
      <Home>
        <Outlet />
      </Home>
      {/* <Footer /> */}
    </div>
  );
}
