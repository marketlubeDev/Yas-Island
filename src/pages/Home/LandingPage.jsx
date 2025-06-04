import React from "react";
import { useNavigate } from "react-router-dom";

import landingImage from "../../assets/images/MainImg.png";
import YellowBtn from "../../components/buttons/YellowBtn";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleLanguageSelect = () => {
    navigate("/product");
  };

  return (
    <div
      className="landing-page"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${landingImage})`,
      }}
    >
      <div className="landing-page-body">
        <div className="landing-page-body__title">
          <h1 className="landing-page__title">YAS ISLAND</h1>
          <h1 className="landing-page__title">ABU DHABI</h1>
          <div className="landing-page__subtitle">And Let Me Tell You</div>
        </div>

        <div className="landing-page__bottom">
          <div className="landing-page__subtitle">Choose Your Language</div>
          <YellowBtn onClick={handleLanguageSelect}>Arabic</YellowBtn>
          <YellowBtn onClick={handleLanguageSelect}>English</YellowBtn>
        </div>
      </div>
    </div>
  );
}
