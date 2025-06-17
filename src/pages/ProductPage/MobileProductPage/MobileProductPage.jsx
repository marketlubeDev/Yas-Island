import React, { useState } from "react";
import frame1 from "../../../assets/images/product1.png";
import frame2 from "../../../assets/images/product2.png";
import frame3 from "../../../assets/images/product3.png";
import MobileBottomNav from "./Components/MobilebottomNav";
import MobileHeader from "./Components/MobileHeader";
import MobileTop from "./Components/MobileTop";
import AttractionsList from "./Components/AttractionsList";

import Mycart from "./Components/Mycart";
import EmailVerification from "./Components/EmailVerification";
import ConfirmEmail from "./Components/ConfirmEmail";
import CheckOut from "./Components/CheckOut";
import MakePayment from "./Components/MakePayment";
import PaymentSuccessModal from "./Components/PaymentSuccessful";
import Experience1 from "./Components/Experience1";
import PromoCodeModal from "./Components/PromoCode";
import AttractionDetailModal from "./Components/AttractionDetailModal";
import BookingModal from "./Components/BookingModal";
import { useNavigate, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
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

  const handleConfirmEmail = () => {
    setShowEmailVerification(false);
    setShowConfirmEmail(true);
  };

  const handleConfirmOTP = () => {
    setShowConfirmEmail(false);
    setShowCheckOut(true);
  };

  return (
    <div className="mobile-product-page">
      <MobileHeader className="mobile-header" />
      <MobileTop className="mobile-topnav" />
      <MobileBottomNav className="mobile-bottomnav" />
      <div className="scroll-section">
        <AttractionsList attractions={attraction} />
      </div>
      {/*
      {showEmailVerification && (
        <EmailVerification
          onBack={() => setShowEmailVerification(false)}
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
      )} */}
    </div>
  );
}

export default MobileProductPage;
