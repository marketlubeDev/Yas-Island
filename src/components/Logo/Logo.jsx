import React from "react";
import logo from "../../assets/logo/logo.png";
import desc from "../../assets/logo/desc.svg";
import "./_logo.scss";

export default function Logo({ type = "default" }) {
  if (type === "default") {
    return (
      <div className="logo">
        <img src={logo} alt="logo" className="logo-img" />
        <img src={desc} alt="desc" className="logo-desc" />
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
        <img src={desc} alt="desc" className="logo-desc" />
      </div>
    );
}
