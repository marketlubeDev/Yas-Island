import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import store from "./global/store";
import { loadTranslations } from "./utils/translationLoader";

// Get initial language from localStorage
const getInitialLanguage = () => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const persisted = window.localStorage.getItem(
        "persist:yasIslandLanguage"
      );
      if (persisted) {
        const parsed = JSON.parse(persisted);
        const storedLang = parsed?.currentLanguage
          ? JSON.parse(parsed.currentLanguage)
          : null;
        if (storedLang === "ar" || storedLang === "en") return storedLang;
      }
    }
  } catch (err) {
    // fallback to default
  }
  return "en";
};

const initialLanguage = getInitialLanguage();

// Initialize i18n
i18n.use(initReactI18next).init({
  resources: {},
  lng: initialLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

// Simple function to load translations
async function loadLanguage(language) {
  try {
    const translations = await loadTranslations(language);
    i18n.addResourceBundle(language, "translation", translations, true, true);
    return translations;
  } catch (error) {
    console.error(`Error loading ${language} translations:`, error);
    return null;
  }
}

// Export a promise that resolves when initial translations are loaded
export const translationsReady = (async () => {
  try {
    await loadLanguage(initialLanguage);
    if (i18n.language !== initialLanguage) {
      await i18n.changeLanguage(initialLanguage);
    }
    return true;
  } catch (error) {
    console.error("Failed to load initial translations:", error);
    return false;
  }
})();

// Update document direction
try {
  if (typeof document !== "undefined") {
    document.documentElement.dir = initialLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = initialLanguage;
  }
} catch {}

// Handle language changes from Redux store
store.subscribe(async () => {
  const currentLanguage = store.getState().language.currentLanguage;
  if (i18n.language !== currentLanguage) {
    // Load translation if not already loaded
    if (!i18n.hasResourceBundle(currentLanguage, "translation")) {
      await loadLanguage(currentLanguage);
    }

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
