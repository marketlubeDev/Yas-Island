import React, { useState } from "react";
import MobileHeader from "./MobileHeader";
import backIcon from "../../../../assets/icons/back.svg";
import PaymentHeader from "./PaymentHeader";
import { useTranslation } from "react-i18next";

function CheckOut({ onClose, onProceedToPayment, onApplyPromo, onBack }) {
  const { t, i18n } = useTranslation();
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

  // For country/nationality options
  const countryOptions = [
    { value: "UAE", label: t("payment.personalDetails.countries.UAE") },
    { value: "India", label: t("payment.personalDetails.countries.India") },
    { value: "USA", label: t("payment.personalDetails.countries.USA") },
  ];
  const phoneCodeOptions = [
    { value: "+971", label: t("payment.personalDetails.phoneCodes.UAE") },
    { value: "+91", label: t("payment.personalDetails.phoneCodes.India") },
    { value: "+1", label: t("payment.personalDetails.phoneCodes.USA") },
  ];

  return (
    <div className="email-checkout__overlay">
      <PaymentHeader step={3} onBack={onBack} />
      <div className="email-checkout__container">
        <div className="email-checkout__form-container">
          <form className="email-checkout__form" onSubmit={handleSubmit}>
            <div className="email-checkout__steps-underline"></div>
            <label className="email-checkout__label">
              {t("payment.personalDetails.firstName")}
              <input
                type="text"
                className="email-checkout__input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label className="email-checkout__label">
              {t("payment.personalDetails.lastName")}
              <input
                type="text"
                className="email-checkout__input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
            <label className="email-checkout__label">
              {t("payment.personalDetails.countryOfResidence")}
              <select
                className="email-checkout__input email-checkout__select"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                {countryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="email-checkout__label">
              {t("payment.personalDetails.nationality")}
              <select
                className="email-checkout__input email-checkout__select"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                required
              >
                {countryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
            <label
              className="email-checkout__label"
              style={{ flexDirection: "column" }}
            >
              <span style={{ whiteSpace: "nowrap" }}>
                {t("payment.personalDetails.phoneNumber")}
                <span
                  style={{
                    color: "#18142B",
                    fontSize: 14,
                    fontWeight: 200,
                  }}
                >
                  {/* (PREFERRED NUMBER) */}
                </span>{" "}
                {/* * */}
              </span>
              <div className="email-checkout__phone-row">
                <select
                  className="email-checkout__country-code-select"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  {phoneCodeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
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
                {t("payment.orderSummary.title")}
              </div>
              <div className="email-checkout__summary-row email-checkout__summary-row--column">
                <span
                  className="email-checkout__summary-label"
                  style={{ color: "#908999" }}
                >
                  {t("payment.orderSummary.datesAndGuests")}
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
                  <span>{t("payment.orderSummary.subTotal")}</span>
                  <span>AED 935.71</span>
                </div>
                <div className="email-checkout__summary-row">
                  <span>{t("payment.orderSummary.vatAndTax")}</span>
                  <span>+ 49.29 VAT & Tax</span>
                </div>
                <div className="email-checkout__summary-row email-checkout__summary-row--total">
                  <span>{t("payment.orderSummary.total")}</span>
                  <span>AED 985.00</span>
                </div>
              </div>
            </div>

            <div className="email-checkout__promo-box">
              <label
                className="email-checkout__label"
                style={{ marginBottom: 0 }}
              >
                {t("payment.orderSummary.promoCode.label")}
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
                  {t("payment.orderSummary.promoCode.apply")}
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
                {t("payment.orderSummary.terms.acceptTerms")}{" "}
                <a
                  href="#"
                  style={{ color: "#18142B", textDecoration: "underline" }}
                >
                  {t("payment.orderSummary.terms.termsAndConditions")}
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
                {t("payment.orderSummary.terms.receiveCommunications")}
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
              {t("payment.paymentDetails.proceedToPayment")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
