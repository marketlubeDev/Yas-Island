import React, { useState, useEffect, useMemo } from "react";
import { truncateText } from "../../../utils/helpers";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import countries from "i18n-iso-countries";
import ReactCountryFlag from "react-country-flag";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setCheckoutEmail,
  updatePersonalDetails,
} from "../../../global/checkoutSlice";

// Import language files
import enCountries from "i18n-iso-countries/langs/en.json";
import arCountries from "i18n-iso-countries/langs/ar.json";

// Register languages for country names
countries.registerLocale(enCountries);
countries.registerLocale(arCountries);

const FormInput = ({
  label,
  value,
  onChange,
  type = "text",
  className = "",
  button = null,
  isRTL = false,
  hasError = false,
  placeholder = "",
  onFocus,
}) => (
  <label
    className="email-checkout__label"
    id={label.toLowerCase().replace(/\s+/g, "")}
  >
    {label}
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type={type}
        className={`email-checkout__input ${
          hasError ? "error" : ""
        } ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        style={{
          width: "100%",
          paddingRight: !isRTL && button ? "28px" : undefined,
          paddingLeft: isRTL && button ? "28px" : undefined,
        }}
        placeholder={hasError ? placeholder : ""}
      />
      {button && (
        <div
          style={{
            position: "absolute",
            [isRTL ? "left" : "right"]: 0,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          {button}
        </div>
      )}
    </div>
  </label>
);

const FormSelectWithSearch = ({
  label,
  value,
  onChange,
  options,
  hasError = false,
  onClearError,
  isOpen,
  onOpenChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();
  const selectedOption =
    value && value !== ""
      ? options.find((option) => option.value === value)
      : null;

  const handleSelect = (option) => {
    onChange(option.value);
    onOpenChange(false);
  };

  const filteredOptions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return options;
    return options.filter((option) => {
      return (
        option.label.toLowerCase().includes(query) ||
        String(option.value).toLowerCase().includes(query) ||
        String(option.code).toLowerCase().includes(query)
      );
    });
  }, [options, searchTerm]);

  // Reset search term when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
    }
  }, [isOpen]);

  // Handle clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const dropdownElement = document.getElementById(
        label.toLowerCase().replace(/\s+/g, "")
      );
      if (dropdownElement && !dropdownElement.contains(e.target)) {
        onOpenChange(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, label, onOpenChange]);

  return (
    <label
      className="email-checkout__label"
      id={label.toLowerCase().replace(/\s+/g, "")}
    >
      {label}
      <div className="custom-select-container" style={{ position: "relative" }}>
        <div
          className="custom-select-control"
          style={{
            border: "none",
            borderBottom: hasError
              ? "2px solid var(--color-error-text, #ff4d4f)"
              : "1px solid var(--ip-bodr-btm)",
            borderRadius: "0",
            backgroundColor: "transparent",
            minHeight: "40px",
            height: "40px",
            padding: "0",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            color: "var(--color-email-form-label)",
          }}
          onClick={() => {
            onOpenChange(!isOpen);
            if (onClearError) onClearError();
          }}
        >
          {selectedOption ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                overflow: "hidden",
                flex: 1,
              }}
            >
              <ReactCountryFlag
                countryCode={selectedOption.code}
                svg
                style={{ width: "20px", height: "15px", flexShrink: 0 }}
              />
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  lineHeight: "1.2",
                  fontSize: "calc(14px * var(--zoom-scale))",
                  color: "var(--color-email-form-label)",
                }}
              >
                {truncateText(selectedOption.label, 20)}
              </span>
            </div>
          ) : (
            <span
              style={{ color: "var(--color-base-text-secondary)", opacity: 1 }}
            >
              {typeof t === "function"
                ? t("payment.selectCountry", {
                    defaultValue: "Select a country",
                  })
                : "Select a country"}
            </span>
          )}
          <div
            style={{
              color: "var(--color-base-text-secondary)",
              padding: "0 8px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          >
            ▼
          </div>
        </div>

        {isOpen && (
          <div
            className="custom-select-menu"
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "var(--color-base-bg)",
              border: "1px solid var(--ip-bodr-btm)",
              borderRadius: "4px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              zIndex: 9999,
              maxHeight: "260px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "8px 8px 4px 8px",
                borderBottom: "1px solid var(--ip-bodr-btm)",
                backgroundColor: "var(--color-base-bg)",
                position: "sticky",
                top: 0,
                zIndex: 1,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
                placeholder={
                  typeof t === "function"
                    ? t("payment.searchCountries", {
                        defaultValue: "Search countries...",
                      })
                    : "Search countries..."
                }
                style={{
                  width: "100%",
                  height: "36px",
                  padding: "0 10px",
                  border: "1px solid var(--ip-bodr-btm)",
                  borderRadius: "4px",
                  backgroundColor: "transparent",
                  color: "var(--color-email-form-label)",
                }}
              />
            </div>
            <div style={{ maxHeight: "220px", overflowY: "auto" }}>
              {filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className="custom-select-option"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 12px",
                    cursor: "pointer",
                    backgroundColor:
                      option.value === value
                        ? "var(--color-base-hover)"
                        : "transparent",
                    color: "var(--color-email-form-label)",
                  }}
                  onClick={() => {
                    handleSelect(option);
                    if (onClearError) onClearError();
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-base-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      option.value === value
                        ? "var(--color-base-hover)"
                        : "transparent";
                  }}
                >
                  <ReactCountryFlag
                    countryCode={option.code}
                    svg
                    style={{ width: "20px", height: "15px" }}
                  />
                  <span style={{ color: "var(--color-email-form-label)" }}>
                    {truncateText(option.label, 20)}
                  </span>
                </div>
              ))}
              {filteredOptions.length === 0 && (
                <div
                  style={{
                    padding: "10px 12px",
                    color: "var(--color-base-text-secondary)",
                  }}
                >
                  {(t && t("common.noResults")) ||
                    t("payment.noResults", { defaultValue: "No results" }) ||
                    "No results"}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </label>
  );
};

const PhoneInputComponent = ({
  label,
  phoneNumber,
  onPhoneNumberChange,
  hasError = false,
  countryIso = "ae",
  isRTL = false,
  onFocus,
  localization,
  searchPlaceholder,
}) => (
  <label className="email-checkout__label" id="phoneNumber">
    {label}
    <PhoneInput
      country={countryIso || "ae"}
      value={phoneNumber || ""}
      onChange={onPhoneNumberChange}
      inputClass={`email-checkout__phone-input${hasError ? " error" : ""}`}
      containerClass="email-checkout__phone-container"
      buttonClass="email-checkout__phone-button"
      dropdownClass="email-checkout__phone-dropdown"
      localization={localization}
      enableSearch={true}
      searchPlaceholder={searchPlaceholder}
      disableDropdown={false}
      countryCodeEditable={true}
      inputProps={{ onFocus }}
      containerStyle={{
        width: "100%",
      }}
      inputStyle={{
        width: "100%",
        height: "40px",
        fontSize: "calc(1rem * var(--zoom-scale))",
        border: "none",
        borderBottom: "1px solid var(--ip-bodr-btm)",
        borderRadius: "0",
        background: "transparent",
        color: "var(--color-base-text-secondary)",
        padding: "8px 0",
        paddingLeft: isRTL ? "8px" : "44px",
        paddingRight: isRTL ? "42px" : "8px",
        direction: "ltr",
        textAlign: isRTL ? "right" : "left",
      }}
      buttonStyle={{
        border: "none",
        borderBottom: "1px solid var(--ip-bodr-btm)",
        borderRadius: "0",
        background: "transparent",
        height: "40px",
        padding: "8px 2px",
        width: "36px",
        position: isRTL ? "absolute" : undefined,
        right: isRTL ? 0 : undefined,
      }}
    />
  </label>
);

function InputFieldsMbl() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get data from Redux state
  const checkout = useSelector((state) => state.checkout);
  const { verificationEmail: email } = useSelector((state) => state.cart);
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

  // Generate countries list based on current language
  const COUNTRIES = useMemo(() => {
    const countryCodes = countries.getAlpha2Codes();
    return Object.keys(countryCodes)
      .map((code) => ({
        value: code,
        label: countries.getName(code, currentLanguage === "ar" ? "ar" : "en"),
        code: code.toLowerCase(),
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [currentLanguage]);

  // Localize country names in phone dropdown for Arabic using react-phone-input-2 `localization`
  const PHONE_LOCALIZATION = useMemo(() => {
    if (currentLanguage !== "ar") return undefined;
    const alpha2 = countries.getAlpha2Codes();
    const map = {};
    Object.keys(alpha2).forEach((code) => {
      const nameAr = countries.getName(code, "ar");
      if (nameAr) {
        map[code.toLowerCase()] = nameAr;
      }
    });
    return map;
  }, [currentLanguage]);

  // Initialize form data from Redux state
  const [formData, setFormData] = useState({
    firstName: checkout.firstName || "",
    lastName: checkout.lastName || "",
    email: checkout.emailId || "",
    country: checkout.country || "AE",
    nationality: checkout.nationality || "AE",
    phoneNumber: checkout.phoneNumber || "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    country: false,
    nationality: false,
  });

  // State to manage which dropdown is open
  const [openDropdown, setOpenDropdown] = useState(null);

  const validateFieldsForPlaceholders = () => {
    const next = {
      firstName: !formData.firstName || formData.firstName.trim().length < 2,
      lastName: !formData.lastName || formData.lastName.trim().length < 1,
      email:
        !formData.email || !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      phoneNumber:
        String((formData.phoneNumber || "").replace(/\D/g, "")).length < 10,
      country: !formData.country,
      nationality: !formData.nationality,
    };
    setFieldErrors(next);
    return next;
  };

  // Normalize ISO for react-phone-input-2 to avoid missing dial code mappings
  const normalizeIsoForDialCode = (iso) => {
    const m = {
      ax: "fi",
      gg: "gb",
      je: "gb",
      im: "gb",
      sj: "no",
      bq: "nl",
      gf: "fr",
      gp: "fr",
      mq: "fr",
      yt: "fr",
      re: "fr",
      pm: "fr",
      bl: "fr",
      mf: "fr",
      fo: "dk",
      gi: "gb",
    };
    return m[iso] || iso || "ae";
  };

  const handleInputChange = (field) => (value) => {
    const updatedFormData = { ...formData, [field]: value };

    // When country of residence changes, clear phone so new dial code shows
    if (field === "country") {
      updatedFormData.phoneNumber = "";
    }
    setFormData(updatedFormData);

    // Update Redux state
    dispatch(
      updatePersonalDetails({
        firstName: updatedFormData.firstName,
        lastName: updatedFormData.lastName,
        country: updatedFormData.country,
        nationality: updatedFormData.nationality,
        emailId: updatedFormData.email,
        phoneNumber: updatedFormData.phoneNumber,
      })
    );

    // Clear error for this field on interaction
    setFieldErrors((prev) => ({ ...prev, [field]: false }));
  };

  // Set email from Redux state if available
  useEffect(() => {
    if (email) {
      const updatedFormData = { ...formData, email };
      setFormData(updatedFormData);
      dispatch(setCheckoutEmail(email));
      dispatch(
        updatePersonalDetails({
          ...checkout,
          emailId: email,
        })
      );
    }
  }, [email, dispatch]);

  // Sync with Redux state changes
  useEffect(() => {
    setFormData({
      firstName: checkout.firstName || "",
      lastName: checkout.lastName || "",
      email: checkout.emailId || "",
      country: checkout.country || "AE",
      nationality: checkout.nationality || "",
      phoneNumber: checkout.phoneNumber || "",
    });
  }, [checkout]);

  // Ensure default country is UAE if missing (first-time visitors)
  useEffect(() => {
    if (!checkout.country || String(checkout.country).trim() === "") {
      dispatch(updatePersonalDetails({ country: "AE" }));
    }
  }, [checkout.country, dispatch]);

  const isRTL = i18n.language === "ar";

  useEffect(() => {
    const showErrors = () => {
      // compute errors and set to show red placeholders
      const next = {
        firstName: !formData.firstName || formData.firstName.trim().length < 2,
        lastName: !formData.lastName || formData.lastName.trim().length < 1,
        email:
          !formData.email ||
          !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        phoneNumber:
          String((formData.phoneNumber || "").replace(/\D/g, "")).length < 10,
        country: !formData.country,
        nationality: !formData.nationality,
      };
      setFieldErrors(next);
    };
    window.addEventListener("paymentForm:showFieldErrors", showErrors);
    return () =>
      window.removeEventListener("paymentForm:showFieldErrors", showErrors);
  }, [formData]);

  return (
    <div className="email-checkout__form-container-inner">
      <FormInput
        label={t("payment.personalDetails.firstName")}
        value={formData.firstName}
        onChange={handleInputChange("firstName")}
        hasError={fieldErrors.firstName}
        placeholder={t("payment.personalDetails.firstName")}
        onFocus={() =>
          setFieldErrors((prev) => ({ ...prev, firstName: false }))
        }
      />
      <FormInput
        label={t("payment.personalDetails.lastName")}
        value={formData.lastName}
        onChange={handleInputChange("lastName")}
        hasError={fieldErrors.lastName}
        placeholder={t("payment.personalDetails.lastName")}
        onFocus={() => setFieldErrors((prev) => ({ ...prev, lastName: false }))}
      />
      <FormInput
        label={t("payment.personalDetails.email")}
        value={formData.email}
        onChange={handleInputChange("email")}
        type="email"
        hasError={fieldErrors.email}
        placeholder={t("payment.personalDetails.email")}
        onFocus={() => setFieldErrors((prev) => ({ ...prev, email: false }))}
        button={
          <button
            type="button"
            onClick={() => navigate("/email-verification")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "5px",
              display: "flex",
              alignItems: "center",
              marginLeft: isRTL ? "5px" : "0",
              marginRight: isRTL ? "0" : "5px",
              marginBottom: "5px",
              order: isRTL ? -1 : 1,
            }}
          >
            <FaEdit size={18} color="#666" />
          </button>
        }
        isRTL={isRTL}
      />
      <FormSelectWithSearch
        label={t("payment.personalDetails.countryOfResidence")}
        value={formData.country}
        onChange={handleInputChange("country")}
        options={COUNTRIES}
        hasError={fieldErrors.country}
        onClearError={() =>
          setFieldErrors((prev) => ({ ...prev, country: false }))
        }
        isOpen={openDropdown === "country"}
        onOpenChange={(open) => setOpenDropdown(open ? "country" : null)}
      />
      <FormSelectWithSearch
        label={t("payment.personalDetails.nationality")}
        value={formData.nationality}
        onChange={handleInputChange("nationality")}
        options={COUNTRIES}
        hasError={fieldErrors.nationality}
        onClearError={() =>
          setFieldErrors((prev) => ({ ...prev, nationality: false }))
        }
        isOpen={openDropdown === "nationality"}
        onOpenChange={(open) => setOpenDropdown(open ? "nationality" : null)}
      />

      {(() => {
        const selectedIso = normalizeIsoForDialCode(
          (formData.country || "AE").toLowerCase()
        );
        return (
          <PhoneInputComponent
            key={`${selectedIso}-${currentLanguage}`}
            label={t("payment.personalDetails.phoneNumber")}
            phoneNumber={formData.phoneNumber}
            onPhoneNumberChange={handleInputChange("phoneNumber")}
            hasError={fieldErrors.phoneNumber}
            countryIso={selectedIso}
            isRTL={isRTL}
            localization={PHONE_LOCALIZATION}
            searchPlaceholder={
              typeof t === "function"
                ? t("payment.searchCountries", {
                    defaultValue: "Search countries...",
                  })
                : "Search countries..."
            }
            onFocus={() =>
              setFieldErrors((prev) => ({ ...prev, phoneNumber: false }))
            }
          />
        );
      })()}
    </div>
  );
}

export default InputFieldsMbl;
