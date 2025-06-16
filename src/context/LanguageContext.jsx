import React, { createContext, useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("English");
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Set initial language from localStorage or default to English
    const savedLanguage = localStorage.getItem("language") || "English";
    setLanguage(savedLanguage);
    setIsRTL(savedLanguage === "العربية");

    // Set document direction
    document.documentElement.dir = savedLanguage === "العربية" ? "rtl" : "ltr";
    document.documentElement.lang = savedLanguage === "العربية" ? "ar" : "en";
  }, []);

  const toggleLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    setIsRTL(newLanguage === "العربية");

    // Update i18n language
    i18n.changeLanguage(newLanguage === "العربية" ? "ar" : "en");

    // Update document direction
    document.documentElement.dir = newLanguage === "العربية" ? "rtl" : "ltr";
    document.documentElement.lang = newLanguage === "العربية" ? "ar" : "en";

    // Save to localStorage
    localStorage.setItem("language", newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
