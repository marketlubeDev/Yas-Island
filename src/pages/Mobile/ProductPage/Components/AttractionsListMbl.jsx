import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AttractionDetailModalMbl from "./AttractionDetailModalMbl";
import BookingModalMbl from "./BookingModalMbl";
import { Modal } from "antd";
import Mycart from "../../../Home/MobileComponents/MycartMbl";
import closeIcon from "../../../../assets/icons/close.svg";
import closeIconInverter from "../../../../assets/icons/closeinverter.svg";
import { useSelector, useDispatch } from "react-redux";
import { setCheckout } from "../../../../global/checkoutSlice";
import { setSelectedProduct } from "../../../../global/productSlice";
import { clearPerformance } from "../../../../global/performanceSlice";

const AttractionsListMbl = ({ productList }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);

  const [modalType, setModalType] = useState(null); // 'attraction' or 'booking'
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  const [isLoadingDates, setIsLoadingDates] = useState(false);


  const handleAttractionClick = (item) => {
    setSelectedAttraction(item);
    dispatch(setSelectedProduct(item));
    setModalType("attraction");
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedAttraction(null);
    dispatch(setSelectedProduct({}));
    dispatch(clearPerformance());
  };

  const handleBookingModalBack = () => {
    setModalType("attraction");
  };

  const handleSaveToCart = () => {
    handleCloseModal();
    setIsCartModalOpen(true);
  };

  // Helper to format date for checkout
  const formatDate = (date) => {
    if (!date) return "";
    // You can use the same Arabic mapping as BookingModal if needed
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  };

  const handleCheckout = (data) => {
    const variants = {};
    selectedAttraction?.product_variants.forEach((variant) => {
      variants[variant?.productid] = data.guests[variant?.productvariantname];
    });

    dispatch(
      setCheckout({
        startDate: formatDate(data.startDate),
        endDate: formatDate(data.endDate),
        guests: variants,
        totalPrice: data.totalPrice,
      })
    );

    navigate("/payment");
    handleCloseModal();
  };

  const renderModalContent = () => {
    switch (modalType) {
      case "attraction":
        return (
          <AttractionDetailModalMbl
            attraction={selectedAttraction}
            onClose={handleCloseModal}
            setShowBookingSection={setModalType}
            setAvailableDates={setAvailableDates}
            setIsLoadingDates={setIsLoadingDates}
          />
        );
      case "booking":
        return (
          <BookingModalMbl
            onClose={handleCloseModal}
            onBack={handleBookingModalBack}
            onSaveToCart={handleSaveToCart}
            onCheckout={handleCheckout}
            product={selectedAttraction}
            availableDates={availableDates}
            isLoadingDates={isLoadingDates}   
          />
        );
      default:
        return null;
    }
  };

  const defaultVariant = (product) => {
    let defaultVariant = product?.product_variants?.find(
      (variant) => variant.isdefault
    );
    if (!defaultVariant) {
      defaultVariant = product?.product_variants[0];
    }
    return defaultVariant;
  };

  return (
    <>
      <div className="attractions-list">
        {productList?.map((item, i) => (
          <div className="attraction-card" key={i}>
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
                  <div className="attraction-card__price" style={{marginRight: "0.5rem"}}>
                    <span>AED {defaultVariant(item)?.gross}</span>
                  </div>
                  {/* <span className="attraction-card__vat">
                    {defaultVariant(item)?.net_amount}+{" "}
                    {(defaultVariant(item)?.gross * 0.05).toFixed(2)} Net & Tax
                  </span> */}
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
        closable={false}
        // closeIcon={
        //   <span className="custom-modal-close">
        //     <img src={isDarkMode ? closeIconInverter : closeIcon} alt="close" />
        //   </span>
        // }
        width="100%"
        className={
          modalType === "attraction"
            ? "attraction-detail-modal"
            : "booking-modal"
        }
      >
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default AttractionsListMbl;
