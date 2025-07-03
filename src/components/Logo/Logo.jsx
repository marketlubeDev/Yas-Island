import React from "react";
import logo from "../../assets/logo/logo.png";
import desc from "../../assets/logo/desc.svg";
import LogoVertical from "../../assets/logo/LogoVertical.svg";
import invertLogoVertical from "../../assets/logo/invertlogo.svg";
import "./_logo.scss";
import { useSelector } from "react-redux";

export default function Logo({ type = "default" }) {
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  if (type === "default") {
    return (
      <div className="logo">
        <img
          src={isDarkMode ? invertLogoVertical : LogoVertical}
          alt="logo"
          className="logo-img"
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
        <img src={logo} alt="logo" className="logo-img" />
        {/* <img src={desc} alt="desc" className="logo-desc" /> */}
      </div>
    );
}
