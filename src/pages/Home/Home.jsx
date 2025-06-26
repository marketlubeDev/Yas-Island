import React from "react";
import LandingPage from "./LandingPage";

export default function Home({ children }) {
  return (
    <div className="home" style={{ height: "70vh" }}>
      {/* <LandingPage /> */}
      {children}
    </div>
  );
}
