import React, { useState } from "react";
import logo from "../../assets/logo/logo.png";
import desc from "../../assets/logo/desc.svg";
import LogoVertical from "../../assets/logo/LogoVertical.svg";
import invertLogoVertical from "../../assets/logo/invertlogo.svg";
import "./_logo.scss";
import { useSelector } from "react-redux";

export default function Logo({ type = "default" }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  if (type === "default") {
    return (
      <div className="logo">
        {!isLoaded && <div className="logo-skeleton" aria-hidden="true"></div>}
        <img
          src={isDarkMode ? invertLogoVertical : LogoVertical}
          alt="logo"
          className="logo-img"
          loading="eager"
          decoding="async"
          fetchpriority="high"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    );
  } else if (type === "horizontal")
    return (
      <div
        className="logo"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!isLoaded && <div className="logo-skeleton" aria-hidden="true"></div>}
        <img
          src={logo}
          alt="logo"
          className="logo-img"
          loading="eager"
          decoding="async"
          fetchpriority="high"
          onLoad={() => setIsLoaded(true)}
        />
        {/* <img src={desc} alt="desc" className="logo-desc" /> */}
      </div>
    );
}
