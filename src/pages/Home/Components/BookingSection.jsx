import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeftArrow from "../../../assets/icons/left.svg";
import RightArrow from "../../../assets/icons/right.svg";
import PlusIcon from "../../../assets/icons/plus.svg";
import MinusIcon from "../../../assets/icons/minus.svg";

export default function BookingSection() {
  const navigate = useNavigate();
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
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  return (
    <div className="booking-section">
      {/* Date Selection */}
      <div className="calendar-container">
        <h2>Choose your date</h2>
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
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>
            <div className="calendar-days">{generateCalendarDays()}</div>
          </div>
        </div>
      </div>
      <div className="booking-section-divider"></div>
      {/* Guest Selection */}
      <div className="guest-section h-full flex flex-col justify-between">
        <div className="guest-section-header-container">
          <h2 className="section-title">Choose guests</h2>
          <div className="guest-container">
            <h3 className="guest-summary">2 Adults / 1 Child</h3>
            <div className="guest-controls">
              <div className="guest-row">
                <span className="guest-label">Adult ( 12 Yrs+ )</span>
                <div className="counter-controls">
                  <button
                    className="counter-btn minus-btn"
                    onClick={() =>
                      setGuests({ ...guests, adults: guests.adults - 1 })
                    }
                  >
                    <img src={MinusIcon} alt="minus" />
                  </button>
                  <span className="counter-value">{guests.adults}</span>
                  <button
                    className="counter-btn plus-btn"
                    onClick={() =>
                      setGuests({ ...guests, adults: guests.adults + 1 })
                    }
                  >
                    <img src={PlusIcon} alt="plus" />
                  </button>
                </div>
              </div>

              <div className="guest-row-divider"></div>

              <div className="guest-row">
                <span className="guest-label">Children ( &lt;12 Yrs )</span>
                <div className="counter-controls">
                  <button
                    className="counter-btn minus-btn"
                    onClick={() =>
                      setGuests({ ...guests, children: guests.children - 1 })
                    }
                  >
                    <img src={MinusIcon} alt="minus" />
                  </button>
                  <span className="counter-value">{guests.children}</span>
                  <button
                    className="counter-btn plus-btn"
                    onClick={() =>
                      setGuests({ ...guests, children: guests.children + 1 })
                    }
                  >
                    <img src={PlusIcon} alt="plus" />
                  </button>
                </div>
              </div>
              <div className="guest-row-divider"></div>
            </div>

            <p className="guest-note"></p>
          </div>
        </div>

        <div className="booking-actions">
          <button
            className="checkout-btnn"
            onClick={() => navigate("/payment")}
          >
            Check out <span style={{ color: "red" }}>AED 985.00</span>
          </button>
          <button className="cart-btn">Save to cart</button>
        </div>
      </div>
    </div>
  );
}
