import React from "react";
import { useTranslation } from "react-i18next";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const COUNTRIES = [
  { value: "UAE", label: "UAE" },
  { value: "IND", label: "India" },
  { value: "USA", label: "USA" },
  { value: "UK", label: "UK" },
];

const FormInput = ({ label, value, onChange, type = "text", className = "" }) => (
  <div className="form-group">
    <label className="form-group__label">{label}</label>
    <input
      type={type}
      className={`form-group__input ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const FormSelect = ({ label, value, onChange, options, className = "" }) => (
  <div className="form-group">
    <label className="form-group__label">{label}</label>
    <select
      className={`form-group__select ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const PhoneInputComponent = ({ label, phoneNumber, onPhoneNumberChange }) => (
  <div className="form-group">
    <label className="form-group__label">{label}</label>
    <PhoneInput
      country={'ae'}
      value={phoneNumber && phoneNumber.startsWith('971') ? phoneNumber : '971'}
      onChange={onPhoneNumberChange}
      inputClass="form-group__phone-input"
      containerClass="form-group__phone-container"
      buttonClass="form-group__phone-button"
      dropdownClass="form-group__phone-dropdown"
      enableSearch={true}
      disableSearchIcon={true}
      preferredCountries={['ae', 'in', 'us', 'gb']}
      containerStyle={{
        width: '100%'
      }}
      inputStyle={{
        width: '100%',
        height: 'auto',
        fontSize: '1rem',
        border: 'none',
        borderBottom: '1px solid var(--ip-bodr-btm)',
        borderRadius: '0',
        background: 'transparent',
        color: 'var(--color-base-text-secondary)',
        padding: '0.5rem 0',
        paddingLeft: '58px'
      }}
      buttonStyle={{
        border: 'none',
        borderBottom: '1px solid var(--ip-bodr-btm)',
        borderRadius: '0',
        background: 'transparent',
        height: 'auto',
        padding: '0.5rem 0'
      }}
    />
  </div>
);

export default function PersonalDetailsForm({ formData, setFormData }) {
  const { t } = useTranslation();

  const handleInputChange = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="payment-form__left">
      <div className="form-group-row">
        <FormInput
          label={t("payment.personalDetails.firstName")}
          value={formData.firstName}
          onChange={handleInputChange("firstName")}
        />
        <FormInput
          label={t("payment.personalDetails.lastName")}
          value={formData.lastName}
          onChange={handleInputChange("lastName")}
        />
      </div>

      <div className="form-group-row">
        <FormSelect
          label={t("payment.personalDetails.countryOfResidence")}
          value={formData.country}
          onChange={handleInputChange("country")}
          options={COUNTRIES.map(country => ({
            value: country.value,
            label: t(`payment.personalDetails.countries.${country.label}`)
          }))}
        />
        <FormSelect
          label={t("payment.personalDetails.nationality")}
          value={formData.nationality}
          onChange={handleInputChange("nationality")}
          options={COUNTRIES.map(country => ({
            value: country.value,
            label: t(`payment.personalDetails.nationalities.${country.label}`)
          }))}
        />
      </div>

      <div className="form-group-row">
        <FormInput
          label={t("payment.personalDetails.email")}
          value={formData.email}
          onChange={handleInputChange("email")}
          type="email"
        />
        <PhoneInputComponent
          label={t("payment.personalDetails.phoneNumber")}
          phoneNumber={formData.phoneNumber}
          onPhoneNumberChange={handleInputChange("phoneNumber")}
        />
      </div>
    </div>
  );
}
