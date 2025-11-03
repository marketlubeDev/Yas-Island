import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import allIcon from "../../../assets/icons/dash.svg";
import allIconInverter from "../../../assets/icons/inverteddash.svg";
import allIconHighContrast from "../../../assets/icons/allIconHighContrast.svg";
import attractionsIcon from "../../../assets/icons/beach.svg";
import attractionsIconInverter from "../../../assets/icons/invertedbeach.svg";
import attractionsIconHighContrast from "../../../assets/icons/highbeach.svg";
import packagesIcon from "../../../assets/icons/dropbox.svg";
import packagesIconInverter from "../../../assets/icons/inverteddropbox.svg";
import packagesIconHighContrast from "../../../assets/icons/packagesIconHighContrast.svg";
import hotelsIcon from "../../../assets/icons/house.svg";
import hotelsIconInverter from "../../../assets/icons/invertedhouse.svg";
import hotelsIconHighContrast from "../../../assets/icons/hotelsIconHighContrast.svg";
import diningIcon from "../../../assets/icons/chef.svg";
import diningIconInverter from "../../../assets/icons/invertedchef.svg";
import diningIconHighContrast from "../../../assets/icons/diningIconHighContrast.svg";
import camera from "../../../assets/icons/cam.svg";
import cameraIconHighContrast from "../../../assets/icons/cameraIconHighContrast.svg";
import cameraIconInverter from "../../../assets/icons/cameraIconInverter.svg";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function MobileNavigationTabs() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  const isHighContrast = useSelector(
    (state) => state.accessibility.isHighContrast
  );
  const location = useLocation();
  const pathname = location.pathname;
  const [isActive, setIsActive] = useState("");
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const zoomLevel = useSelector((state) => state.accessibility && state.accessibility.zoomLevel);
  const [isZoom1x, setIsZoom1x] = useState(true);
  const listRef = useRef(null);
  const isRTL = (i18n && i18n.dir && i18n.dir() === "rtl") ||
    (typeof document !== "undefined" && document.dir === "rtl");

  useEffect(() => {
    if (pathname === "/all") {
      setIsActive("all");
    } else if (pathname === "/packages") {
      setIsActive("packages");
    } else if (pathname === "/hotels") {
      setIsActive("hotels");
    } else if (pathname === "/dining") {
      setIsActive("dining");
    }
    else if (pathname === "/events") {
      setIsActive("events");
    } else {
      setIsActive("attractions");
    }
  }, [pathname]);

  // Track small devices (e.g., iPhone SE width <= 375px)
  useEffect(() => {
    const updateIsSmall = () => setIsSmallDevice(window.innerWidth <= 375);
    updateIsSmall();
    window.addEventListener("resize", updateIsSmall);
    return () => window.removeEventListener("resize", updateIsSmall);
  }, []);

  // Track zoom level (1x only). Prefer Redux value; fallback to CSS var --zoom-scale
  useEffect(() => {
    const computeIsZoom1x = () => {
      if (zoomLevel === 1 || zoomLevel === "1") return true;
      if (zoomLevel != null) return false;
      const root = document.documentElement;
      const scaleRaw = getComputedStyle(root).getPropertyValue("--zoom-scale").trim();
      const scale = parseFloat(scaleRaw || "1");
      return Math.abs(scale - 1) < 0.01;
    };
    setIsZoom1x(computeIsZoom1x());
    const onStorage = () => setIsZoom1x(computeIsZoom1x());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [zoomLevel]);

  const allIconSrc = isDarkMode ? allIconInverter : allIcon;
  const allIconSrcActive = isDarkMode ? allIconInverter : allIconHighContrast;
  const attractionsIconSrc = isDarkMode
    ? attractionsIconInverter
    : attractionsIcon;
  const attractionsIconSrcActive =
    isHighContrast || (!isDarkMode && !isHighContrast)
      ? attractionsIconHighContrast
      : attractionsIconInverter;
  const packagesIconSrc = isDarkMode ? packagesIconInverter : packagesIcon;
  const packagesIconSrcActive = isDarkMode
    ? packagesIconInverter
    : packagesIconHighContrast;
  const hotelsIconSrc = isDarkMode ? hotelsIconInverter : hotelsIcon;
  const hotelsIconSrcActive = isDarkMode
    ? hotelsIconInverter
    : hotelsIconHighContrast;
  const diningIconSrc = isDarkMode ? diningIconInverter : diningIcon;
  const diningIconSrcActive = isDarkMode
    ? diningIconInverter
    : diningIconHighContrast;
  const eventsIconSrc = isDarkMode ? cameraIconInverter : camera;
  const eventsIconSrcActive = isDarkMode ? cameraIconInverter : cameraIconHighContrast;
  const navigationItems = [
    {
      key: "all",
      icon: allIconSrc,
      activeIcon: allIconSrcActive,
      label: t("sidebar.all"),
      alt: t("sidebar.all"),
      link: "/all",
    },
    {
      key: "attractions",
      icon: attractionsIconSrc,
      activeIcon: attractionsIconSrcActive,
      label: t("sidebar.attractions"),
      alt: t("sidebar.attractions"),
      link: "/",
    },
    {
      key: "packages",
      icon: packagesIconSrc,
      activeIcon: packagesIconSrcActive,
      label: t("sidebar.packages"),
      alt: t("sidebar.packages"),
      link: "/packages",
    },
    {
      key: "hotels",
      icon: hotelsIconSrc,
      activeIcon: hotelsIconSrcActive,
      label: t("sidebar.hotels"),
      alt: t("sidebar.hotels"),
      link: "/hotels",
    },
    {
      key: "dining",
      icon: diningIconSrc,
      activeIcon: diningIconSrcActive,
      label: t("sidebar.dining"),
      alt: t("sidebar.dining"),
      link: "/dining",
    },
    {
      key: "events",
      icon: eventsIconSrc,
      activeIcon: eventsIconSrcActive,
      label: t("sidebar.events"),
      alt: t("sidebar.events"),
      link: "/events",
    },
  ];


  useEffect(() => {
    const activeIndex = navigationItems.findIndex((i) => i.key === isActive);
    const itemEl = document.getElementById(`mobile-top-item-${activeIndex}`);
    if (itemEl) {
      const isFirst = activeIndex <= 0;
      const isLast = activeIndex >= navigationItems.length - 1;
      const inlineAlign = isFirst
        ? (isRTL ? "end" : "start")
        : isLast
        ? (isRTL ? "start" : "end")
        : "center";
      itemEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: inlineAlign,
      });
    }
  }, [isActive, isRTL]);

  return (
    <div
      className="mobile-top"
      ref={listRef}
      style={
        isRTL
          ? { paddingRight: isSmallDevice && isZoom1x ? "3rem" : "0", paddingLeft: 0 }
          : { paddingLeft: isSmallDevice && isZoom1x ? "3rem" : "0", paddingRight: 0 }
      }
    >
      {navigationItems.map((item, index) => (
        <div
          key={item.key}
          id={`mobile-top-item-${index}`}
          className={`mobile-top__item ${
            item.key === isActive ? "mobile-top__item--active" : ""
          }`}
          onClick={() => {
            setIsActive(item.key);
            navigate(item.link);
            const isFirst = index <= 0;
            const isLast = index >= navigationItems.length - 1;
            const itemEl = document.getElementById(`mobile-top-item-${index}`);
            if (itemEl) {
              const inlineAlign = isFirst
                ? (isRTL ? "end" : "start")
                : isLast
                ? (isRTL ? "start" : "end")
                : "center";
              itemEl.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: inlineAlign,
              });
            }
          }}
        >
          <img
            src={
              item.key === isActive && item.activeIcon
                ? item.activeIcon
                : item.icon
            }
            alt={item.alt}
            className="mobile-top__icon"
          />
          <span
            style={{
              color:
                item.key === isActive
                  ? isDarkMode
                    ? "#E7EBD4"
                    : "#075ADD"
                  : "var(--color-base-mobile-top-item-text)",
              fontWeight: item.key === isActive ? 700 : 400,
            }}
          >
            {item.label}
          </span>
          {item.key === isActive && (
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
