import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Footer from "../../../layouts/Footer/Footer";
import SideBar from "../../../layouts/SideBar/SideBar";
import Header from "../../../layouts/Header/Header";
const UpcomingPages = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    // <div className="product">
    //   {/* <SideBar /> */}
    //   <div className="product-content">
    //     {/* <Header /> */}
    //     <div className="upcoming-page ">
    //       <div className="upcoming-container">
    //         {/* <div className="upcoming-illustration">
    //         <div className="magnifying-glass">
    //             <div className="lens"></div>
    //             <div className="handle"></div>
    //         </div>
    //         <div className="document">
    //             <div className="document-lines">
    //             <div className="line"></div>
    //             <div className="line"></div>
    //             <div className="line"></div>
    //             <div className="line"></div>
    //             </div>
    //         </div>
    //         <div className="base-line"></div>
    //         </div> */}

    //         <div className="upcoming-content">
    //           <h1 className="upcoming-title">{t("upcoming.title")}</h1>
    //           <p className="upcoming-subtitle">
    //             {t("upcoming.subtitle")}
    //             <span
    //               className="highlight"
    //               onClick={() => navigate("/")}
    //               style={{ cursor: "pointer" }}
    //             >
    //               {" "}
    //               {t("upcoming.topAttractions")}{" "}
    //             </span>
    //             {t("upcoming.subtitleEnd")}
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //     {/* <Footer /> */}
    //   </div>
    // </div>

    <div className="upcoming-page">
      <div className="upcoming-container">
        <div className="upcoming-content">
          <h1 className="upcoming-title">{t("upcoming.title")}</h1>
          <p className="upcoming-subtitle">
            {t("upcoming.subtitle")}
            <span
              className="highlight"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              {" "}
              {t("upcoming.topAttractions")}{" "}
            </span>
            {t("upcoming.subtitleEnd")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpcomingPages;
