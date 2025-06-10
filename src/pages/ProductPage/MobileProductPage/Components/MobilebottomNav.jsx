import React, { useState } from "react";
import homeIcon from "../../../../assets/icons/home.svg";
import chatIcon from "../../../../assets/icons/message.svg";
import cartIcon from "../../../../assets/icons/shopping.svg";
import { useNavigate, useLocation } from "react-router-dom";
import Mycart from "../Components/Mycart";
// import MobileLanding from "./MobileLanding";

function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

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
          <span>Home</span>
        </div>
        <div className="mobile-bottom-nav__item">
          <img src={chatIcon} alt="Chat with us" />
          <span>Chat with us</span>
        </div>
        <div
          className="mobile-bottom-nav__item"
          onClick={handleCartClick}
          style={{ cursor: "pointer" }}
        >
          <img src={cartIcon} alt="Cart" />
          <span>Cart</span>
        </div>
      </div>
      <Mycart 
        onClose={() => setIsCartModalOpen(false)}
        visible={isCartModalOpen}
      />
    </>
  );
}

export default MobileBottomNav;
