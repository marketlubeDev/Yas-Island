import React, { useState } from "react";
import frame1 from "../../../assets/images/product1.png";
import frame2 from "../../../assets/images/product2.png";
import frame3 from "../../../assets/images/product3.png";
import MobileBottomNav from "./Components/MobilebottomNav";
// import AttractionDetailModal from "./AttractionDetailModal";
// import BookingModal from "./BookingModal";
import Mycart from "./Components/Mycart";
import EmailVerification from "./Components/EmailVerification";
import ConfirmEmail from "./Components/ConfirmEmail";
import CheckOut from "./Components/CheckOut";
// import MakePayment from "./MakePayment";
// import Accessibility from "./Accessibility";
import MobileHeader from "./Components/MobileHeader";
import MobileTop from "./Components/MobileTop";
import MakePayment from "./Components/MakePayment";
import PaymentSuccessModal from "./Components/PaymentSuccessful";
import Experience1 from "./Components/Experience1";
import PromoCodeModal from "./Components/PromoCode";
import AttractionDetailModal from "./Components/AttractionDetailModal";
import BookingModal from "./Components/BookingModal";
import { useNavigate, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import MobileLanding from "./MobileLanding";
// import PromoCodeModal from "./PromoCode";
// import PaymentSuccessModal from "./PaymentSuccessful";
// import Experience1 from "./Experience1";
// Example data (replace with your real data or props)
const attraction = [
  {
    id: 1,
    image: frame1,
    titleKey: "products.ferrariWorld.name",
    descKey: "products.ferrariWorld.description",
    price: "AED 1,295",
    vat: "+ 96.43 VAT & tax",
    detailDesc:
      "Love speed? Then gear up for the ride of your life only here at Ferrari World Abu Dhabi. Home to the world's fastest rollercoaster, the highest loop ride, the tallest space-frame structure ever built on the planet and over 40 record-breaking attractions.",
    detailPrice: "AED 328.57",
    detailVat: "16.43 VAT & tax",
  },
  {
    id: 2,
    image: frame2,
    titleKey: "products.vipExperience.name",
    descKey: "products.vipExperience.description",
    price: "AED 10,000",
    vat: "+ 96.43 VAT & tax",
  },
  {
    id: 3,
    image: frame3,
    titleKey: "products.drivingExperience.name",
    descKey: "products.drivingExperience.description",
    price: "AED 1,295",
    vat: "+ 96.43 VAT & tax",
  },
  {
    id: 4,
    image: frame1,
    titleKey: "products.drivingExperience.name",
    descKey: "products.drivingExperience.description",
    price: "AED 1,295",
    vat: "+ 96.43 VAT & tax",
  },
  {
    id: 5,
    image: frame2,
    titleKey: "products.drivingExperience.name",
    descKey: "products.drivingExperience.description",
    price: "AED 1,295",
    vat: "+ 96.43 VAT & tax",
  },
  {
    id: 6,
    image: frame2,
    titleKey: "products.drivingExperience.name",
    descKey: "products.drivingExperience.description",
    price: "AED 1,295",
    vat: "+ 96.43 VAT & tax",
  },
  {
    id: 7,
    image: frame2,
    titleKey: "products.drivingExperience.name",
    descKey: "products.drivingExperience.description",
    price: "AED 1,295",
    vat: "+ 96.43 VAT & tax",
  },
];

function MobileProductPage() {
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [showAttractionDetail, setShowAttractionDetail] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showMyCart, setShowMyCart] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(true);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showConfirmEmail, setShowConfirmEmail] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [showMakePayment, setShowMakePayment] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [previousModal, setPreviousModal] = useState(null);
  const { t } = useTranslation();

  console.log(showBookingModal, "skhdkhsdkhskh");

  const handleConfirmEmail = () => {
    setShowEmailVerification(false);
    setShowConfirmEmail(true);
  };

  const handleConfirmOTP = () => {
    setShowConfirmEmail(false);
    setShowCheckOut(true);
  };

  return (
    <>
      <MobileHeader />
      <MobileTop />
      <div className="attractions-list">
        {attraction.map((item) => (
          <div className="attraction-card" key={item.id}>
            <img
              src={item.image}
              alt={t(item.titleKey)}
              className="attraction-card__img"
            />
            <div className="attraction-card__content">
              <div className="attraction-card__header">
                <div>
                  <div className="attraction-card__title">
                    {t(item.titleKey)}
                  </div>
                  <div className="attraction-card__desc">{t(item.descKey)}</div>
                </div>
                <div className="attraction-card__action">
                  <button
                    className="attraction-card__add-btn"
                    onClick={() => {
                      setSelectedAttraction(item);
                      setShowAttractionDetail(true);
                    }}
                  >
                    {t("common.add")}
                  </button>
                  <div className="attraction-card__price">
                    <span>{item.price}</span>
                  </div>
                  <span className="attraction-card__vat">{item.vat}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        <MobileBottomNav />
      </div>

      {/* components */}

      {showAttractionDetail && selectedAttraction && (
        <AttractionDetailModal
          attraction={selectedAttraction}
          onClose={() => setShowAttractionDetail(false)}
          onBack={() => setShowAttractionDetail(false)}
          onAddToCart={() => {
            setShowAttractionDetail(false);
            setShowBookingModal(true);
          }}
          setShowAttractionDetail={setShowAttractionDetail}
          setShowBookingModal={setShowBookingModal}
        />
      )}
      {showBookingModal && (
        <BookingModal
          onClose={() => setShowBookingModal(false)}
          onSaveToCart={() => {
            setShowBookingModal(false);
            setPreviousModal("booking");
            setShowMyCart(true);
          }}
          onCheckout={() => {
            setShowBookingModal(false);
            setShowEmailVerification(true);
          }}
          onBack={() => {
            setShowBookingModal(false);
            setShowAttractionDetail(true);
          }}
        />
      )}
      {showMyCart && (
        <Mycart
          onClose={() => {
            setShowMyCart(false);
            if (previousModal === "booking") {
              setShowBookingModal(true);
            }
          }}
          onCheckout={() => {
            setShowMyCart(false);
            setShowEmailVerification(true);
          }}
          onSaveAndPayLater={() => {
            setShowMyCart(false);
            setShowBookingModal(true);
          }}
          onBack={() => {
            setShowMyCart(false);
            if (previousModal === "booking") {
              setShowBookingModal(true);
            }
          }}
        />
      )}
      {showEmailVerification && (
        <EmailVerification
          onClose={() => setShowEmailVerification(false)}
          onBack={() => {
            setShowEmailVerification(false);
            setShowMyCart(true);
          }}
          onConfirmEmail={handleConfirmEmail}
        />
      )}
      {showConfirmEmail && (
        <ConfirmEmail
          onBack={() => {
            setShowConfirmEmail(false);
            setShowEmailVerification(true);
          }}
          onConfirm={handleConfirmOTP}
        />
      )}
      {showCheckOut && (
        <CheckOut
          onClose={() => setShowCheckOut(false)}
          onBack={() => {
            setShowCheckOut(false);
            setShowEmailVerification(true);
          }}
          onApplyPromo={() => {
            setShowCheckOut(false);
            setShowPromoCode(true);
          }}
          onProceedToPayment={() => {
            setShowCheckOut(false);
            setShowMakePayment(true);
          }}
        />
      )}
      {showPromoCode && (
        <PromoCodeModal
          onClose={() => {
            setShowPromoCode(false);
            setShowCheckOut(true);
          }}
        />
      )}
      {showMakePayment && (
        <MakePayment
          onClose={() => setShowMakePayment(false)}
          onPaymentSuccess={() => {
            setShowMakePayment(false);
            setShowPaymentSuccess(true);
          }}
        />
      )}
      {showPaymentSuccess && (
        <PaymentSuccessModal
          onClose={() => setShowPaymentSuccess(false)}
          onShowExperience={() => {
            setShowPaymentSuccess(false);
            setShowExperience(true);
          }}
        />
      )}
      {showExperience && (
        <Experience1
          onClose={() => setShowExperience(false)}
          // ...other props as needed
        />
      )}
    </>
  );
}

export default MobileProductPage;
