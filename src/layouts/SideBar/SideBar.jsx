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
import shop from "../../assets/icons/shop.svg";

export default function SideBar() {
  const [activeItem, setActiveItem] = useState("topAttractions");
  const { t } = useTranslation();

  const handleClick = (item) => {
    setActiveItem(item);
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
    <nav className="side-bar normal-title-txt">
      {/* <Logo /> */}
      <ul className="side-bar-list">
        {sideBarItems.map((item) => (
          <div
            key={item.name}
            className={`side-bar-list-item-container ${
              activeItem === item.name ? "active" : ""
            }`}
            onClick={() => handleClick(item.name)}
          >
            <li
              className={`side-bar-list-item ${
                activeItem === item.name ? "activeItem" : ""
              }`}
              onClick={() => handleClick(item.name)}
              style={{
                boxShadow:
                  activeItem === item.name
                    ? "0px 0px 7px var(--Number, 4px) #c3d7f5"
                    : "",
                border:
                  activeItem === item.name
                    ? "2px solid #80bfe4"
                    : "2px solid #e3daf2",
              }}
            >
              <div
                className="item-icon"
                style={{
                  background:
                    activeItem === item.name
                      ? "linear-gradient(135deg, #da3164 0%, #ae219f 50%, #547ee0 100%)"
                      : "",
                }}
              >
                <img
                  src={item.icon}
                  alt={t(item.translationKey)}
                  style={{
                    filter:
                      activeItem === item.name
                        ? "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(1) contrast(1)"
                        : "none",
                  }}
                />
              </div>
              <div
                className="item-text"
                style={{
                  color: activeItem === item.name ? "#2563C0" : "",
                }}
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
