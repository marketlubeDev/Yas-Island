import React, { useState } from "react";
import MobileHeader from "./MobileHeader";
import backIcon from "../../../../assets/icons/back.svg";
import PaymentHeader from "./PaymentHeader";

function CheckOut({ onClose, onProceedToPayment, onApplyPromo }) {
  const [firstName, setFirstName] = useState("vivek");
  const [lastName, setLastName] = useState("panashi");
  const [country, setCountry] = useState("UAE");
  const [nationality, setNationality] = useState("UAE");
  const [phone, setPhone] = useState("527263748");
  const [promo, setPromo] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [receiveComms, setReceiveComms] = useState(false);
  const [countryCode, setCountryCode] = useState("+971");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (acceptTerms) {
      onProceedToPayment();
    }
  };

  return (
    <div className="email-checkout__overlay">
      <div className="email-checkout__container">
        <PaymentHeader />
        <div className="email-checkout__form-container">
          <form className="email-checkout__form" onSubmit={handleSubmit}>
            <div className="email-checkout__steps-underline"></div>
            <label className="email-checkout__label">
              FIRST NAME *
              <input
                type="text"
                className="email-checkout__input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label className="email-checkout__label">
              LAST NAME *
              <input
                type="text"
                className="email-checkout__input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
            <label className="email-checkout__label">
              COUNTRY OF RESIDENCE *
              <select
                className="email-checkout__input email-checkout__select"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                <option value="UAE">UAE</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
              </select>
            </label>
            <label className="email-checkout__label">
              NATIONALITY *
              <select
                className="email-checkout__input email-checkout__select"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                required
              >
                <option value="UAE">UAE</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
              </select>
            </label>
            <label
              className="email-checkout__label"
              style={{ flexDirection: "column" }}
            >
              <span style={{ whiteSpace: "nowrap" }}>
                PHONE NUMBER{" "}
                <span
                  style={{
                    color: "#18142B",
                    fontSize: 14,
                    fontWeight: 200,
                  }}
                >
                  (PREFERRED NUMBER)
                </span>{" "}
                *
              </span>
              <div className="email-checkout__phone-row">
                <select
                  className="email-checkout__country-code-select"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  <option value="+971">+971</option>
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                </select>
                <input
                  type="tel"
                  className="email-checkout__input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={{ letterSpacing: "5px", width: "120px" }}
                />
              </div>
            </label>

            <div className="email-checkout__summary">
              <div
                className="email-checkout__summary-title"
                style={{ color: "#18142B" }}
              >
                1 day FERRARI WORLD YAS ISLAND
              </div>
              <div className="email-checkout__summary-row email-checkout__summary-row--column">
                <span
                  className="email-checkout__summary-label"
                  style={{ color: "#908999" }}
                >
                  DATES & GUESTS
                </span>
                <span
                  className="email-checkout__summary-value"
                  style={{
                    color: "#18142B",
                    fontWeight: 600,
                    fontSize: 15,
                  }}
                >
                  THU 08- FEB 2025 &nbsp; ADULT - 2 &nbsp; CHILDREN - 1
                </span>
              </div>
              <div className="email-checkout__summary-totals">
                <div className="email-checkout__summary-row">
                  <span>Sub total :</span>
                  <span>AED 935.71</span>
                </div>
                <div className="email-checkout__summary-row">
                  <span>vat & tax :</span>
                  <span>+ 49.29 VAT & Tax</span>
                </div>
                <div className="email-checkout__summary-row email-checkout__summary-row--total">
                  <span>Total :</span>
                  <span>AED 985.00</span>
                </div>
              </div>
            </div>

            <div className="email-checkout__promo-box">
              <label
                className="email-checkout__label"
                style={{ marginBottom: 0 }}
              >
                ENTER YOUR PROMO CODE TO GET DISCOUNT
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="text"
                  className="email-checkout__input email-checkout__promo-input"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                />
                <button
                  type="button"
                  className="email-checkout__promo-apply"
                  onClick={onApplyPromo}
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="email-checkout__checkboxes">
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  whiteSpace: "nowrap",
                  marginLeft: "-37px",
                  color: "#908999",
                }}
              >
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms((v) => !v)}
                  required
                />
                I have read and accept the{" "}
                <a
                  href="#"
                  style={{ color: "#18142B", textDecoration: "underline" }}
                >
                  terms and conditions
                </a>
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#908999",
                  marginLeft: "-37px",
                  marginTop: "20px",
                }}
              >
                <input
                  type="checkbox"
                  checked={receiveComms}
                  onChange={() => setReceiveComms((v) => !v)}
                />
                Receive communications via email
              </label>
            </div>

            <button
              className="email-checkout__btn"
              type="button"
              disabled={!acceptTerms}
              onClick={() => {
                if (acceptTerms) {
                  onProceedToPayment();
                }
              }}
            >
              Proceed to payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
