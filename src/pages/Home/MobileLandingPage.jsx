import React from "react";

import topStroke from "../../assets/images/top-stroke.png";
import bottomStroke from "../../assets/images/bottom-stroke.png";
import logo from "../../assets/images/moblogo.svg";

export default function MobileLanding() {
  return (
    <div className="mobile-landing">
      <img
        src={topStroke}
        alt="Top stroke"
        className="top-stroke animate-slide-down"
      />
      <div className="center-logo">
        <img
          src={logo}
          alt="Yas Island Logo"
          className="animate-pulse-gentle"
        />
      </div>
      <img
        src={bottomStroke}
        alt="Bottom stroke"
        className="bottom-stroke animate-slide-up"
      />
    </div>
  );
}
