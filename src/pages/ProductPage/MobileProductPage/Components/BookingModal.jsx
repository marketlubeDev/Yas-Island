import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import closeIcon from "../../../../assets/icons/close.svg"; // Use your close icon
import leftIcon from "../../../../assets/icons/left.svg";

function BookingModal({ onClose, onBack, onSaveToCart, onCheckout }) {
  const { t, i18n } = useTranslation();
  // Example state for guests
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);

  // Example state for selected date
  const [selectedDate, setSelectedDate] = useState(8);

  // Example: handle date selection (replace with your calendar logic)
  const handleDateClick = (date) => setSelectedDate(date);

  // Function to convert numbers to Arabic numerals
  const toArabicNumeral = (num) => {
    if (i18n.language === "ar") {
      const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
      return num
        .toString()
        .split("")
        .map((digit) => arabicNumerals[parseInt(digit)])
        .join("");
    }
    return num;
  };

  return (
    <div
      className="booking-modal-overlay"
      style={{ background: "var(--color-bkg-body-bg)" }}
    >
      <div className="booking-modal">
        <div className="booking-modal__header">
          <span className="booking-modal__title">
            {t("booking.chooseDate")}
          </span>
        </div>
        <div className="booking-modal__body">
          {/* Calendar */}
          <div className="booking-modal__calendar">
            <div className="booking-modal__calendar-header">
              <button>
                <img src={leftIcon} alt="Next" />
              </button>
              <span className="booking-modal__calendar-month">
                {t("booking.month")} {t("booking.year")}
              </span>
              <button>
                <img
                  src={leftIcon}
                  alt="Previous"
                  className="booking-modal__calendar-arrow--rotated"
                />
              </button>
            </div>
            <div className="booking-modal__calendar-divider"></div>
            <div className="booking-modal__calendar-grid">
              {Object.values(
                t("booking.weekDays", { returnObjects: true })
              ).map((d) => (
                <span key={d} className="booking-modal__calendar-dayname">
                  {d}
                </span>
              ))}
              {Array.from({ length: 28 }, (_, i) => i + 1).map((date) => (
                <button
                  key={date}
                  className={`booking-modal__calendar-date${
                    selectedDate === date ? " selected" : ""
                  }`}
                  onClick={() => handleDateClick(date)}
                >
                  {toArabicNumeral(date)}
                </button>
              ))}
            </div>
          </div>

          {/* Guests */}
          <div className="booking-modal__guests-section">
            <div className="booking-modal__guests-title">
              {t("booking.chooseGuests")}
            </div>
            <div className="guests-box">
              <div className="guests-summary">{t("booking.guestsSummary")}</div>
              <div className="guests-divider"></div>
              <div className="guests-row">
                <span style={{ color: "var(--color-bkg-guest-title-clr)" }}>
                  {t("booking.adults")}
                </span>
                <div className="guests-controls">
                  <button
                    className="guests-btn"
                    style={{ color: "var(--color-bkg-guest-title-clr)" }}
                  >
                    −
                  </button>
                  <span
                    className="guests-count"
                    style={{ color: "var(--color-bkg-guest-title-clr)" }}
                  >
                    {toArabicNumeral(2)}
                  </span>
                  <button
                    className="guests-btn"
                    style={{ color: "var(--color-bkg-guest-title-clr)" }}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="guests-divider"></div>
              <div className="guests-row">
                <span style={{ color: "var(--color-bkg-guest-title-clr)" }}>
                  {t("booking.children")}
                </span>
                <div className="guests-controls">
                  <button
                    className="guests-btn"
                    style={{ color: "var(--color-bkg-guest-title-clr)" }}
                  >
                    −
                  </button>
                  <span
                    className="guests-count"
                    style={{ color: "var(--color-bkg-guest-title-clr)" }}
                  >
                    {toArabicNumeral(1)}
                  </span>
                  <button
                    className="guests-btn"
                    style={{ color: "var(--color-bkg-guest-title-clr)" }}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="guests-divider"></div>
              <div className="guests-note">{t("booking.kidsFree")}</div>
            </div>
          </div>
        </div>
        <div className="booking-modal__footer">
          <button className="booking-modal__checkout" onClick={onCheckout}>
            {t("booking.checkOut")}{" "}
            <span style={{ color: "var(--color-bkg-checkout-btn-clr-span)" }}>
              AED {toArabicNumeral(985.0)}
            </span>
          </button>
          <button className="booking-modal__save" onClick={onSaveToCart}>
            {t("booking.saveToCart")}
          </button>
        </div>
      </div>
      {/* <span className="booking-modal__close" onClick={onClose}>
        <img src={closeIcon} alt="Close" />
      </span> */}
    </div>
  );
}

export default BookingModal;
