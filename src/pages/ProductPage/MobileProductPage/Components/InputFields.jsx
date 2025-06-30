import React from "react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function InputFields() {
  const [firstName, setFirstName] = useState("vivek");
  const [lastName, setLastName] = useState("panashi");
  const [country, setCountry] = useState("UAE");
  const [nationality, setNationality] = useState("UAE");
  const [phone, setPhone] = useState("527263748");
  const [countryCode, setCountryCode] = useState("+971");
  const { t, i18n } = useTranslation();
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
    <div className="email-checkout__form-container-inner">
      <label className="email-checkout__label" id="firstName">
        {t("payment.personalDetails.firstName")}
        <input
          id="firstName"
          type="text"
          className="email-checkout__input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label className="email-checkout__label" id="lastName">
        {t("payment.personalDetails.lastName")}
        <input
          id="lastName"
          type="text"
          className="email-checkout__input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <label className="email-checkout__label" id="country">
        {t("payment.personalDetails.countryOfResidence")}
        <select
          id="country"
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
      <label className="email-checkout__label" id="nationality">
        {t("payment.personalDetails.nationality")}
        <select
          id="nationality"
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
        id="phoneNumber"
        className="email-checkout__label"
        style={{ flexDirection: "column" }}
      >
        <span style={{ whiteSpace: "nowrap" }}>
          {t("payment.personalDetails.phoneNumber")}
          <span
            id="phoneNumber"
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
            id="countryCode"
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
            id="phoneNumber"
            type="tel"
            className="email-checkout__input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={{ letterSpacing: "5px", width: "120px" }}
          />
        </div>
      </label>
    </div>
  );
}

export default InputFields;
