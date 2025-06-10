import React, { useState } from "react";
import homeIcon from "../../../../assets/icons/home.svg";
import chatIcon from "../../../../assets/icons/message.svg";
import cartIcon from "../../../../assets/icons/shopping.svg";
import { useNavigate, useLocation } from "react-router-dom";
import Mycart from "../Components/Mycart";
import { useTranslation } from "react-i18next";
// import MobileLanding from "./MobileLanding";

function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { t } = useTranslation();

  const handleCartClick = () => {
    setIsCartModalOpen(true);
    window.scrollTo(0, 0);
  };

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
            window.scrollTo(0, 0);
          }}
          style={{ cursor: "pointer" }}
        >
          <img
            src={homeIcon}
            alt="Home"
            style={{
              filter:
                location.pathname === "/product"
                  ? "invert(32%) sepia(99%) saturate(7496%) hue-rotate(202deg) brightness(99%) contrast(101%)"
                  : "brightness(0) saturate(100%)",
            }}
          />
          <span>{t("common.home")}</span>
        </div>
        <div className="mobile-bottom-nav__item">
          <img src={chatIcon} alt="Chat with us" />
          <span>{t("common.chatWithUs")}</span>
        </div>
        <div
          className="mobile-bottom-nav__item"
          onClick={handleCartClick}
          style={{ cursor: "pointer" }}
        >
          <img src={cartIcon} alt="Cart" />
          <span>{t("common.viewCart")}</span>
        </div>
      </div>
      {isCartModalOpen && (
        <Mycart
          onClose={() => setIsCartModalOpen(false)}
          onCheckout={() => {
            setIsCartModalOpen(false);
            navigate("/payment");
          }}
          onSaveAndPayLater={() => {
            setIsCartModalOpen(false);
            navigate("/");
          }}
        />
      )}
    </>
  );
}

export default MobileBottomNav;
