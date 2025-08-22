import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Footer from "../../layouts/Footer/Footer";
import SideBar from "../../layouts/SideBar/SideBar";
import Header from "../../layouts/Header/Header";
const UpcomingPages = () => {
  const { t } = useTranslation();

  return (
    <div className="product">
      <SideBar />
      <div className="product-content">
        <Header />
        <div className="upcoming-page ">
          <div className="upcoming-container">
            {/* <div className="upcoming-illustration">
            <div className="magnifying-glass">
                <div className="lens"></div>
                <div className="handle"></div>
            </div>
            <div className="document">
                <div className="document-lines">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                </div>
            </div>
            <div className="base-line"></div>
            </div> */}

            <div className="upcoming-content">
              <h1 className="upcoming-title">
                {t("upcoming.title", "We'll be adding products soon")}
              </h1>
              <p className="upcoming-subtitle">
                {t("upcoming.subtitle", "Check out our")}
                <span className="highlight">
                  {" "}
                  {t("upcoming.topAttractions", "Top Attractions")}{" "}
                </span>
                {t(
                  "upcoming.subtitleEnd",
                  "for adventures available right now."
                )}
              </p>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
};

export default UpcomingPages;
