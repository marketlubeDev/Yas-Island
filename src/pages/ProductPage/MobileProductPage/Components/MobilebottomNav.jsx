import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import homeIcon from "../../../../assets/icons/home.svg";
import homeIconInverter from "../../../../assets/icons/homecolor.svg";
import chatIcon from "../../../../assets/icons/message.svg";
import chatIconInverter from "../../../../assets/icons/chatcolor.svg";
import cartIcon from "../../../../assets/icons/shopping.svg";
import cartIconInverter from "../../../../assets/icons/cartcolor.svg";
import { useNavigate, useLocation } from "react-router-dom";
import Mycart from "../Components/Mycart";
import { useSelector } from "react-redux";
// import MobileLanding from "./MobileLanding";

function MobileBottomNav() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  const homeIconSrc = isDarkMode ? homeIconInverter : homeIcon;
  const chatIconSrc = isDarkMode ? chatIconInverter : chatIcon;
  const cartIconSrc = isDarkMode ? cartIconInverter : cartIcon;

  const handleCartClick = useCallback(() => {
    setIsCartModalOpen(true);
  }, []);

  const handleCloseCart = useCallback(() => {
    setIsCartModalOpen(false);
  }, []);

  return (
    <>
      <div className="mobile-bottom-nav">
        <div
          className={`mobile-bottom-nav__item${
            location.pathname === "/product"
              ? " mobile-bottom-nav__item--active"
              : ""
          }`}
          onClick={() => {
            navigate("/product");
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          style={{ cursor: "pointer" }}
        >
          <img src={homeIconSrc} alt={t("common.home")} />
          <span>{t("common.home")}</span>
        </div>
        <div className="mobile-bottom-nav__item">
          <img
            src={chatIconSrc}
            alt={t("common.chatWithUs")}
            style={isDarkMode ? { opacity: 0.6 } : {}}
          />
          <span>{t("common.chatWithUs")}</span>
        </div>
        <div
          className="mobile-bottom-nav__item"
          onClick={handleCartClick}
          style={{ cursor: "pointer" }}
        >
          <img
            src={cartIconSrc}
            alt={t("common.cart")}
            style={isDarkMode ? { opacity: 0.6 } : {}}
          />
          <span>{t("common.cart")}</span>
        </div>
      </div>
      {isCartModalOpen && (
        <Mycart onClose={handleCloseCart} visible={isCartModalOpen} />
      )}
    </>
  );
}

export default MobileBottomNav;
