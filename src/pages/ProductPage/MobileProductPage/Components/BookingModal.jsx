import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import closeIcon from "../../../../assets/icons/close.svg"; // Use your close icon
import leftIcon from "../../../../assets/icons/left.svg";
import { useLanguage } from "../../../../context/LanguageContext";

function BookingModal({ onClose, onBack, onSaveToCart, onCheckout, product }) {
  const { t, i18n } = useTranslation();
  const { language } = useLanguage();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [guests, setGuests] = useState(getVariants());
  const [totalPrice, setTotalPrice] = useState(0);

  function getVariants() {
    const variants = {};
    product?.product_variants?.forEach((variant) => {
      variants[variant?.productvariantname] = 1;
    });
    return variants;
  }

  useEffect(() => {
    setGuests(getVariants());
  }, [product]);

  useEffect(() => {
    let newTotalPrice = 0;

    product?.product_variants?.forEach((variant) => {
      const variantName = variant.productvariantname;
      if (guests[variantName]) {
        newTotalPrice += variant.gross * guests[variantName];
      }
    });

    setTotalPrice(newTotalPrice);
  }, [guests, product]);

  function getValidDateRange(product) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date

    let tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Normalize tomorrow's date

    let endDate;
    if (product?.calendar_end_date) {
      endDate = new Date(product.calendar_end_date);
    } else {
      endDate = new Date(today.getFullYear(), 11, 31);
    }
    endDate.setHours(23, 59, 59, 999); // Set end date to end of day

    return { startDate: tomorrow, endDate };
  }

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      // Start new selection
      setStartDate(date);
      setEndDate(null);
    } else {
      // Complete the selection
      if (date < startDate) {
        setStartDate(date);
        setEndDate(startDate);
      } else {
        setEndDate(date);
      }
    }
  };

  const isDateInRange = (date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];
    const { startDate: minDate, endDate: maxDate } = getValidDateRange(product);

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="booking-modal__calendar-date empty"
        ></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day,
        0,
        0,
        0,
        0 // Normalize the date for comparison
      );

      const isSelected =
        (startDate && date.toDateString() === startDate.toDateString()) ||
        (endDate && date.toDateString() === endDate.toDateString());
      const isInRange = isDateInRange(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isDisabled =
        date.getTime() < minDate.getTime() ||
        date.getTime() > maxDate.getTime();

      days.push(
        <button
          key={day}
          className={`booking-modal__calendar-date${
            isSelected ? " selected" : ""
          }${isInRange ? " in-range" : ""}${isDisabled ? " disabled" : ""}`}
          onClick={() => !isDisabled && handleDateClick(date)}
          disabled={isDisabled}
        >
          {toArabicNumeral(day)}
        </button>
      );
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString(i18n.language === "ar" ? "ar-SA" : "en-US", {
      month: "long",
      year: "numeric",
    });
  };

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
              <button onClick={handlePrevMonth}>
                <img src={leftIcon} alt="Previous" />
              </button>
              <span className="booking-modal__calendar-month">
                {formatMonthYear(currentDate)}
              </span>
              <button onClick={handleNextMonth}>
                <img
                  src={leftIcon}
                  alt="Next"
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
              {generateCalendarDays()}
            </div>
          </div>

          {/* Guests */}
          <div className="booking-modal__guests-section">
            <div className="booking-modal__guests-title">
              {t("booking.chooseGuests")}
            </div>
            <div className="guests-box">
              <div className="guests-summary">
                {Object.keys(guests).map((variant, idx, arr) => (
                  <span key={variant}>
                    {variant}: {toArabicNumeral(guests[variant])}
                    {idx < arr.length - 1 ? " / " : ""}
                  </span>
                ))}
              </div>
              <div className="guests-divider"></div>
              {Object.keys(guests).map((variant, idx) => (
                <React.Fragment key={idx}>
                  <div className="guests-row">
                    <div className="guest-label-container">
                      <span className="guest-label">{variant}</span>
                      <span className="guest-label-price">
                        AED{" "}
                        {product.product_variants.find(
                          (v) => v.productvariantname === variant
                        )?.gross * guests[variant]}{" "}
                      </span>
                    </div>

                    <div className="guests-controls">
                      <button
                        className="guests-btn"
                        style={{ color: "var(--color-bkg-guest-title-clr)" }}
                        onClick={() =>
                          setGuests((prev) => ({
                            ...prev,
                            [variant]: Math.max(0, prev[variant] - 1),
                          }))
                        }
                      >
                        −
                      </button>
                      <span
                        className="guests-count"
                        style={{ color: "var(--color-bkg-guest-title-clr)" }}
                      >
                        {toArabicNumeral(guests[variant])}
                      </span>
                      <button
                        className="guests-btn"
                        style={{ color: "var(--color-bkg-guest-title-clr)" }}
                        onClick={() =>
                          setGuests((prev) => ({
                            ...prev,
                            [variant]: prev[variant] + 1,
                          }))
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="guests-divider"></div>
                </React.Fragment>
              ))}
              <div className="guests-note">{t("booking.kidsFree")}</div>
            </div>
          </div>
        </div>
        <div className="booking-modal__footer">
          <button
            className="booking-modal__checkout"
            onClick={() =>
              onCheckout &&
              onCheckout({ startDate, endDate, guests, totalPrice })
            }
          >
            {t("booking.checkOut")}{" "}
            <span style={{ color: "var(--color-bkg-checkout-btn-clr-span)" }}>
              AED {toArabicNumeral(totalPrice)}
            </span>
          </button>
          <button
            className="booking-modal__save"
            onClick={() =>
              onSaveToCart &&
              onSaveToCart({ startDate, endDate, guests, totalPrice })
            }
          >
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
