import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import closeIcon from "../../../../assets/icons/close.svg"; // Use your close icon
import leftIcon from "../../../../assets/icons/left.svg";
import { useLanguage } from "../../../../context/LanguageContext";
import backIcon from "../../../../assets/icons/back copy.svg"; // Replace with your back arrow
import backIconInverter from "../../../../assets/icons/invertedback.svg";
import { useSelector } from "react-redux";
import Loading from "../../../../components/Loading/Loading";

function BookingModalMbl({
  onClose,
  onBack,
  onSaveToCart,
  onCheckout,
  product,
  availableDates,
  isLoadingDates,
}) {
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  const backIconSrc = isDarkMode ? backIconInverter : backIcon;
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

    // Add empty cells at the start
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="booking-modal__calendar-date empty"
        ></div>
      );
    }

    // Add the days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day,
        0,
        0,
        0,
        0
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
          {day}
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
    if (i18n.language === "ar") {
      const arabicMonths = {
        0: "يناير", // Yanāyir
        1: "فبراير", // Fibrayir
        2: "مارس", // Māris
        3: "أبريل", // Abrīl
        4: "مايو", // Māyū
        5: "يونيو", // Yūniyū
        6: "يوليو", // Yūlyū
        7: "أغسطس", // Aghustus
        8: "سبتمبر", // Septambir
        9: "أكتوبر", // Oktūbar
        10: "نوفمبر", // Nūfambir
        11: "ديسمبر", // Dīsambir
      };
      const arabicMonth = arabicMonths[date.getMonth()];
      const gregorianYear = date
        .getFullYear()
        .toString()
        .split("")
        .map(
          (digit) =>
            ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"][parseInt(digit)]
        )
        .join("");
      return `${arabicMonth} ${gregorianYear}`;
    }
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
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

  const renderCalendarSkeleton = () => (
    <div className="calendar-skeleton">
      <div className="calendar-header-skeleton skeleton"></div>
      <div className="calendar-days-skeleton">
        {Array(7)
          .fill(0)
          .map((_, i) => (
            <div
              key={`weekday-${i}`}
              className="skeleton"
              style={{ height: "20px" }}
            ></div>
          ))}
        {Array(28)
          .fill(0)
          .map((_, i) => (
            <div key={`day-${i}`} className="day-skeleton skeleton"></div>
          ))}
      </div>
    </div>
  );

  const renderGuestSectionSkeleton = () => (
    <div className="guest-section-skeleton">
      <div
        className="guest-summary-skeleton skeleton"
        style={{ height: "24px", marginBottom: "16px", width: "50%" }}
      ></div>
      {Array(2)
        .fill(0)
        .map((_, i) => (
          <div key={`guest-${i}`} style={{ marginBottom: "16px" }}>
            <div
              className="guest-row-skeleton skeleton"
              style={{ height: "32px", marginBottom: "12px" }}
            ></div>
            <div className="guest-controls-skeleton">
              <div 
                className="control-btn-skeleton skeleton" 
                style={{ width: "24px", height: "24px" }}
              ></div>
              <div 
                className="control-value-skeleton skeleton" 
                style={{ width: "32px", height: "24px" }}
              ></div>
              <div 
                className="control-btn-skeleton skeleton" 
                style={{ width: "24px", height: "24px" }}
              ></div>
            </div>
            {i < 1 && (
              <div
                style={{ height: "1px", background: "#eee", margin: "16px 0" }}
              ></div>
            )}
          </div>
        ))}
    </div>
  );

  const skeletonStyles = `
  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }

  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .calendar-skeleton {
    width: 100%;
    padding: 16px;
    height: fit-content;
  }

  .calendar-header-skeleton {
    height: 32px;
    margin-bottom: 16px;
    border-radius: 4px;
  }

  .calendar-days-skeleton {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 6px;
  }

  .day-skeleton {
    aspect-ratio: 1;
    border-radius: 4px;
  }

  .guest-section-skeleton {
    padding: 16px;
    height: fit-content;
  }

  .guest-controls-skeleton {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
  }
  `;

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = skeletonStyles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div
      className="booking-modal-overlay"
      style={{ background: "var(--color-bkg-body-bg)" }}
    >
      <div className="booking-modal">
        <div className="booking-modal__header">
          <img
            src={backIconSrc}
            alt="Back"
            className="attraction-detail-modal__back-icon"
            onClick={onClose}
          />
          <span className="booking-modal__title">
            {t("booking.chooseDate")}
          </span>
        </div>
        <div className="booking-modal__body">
          {/* Calendar */}
          <div className="booking-modal__calendar">
            {isLoadingDates ? (
              renderCalendarSkeleton()
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Guests */}
          <div className="booking-modal__guests-section">
            <div className="booking-modal__guests-title">
              {t("booking.chooseGuests")}
            </div>

            <div className="guests-box-container">
              <div className="guests-box">
                {isLoadingDates ? (
                  renderGuestSectionSkeleton()
                ) : (
                  <>
                    <div className="guests-summary">
                      {Object.keys(guests).map((variant, idx, arr) => (
                        <span key={variant}>
                          {variant}: {toArabicNumeral(guests[variant])}
                          {idx < arr.length - 1 ? " / " : ""}
                        </span>
                      ))}
                    </div>
                    <div className="guests-divider"></div>
                    {Object.keys(guests).map((variant, idx) => {
                      const variantData = product.product_variants.find(
                        (v) => v.productvariantname === variant
                      );
                      return (
                        <React.Fragment key={idx}>
                          <div className="guests-row">
                            <div className="guest-label-container">
                              <span className="guest-label">
                                {variant}{" "}
                                {variantData?.productvariantdesc &&
                                  `(${variantData.productvariantdesc})`}
                              </span>
                              <span className="guest-label-price">
                                AED {variantData?.gross * guests[variant]}{" "}
                              </span>
                            </div>

                            <div className="guests-controls">
                              <button
                                className="guests-btn"
                                style={{
                                  color: "var(--color-bkg-guest-title-clr)",
                                }}
                                onClick={() =>
                                  setGuests((prev) => ({
                                    ...prev,
                                    [variant]: Math.max(0, prev[variant] - 1),
                                  }))
                                }
                              >
                                -
                              </button>
                              <span
                                className="guests-count"
                                style={{
                                  color: "var(--color-bkg-guest-title-clr)",
                                }}
                              >
                                {toArabicNumeral(guests[variant])}
                              </span>
                              <button
                                className="guests-btn"
                                style={{
                                  color: "var(--color-bkg-guest-title-clr)",
                                }}
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
                      );
                    })}
                  </>
                )}
                  
              </div>
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
            disabled={isLoadingDates}
            style={isLoadingDates ? { opacity: 0.5, pointerEvents: "none" } : {}}
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
            disabled={isLoadingDates}
            style={isLoadingDates ? { opacity: 0.5, pointerEvents: "none" } : {}}
          >
            {isLoadingDates ? <Loading /> : t("booking.saveToCart")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingModalMbl;
