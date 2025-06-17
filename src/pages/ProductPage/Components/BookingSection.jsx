import { useEffect, useState } from "react";
import LeftArrow from "../../../assets/icons/left.svg";
import RightArrow from "../../../assets/icons/right.svg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { useDispatch } from "react-redux";
import { setCheckout } from "../../../global/checkoutSlice";

export default function BookingSection({ product, onBack }) {
  const { t, i18n } = useTranslation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [guests, setGuests] = useState(getVariants());
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const dispatch = useDispatch();


  function getVariants() {
    const variants = {};
    product?.product_variants?.forEach((variant) => {
      variants[variant?.productvariantname] = 1; // or 0 if you want to start from 0
    });
    return variants;
  }

  useEffect(() => {
    setGuests(getVariants());
  }, [product]);

  function getValidDateRange(product) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date

    let tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Normalize tomorrow's date

    let endDate;
    if (product.calendar_end_date) {
      endDate = new Date(product.calendar_end_date);
    } else {
      endDate = new Date(today.getFullYear(), 11, 31);
    }
    endDate.setHours(23, 59, 59, 999); // Set end date to end of day

    return { startDate: tomorrow, endDate };
  }

  // Calendar helper functions
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

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];
    const { startDate: minDate, endDate: maxDate } = getValidDateRange(product);

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    // Add the actual days
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
        <div
          key={day}
          className={`day 
            ${isSelected ? "selected" : ""} 
            ${isInRange ? "in-range" : ""}
            ${isToday ? "today" : ""} 
            ${isDisabled ? "disabled" : ""}`}
          onClick={() => !isDisabled && handleDateClick(date)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  // Handle month navigation
  const handlePrevMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1
    );
    const today = new Date();

    // Only allow going back to current month
    if (
      newDate.getMonth() >= today.getMonth() ||
      newDate.getFullYear() > today.getFullYear()
    ) {
      setCurrentDate(newDate);
    }
  };

  const handleNextMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );
    const { endDate } = getValidDateRange(product);

    // Only allow going forward if within the valid range
    if (newDate <= endDate) {
      setCurrentDate(newDate);
    }
  };

  // Format month and year
  const formatMonthYear = (date) => {
    return date.toLocaleDateString(i18n.language === "ar" ? "ar-SA" : "en-US", {
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    let newTotalPrice = 0;
    product.product_variants.forEach((variant) => {
      const variantName = variant.productvariantname;

      if (guests[variantName]) {
        newTotalPrice += variant.gross * guests[variantName];
      }
    });
    setTotalPrice(newTotalPrice);
  }, [guests, product]);

  const handleCheckout = () => {
    const variants = {}

    product?.product_variants.forEach((variant) => {
      variants[variant?.productid] = guests[variant?.productvariantname];
    });

    console.log(variants, "varinats");
    dispatch(setCheckout({
      startDate,
      endDate,
      guests:variants,
      totalPrice,
    }));
    navigate("/payment");
  };

  return (
    <div className="booking-section">
      {/* Date Selection */}
      <div className="calendar-container">
        <h2>{t("booking.chooseDate")}</h2>
        {/* <div className="selected-dates">
          {startDate && (
            <div>
              {t("booking.startDate")}: {startDate.toLocaleDateString()}
            </div>
          )}
          {endDate && (
            <div>
              {t("booking.endDate")}: {endDate.toLocaleDateString()}
            </div>
          )}
        </div> */}
        <div className="calendar-wrapper">
          <div className="calendar-header">
            <button onClick={handlePrevMonth}>
              <img src={LeftArrow} alt="Left Arrow" />
            </button>
            <h3>{formatMonthYear(currentDate)}</h3>
            <button onClick={handleNextMonth}>
              <img src={RightArrow} alt="Right Arrow" />
            </button>
          </div>

          <div className="calendar-body">
            <div className="calendar-weekdays">
              <span>{t("booking.weekDays.sun")}</span>
              <span>{t("booking.weekDays.mon")}</span>
              <span>{t("booking.weekDays.tue")}</span>
              <span>{t("booking.weekDays.wed")}</span>
              <span>{t("booking.weekDays.thu")}</span>
              <span>{t("booking.weekDays.fri")}</span>
              <span>{t("booking.weekDays.sat")}</span>
            </div>
            <div className="calendar-days">{generateCalendarDays()}</div>
          </div>
        </div>
      </div>
      <div className="booking-section-divider"></div>
      {/* Guest Selection */}
      <div className="guest-section h-full flex flex-col justify-between">
        <div className="guest-section-header-container">
          <h2 className="section-title">{t("booking.chooseGuests")}</h2>
          <div className="guest-container">
            <h3 className="guest-summary">
              {Object.keys(guests).map((variant, idx, arr) => (
                <span className="" key={variant}>
                  {variant}: {guests[variant]}
                  {idx < arr.length - 1 ? " / " : ""}
                </span>
              ))}
            </h3>
            <div className="guest-controls">
              {Object.keys(guests)?.map((variant, idx) => (
                <div key={idx}>
                  <div className="guest-row">
                    <div className="guest-label-container">
                      <span className="guest-label">{variant}</span>
                      <span className="guest-label-price">
                        AED{" "}
                        {product.product_variants.find(
                          (v) => v.productvariantname === variant
                        )?.gross * guests[variant]}{" "}
                      </span>
                    </div>
                    <div className="counter-controls">
                      <button
                        className="counter-btn"
                        onClick={() =>
                          setGuests((prev) => ({
                            ...prev,
                            [variant]: Math.max(0, prev[variant] - 1),
                          }))
                        }
                      >
                        -
                      </button>
                      <span className="counter-value">{guests[variant]}</span>
                      <button
                        className="counter-btn"
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

                  <div className="guest-row-divider"></div>
                </div>
              ))}
            </div>

            <p className="guest-note">{t("booking.kidsFree")}</p>
          </div>
        </div>

        <div
          className={
            language === "العربية" ? "ar-booking-actions" : "booking-actions"
          }
        >
          <button
            className="checkout-btnn"
            onClick={handleCheckout}
          >
            {t("booking.checkOut")}{" "}
            <span style={{ color: "red" }}>AED {totalPrice}</span>
          </button>
          <button className="cart-btn">{t("booking.saveToCart")}</button>
        </div>
      </div>
    </div>
  );
}
