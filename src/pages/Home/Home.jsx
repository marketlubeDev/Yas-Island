import React from "react";
import LandingPage from "./LandingPage";

export default function Home({ children }) {
  return (
    <div className="home">
      {/* <LandingPage /> */}
      {children}
    </div>
  );
}
