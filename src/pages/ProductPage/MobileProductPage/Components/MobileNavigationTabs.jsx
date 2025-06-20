import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import allIcon from "../../../../assets/icons/dash.svg";
import allIconInverter from "../../../../assets/icons/inverteddash.svg";
import attractionsIcon from "../../../../assets/icons/beach.svg";
import attractionsIconInverter from "../../../../assets/icons/invertedbeach.svg";
import attractionsIconHighContrast from "../../../../assets/icons/highbeach.svg";
import packagesIcon from "../../../../assets/icons/dropbox.svg";
import packagesIconInverter from "../../../../assets/icons/inverteddropbox.svg";
import hotelsIcon from "../../../../assets/icons/house.svg";
import hotelsIconInverter from "../../../../assets/icons/invertedhouse.svg";
import diningIcon from "../../../../assets/icons/chef.svg";
import diningIconInverter from "../../../../assets/icons/invertedchef.svg";

function MobileNavigationTabs() {
  const { t } = useTranslation();
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  const isHighContrast = useSelector(
    (state) => state.accessibility.isHighContrast
  );
  const allIconSrc = isDarkMode ? allIconInverter : allIcon;
  const attractionsIconSrc = isDarkMode
    ? attractionsIconInverter
    : attractionsIcon;
  const attractionsIconSrcActive =
    isHighContrast || (!isDarkMode && !isHighContrast)
      ? attractionsIconHighContrast
      : attractionsIconInverter;
  const packagesIconSrc = isDarkMode ? packagesIconInverter : packagesIcon;
  const hotelsIconSrc = isDarkMode ? hotelsIconInverter : hotelsIcon;
  const diningIconSrc = isDarkMode ? diningIconInverter : diningIcon;
  const navigationItems = [
    {
      key: "all",
      icon: allIconSrc,
      label: t("sidebar.all"),
      alt: t("sidebar.all"),
      isActive: false,
    },
    {
      key: "attractions",
      icon: attractionsIconSrc,
      label: t("sidebar.attractions"),
      alt: t("sidebar.attractions"),
      isActive: true,
    },
    {
      key: "packages",
      icon: packagesIconSrc,
      label: t("sidebar.packages"),
      alt: t("sidebar.packages"),
      isActive: false,
    },
    {
      key: "hotels",
      icon: hotelsIconSrc,
      label: t("sidebar.hotels"),
      alt: t("sidebar.hotels"),
      isActive: false,
    },
    {
      key: "dining",
      icon: diningIconSrc,
      label: t("sidebar.dining"),
      alt: t("sidebar.dining"),
      isActive: false,
    },
  ];

  // const [isHighContrast, setIsHighContrast] = useState(false);

  return (
    <div className="mobile-top">
      {navigationItems.map((item, index) => (
        <div
          key={item.key}
          className={`mobile-top__item ${
            item.isActive ? "mobile-top__item--active" : ""
          }`}
        >
          <img
            src={
              item.key === "attractions" && item.isActive
                ? attractionsIconSrcActive
                : item.icon
            }
            alt={item.alt}
            className="mobile-top__icon"
          />
          <span
            style={{
              color: item.isActive
                ? isDarkMode
                  ? "#E7EBD4"
                  : "#075ADD"
                : "var(--color-base-mobile-top-item-text)",
              fontWeight: item.isActive ? 700 : 400,
            }}
          >
            {item.label}
          </span>
          {item.isActive && (
            <div
              className="mobile-top__underline"
              style={{
                color: isDarkMode ? "#F7A525" : isHighContrast ? "#075ADD" : "",
              }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MobileNavigationTabs;
