import { useState } from "react";
import LeftArrow from "../../../assets/icons/left.svg";
import RightArrow from "../../../assets/icons/right.svg";
import { useTranslation } from "react-i18next";

export default function BookingSection() {
  const { t, i18n } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [guests, setGuests] = useState({
    adults: 2,
    children: 1,
  });

  // Calendar helper functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    // Add the actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <div
          key={day}
          className={`day ${isSelected ? "selected" : ""} ${
            isToday ? "today" : ""
          }`}
          onClick={() => setSelectedDate(date)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  // Handle month navigation
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

  // Format month and year
  const formatMonthYear = (date) => {
    return date.toLocaleDateString(i18n.language === "ar" ? "ar-SA" : "en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="booking-section">
      {/* Date Selection */}
      <div className="calendar-container">
        <h2>{t("booking.chooseDate")}</h2>
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
              {guests.adults} {t("booking.adults")} / {guests.children}{" "}
              {t("booking.children")}
            </h3>
            <div className="guest-controls">
              <div className="guest-row">
                <span className="guest-label">{t("booking.adults")}</span>
                <div className="counter-controls">
                  <button
                    className="counter-btn"
                    onClick={() =>
                      setGuests({ ...guests, adults: guests.adults - 1 })
                    }
                  >
                    -
                  </button>
                  <span className="counter-value">{guests.adults}</span>
                  <button
                    className="counter-btn"
                    onClick={() =>
                      setGuests({ ...guests, adults: guests.adults + 1 })
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="guest-row-divider"></div>

              <div className="guest-row">
                <span className="guest-label">{t("booking.children")}</span>
                <div className="counter-controls">
                  <button
                    className="counter-btn"
                    onClick={() =>
                      setGuests({ ...guests, children: guests.children - 1 })
                    }
                  >
                    -
                  </button>
                  <span className="counter-value">{guests.children}</span>
                  <button
                    className="counter-btn"
                    onClick={() =>
                      setGuests({ ...guests, children: guests.children + 1 })
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="guest-row-divider"></div>
            </div>

            <p className="guest-note">{t("booking.kidsFree")}</p>
          </div>
        </div>

        <div className="booking-actions">
          <button
            className="checkout-btnn"
            onClick={() => (window.location.href = "/payment")}
          >
            {t("booking.checkOut")}{" "}
            <span style={{ color: "red" }}>AED 985.00</span>
          </button>
          <button className="cart-btn">{t("booking.saveToCart")}</button>
        </div>
      </div>
    </div>
  );
}
