import React, { createContext, useState, useContext } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("English");

  const toggleLanguage = (newLang) => {
    setLanguage(newLang);
    // Set the HTML dir attribute for RTL support
    document.documentElement.dir = newLang === "العربية" ? "rtl" : "ltr";
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
