import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import store from "./global/store";

// Import translations
import { en } from "./translations/en";
import { ar } from "./translations/ar";

// Determine initial language synchronously from persisted storage (avoids English flash)
const getInitialLanguage = () => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const persisted = window.localStorage.getItem(
        "persist:yasIslandLanguage"
      );
      if (persisted) {
        const parsed = JSON.parse(persisted);
        // redux-persist stores each field as a JSON string
        const storedLang = parsed?.currentLanguage
          ? JSON.parse(parsed.currentLanguage)
          : null;
        if (storedLang === "ar" || storedLang === "en") return storedLang;
      }
    }
  } catch (err) {
    // no-op; fallback to default
  }
  return "en";
};

const initialLanguage = getInitialLanguage();

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ar: {
      translation: ar,
    },
  },
  lng: initialLanguage, // default language from persisted state
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// Update document direction immediately based on initial language
try {
  if (typeof document !== "undefined") {
    document.documentElement.dir = initialLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = initialLanguage;
  }
} catch {}

// Subscribe to Redux store changes
store.subscribe(() => {
  const currentLanguage = store.getState().language.currentLanguage;
  if (i18n.language !== currentLanguage) {
    i18n.changeLanguage(currentLanguage);
    try {
      if (typeof document !== "undefined") {
        document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = currentLanguage;
      }
    } catch {}
  }
});

export default i18n;
