import React from "react";
import { useTranslation } from "react-i18next";

import allIcon from "../../../../assets/icons/dash.svg";
import attractionsIcon from "../../../../assets/icons/beach.svg";
import packagesIcon from "../../../../assets/icons/dropbox.svg";
import hotelsIcon from "../../../../assets/icons/house.svg";
import diningIcon from "../../../../assets/icons/chef.svg";

function MobileNavigationTabs() {
  const { t } = useTranslation();

  const navigationItems = [
    {
      icon: allIcon,
      label: t("sidebar.all"),
      alt: t("sidebar.all"),
      isActive: false,
    },
    {
      icon: attractionsIcon,
      label: t("sidebar.attractions"),
      alt: t("sidebar.attractions"),
      isActive: true,
    },
    {
      icon: packagesIcon,
      label: t("sidebar.packages"),
      alt: t("sidebar.packages"),
      isActive: false,
    },
    {
      icon: hotelsIcon,
      label: t("sidebar.hotels"),
      alt: t("sidebar.hotels"),
      isActive: false,
    },
    {
      icon: diningIcon,
      label: t("sidebar.dining"),
      alt: t("sidebar.dining"),
      isActive: false,
    },
  ];

  return (
    <div className="mobile-top">
      {navigationItems.map((item, index) => (
        <div
          key={index}
          className={`mobile-top__item ${
            item.isActive ? "mobile-top__item--active" : ""
          }`}
        >
          <img src={item.icon} alt={item.alt} className="mobile-top__icon" />
          <span style={{ color: "var(--color-base-mobile-top-item-text)" }}>
            {item.label}
          </span>
          {item.isActive && <div className="mobile-top__underline"></div>}
        </div>
      ))}
    </div>
  );
}

export default MobileNavigationTabs;
