import React, { createContext, useState, useContext } from "react";
import i18n from "../i18n";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("English");

  const toggleLanguage = (newLang) => {
    setLanguage(newLang);
    // REMOVE or COMMENT OUT the next line to keep direction always LTR
    // document.documentElement.dir = newLang === "العربية" ? "rtl" : "ltr";
    // Switch i18n language as well
    if (newLang === "العربية") {
      i18n.changeLanguage("ar");
    } else {
      i18n.changeLanguage("en");
    }
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
