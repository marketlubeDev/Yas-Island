import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AttractionDetailModal from "./AttractionDetailModal";
import BookingModal from "./BookingModal";
import { Modal } from "antd";
import Mycart from "./Mycart";
import closeIcon from "../../../../assets/icons/close.svg";
import closeIconInverter from "../../../../assets/icons/closeinverter.svg";
import { useSelector } from "react-redux";

const AttractionsList = ({ productList }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null); // 'attraction' or 'booking'
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);

  const handleAttractionClick = (item) => {
    setSelectedAttraction(item);
    setModalType("attraction");
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedAttraction(null);
  };

  const handleAddToCart = () => {
    setModalType("booking");
  };

  const handleBookingModalBack = () => {
    setModalType("attraction");
  };

  const handleSaveToCart = () => {
    handleCloseModal();
    setIsCartModalOpen(true);
  };

  const handleCheckout = () => {
    navigate("/payment");
    handleCloseModal();
  };

  const renderModalContent = () => {
    switch (modalType) {
      case "attraction":
        return (
          <AttractionDetailModal
            attraction={selectedAttraction}
            onClose={handleCloseModal}
            onAddToCart={handleAddToCart}
          />
        );
      case "booking":
        return (
          <BookingModal
            onClose={handleCloseModal}
            onBack={handleBookingModalBack}
            onSaveToCart={handleSaveToCart}
            onCheckout={handleCheckout}
            product={selectedAttraction}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="attractions-list">
        {productList?.map((item) => (
          <div className="attraction-card" key={item.id}>
            <img
              src={item?.product_images?.thumbnail_url}
              alt={item?.product_title}
              className="attraction-card__img"
            />
            <div className="attraction-card__content">
              <div className="attraction-card__header">
                <div>
                  <div className="attraction-card__title">
                    {item?.product_title}
                  </div>
                  <div className="attraction-card__desc">
                    {item?.productshortdesc}
                  </div>
                </div>
                <div className="attraction-card__action">
                  <button
                    className="attraction-card__add-btn"
                    onClick={() => handleAttractionClick(item)}
                  >
                    {t("common.add")}
                  </button>
                  <div className="attraction-card__price">
                    <span>AED {item?.product_variants[0]?.gross}</span>
                  </div>
                  <span className="attraction-card__vat">
                    {" "}
                    + {(item?.product_variants[0]?.gross * 0.05).toFixed(2)} Tax
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={modalType !== null}
        onCancel={handleCloseModal}
        footer={null}
        closable={true}
        closeIcon={
          <span className="custom-modal-close">
            <img src={isDarkMode ? closeIconInverter : closeIcon} alt="close" />
          </span>
        }
        width="100%"
        className={
          modalType === "attraction"
            ? "attraction-detail-modal"
            : "booking-modal"
        }
      >
        {renderModalContent()}
      </Modal>

      <Mycart
        onClose={() => setIsCartModalOpen(false)}
        visible={isCartModalOpen}
      />
    </>
  );
};

export default AttractionsList;
