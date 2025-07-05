import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../../components/Logo/Logo";
import ChatWithUsButton from "../../components/buttons/ChatWithUsButton";
import dash from "../../assets/icons/dash.svg";
import beach from "../../assets/icons/beach.svg";
import dropbox from "../../assets/icons/dropbox.svg";
import house from "../../assets/icons/house.svg";
import chef from "../../assets/icons/chef.svg";
import camera from "../../assets/icons/cam.svg";
import { useSelector } from "react-redux";
import { useLanguage } from "../../context/LanguageContext";

export default function SideBar() {
  const [activeItem, setActiveItem] = useState("topAttractions");
  const { t } = useTranslation();
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  const { language } = useLanguage();

  const handleClick = (item) => {
    if (item === "topAttractions") {
      setActiveItem(item);
    }
  };

  // Define the sidebar items with translation keys
  const sideBarItems = [
    { name: "all", icon: dash, translationKey: "sidebar.all" },
    {
      name: "topAttractions",
      icon: beach,
      translationKey: "sidebar.topAttractions",
    },
    { name: "packages", icon: dropbox, translationKey: "sidebar.packages" },
    { name: "hotels", icon: house, translationKey: "sidebar.hotels" },
    { name: "dining", icon: chef, translationKey: "sidebar.dining" },
    { name: "live", icon: camera, translationKey: "sidebar.live" },
    // { name: "shopping", icon: shop, translationKey: "sidebar.shopping" },
  ];

  return (
    <nav
      className={`side-bar  normal-title-txt ${
        language === "العربية" ? "side-bar-ar" : ""
      }`}
    >
      <Logo />
      <ul className="side-bar-list">
        {sideBarItems.map((item) => (
          <div
            key={item.name}
            className={
              language === "العربية"
                ? `ar-side-bar-list-item-container ${
                    activeItem === item.name ? "active" : ""
                  } ${item.name !== "topAttractions" ? "disabled" : ""}`
                : `side-bar-list-item-container ${
                    activeItem === item.name ? "active" : ""
                  } ${item.name !== "topAttractions" ? "disabled" : ""}`
            }
            onClick={() => handleClick(item.name)}
            style={{
              cursor: item.name === "topAttractions" ? "pointer" : "default",
              opacity: item.name === "topAttractions" ? 1 : 0.5,
            }}
          >
            <li
              className={
                language === "العربية"
                  ? `ar-side-bar-list-item ${
                      activeItem === item.name ? "activeItem" : ""
                    }`
                  : `side-bar-list-item ${
                      activeItem === item.name ? "activeItem" : ""
                    }`
              }
            >
              <div
                className={`item-icon ${
                  activeItem === item.name ? "active" : ""
                }`}
              >
                <img
                  src={item.icon}
                  alt={t(item.translationKey)}
                  className={`${activeItem === item.name ? "active" : ""} ${
                    isDarkMode ? "dark-mode" : ""
                  }`}
                />
              </div>
              <div
                className={`item-text ${
                  activeItem === item.name ? "active" : ""
                }`}
              >
                {t(item.translationKey)
                  .split(" ")
                  .map((word, index) => (
                    <div key={index}>{word}</div>
                  ))}
              </div>
            </li>
          </div>
        ))}
      </ul>
      <div className="side-bar-bottom">
        <ChatWithUsButton />
      </div>
    </nav>
  );
}
