const discoverAvailableLanguages = async () => {
  try {
    // First, try to load the manifest file
    const manifestResponse = await fetch("/translations/manifest.json");
    if (manifestResponse.ok) {
      const manifest = await manifestResponse.json();
      const languageCodes = manifest.availableTranslations
        .map((filename) => filename.replace(".json", ""))
        .filter((code) => code && code.length > 0);

      if (languageCodes.length > 0) {
        console.log("Languages discovered from manifest:", languageCodes);
        return languageCodes;
      }
    }

    // Fallback: Try common language codes if manifest doesn't exist
    console.warn("Manifest not found, falling back to discovery method");
    const commonLanguageCodes = ["en", "ar"];
    const availableLanguages = [];

    // Test each potential language file
    for (const langCode of commonLanguageCodes) {
      try {
        const response = await fetch(`/translations/${langCode}.json`);
        if (response.ok) {
          availableLanguages.push(langCode);
        }
      } catch (error) {
        continue;
      }
    }

    // If no languages found, fallback to default
    return availableLanguages.length > 0 ? availableLanguages : ["en", "ar"];
  } catch (error) {
    console.warn("Failed to discover languages, using fallback:", error);
    return ["en", "ar"];
  }
};

export const getAvailableLanguages = async () => {
  try {
    const discoveredFiles = await discoverAvailableLanguages();

    const languages = await Promise.all(
      discoveredFiles.map(async (fileCode) => {
        try {
          const response = await fetch(`/translations/${fileCode}.json`);
          if (!response.ok) {
            throw new Error(`Failed to load ${fileCode}.json`);
          }
          const data = await response.json();

          const actualLanguageCode = data.config?.languageCode || fileCode;
          const languageName =
            data.config?.name?.trim() ||
            getFallbackLanguageName(actualLanguageCode);
          const languageDirection =
            data.config?.direction ||
            getFallbackLanguageDirection(actualLanguageCode);

          return {
            code: actualLanguageCode,
            name: languageName,
            direction: languageDirection,
          };
        } catch (error) {
          console.warn(`Failed to load language file ${fileCode}.json:`, error);

          return {
            code: fileCode,
            name: getFallbackLanguageName(fileCode),
            direction: getFallbackLanguageDirection(fileCode),
          };
        }
      })
    );

    const validLanguages = languages.filter(Boolean);

    const uniqueLanguages = validLanguages.reduce((acc, lang) => {
      if (!acc.find((existing) => existing.code === lang.code)) {
        acc.push(lang);
      }
      return acc;
    }, []);

    console.log("Final available languages:", uniqueLanguages);
    return uniqueLanguages;
  } catch (error) {
    console.error("Error loading available languages:", error);
    // Fallback to default languages
    return [
      { code: "en", name: "English", direction: "ltr" },
      { code: "ar", name: "العربية", direction: "rtl" },
    ];
  }
};

const getFallbackLanguageName = (langCode) => {
  const fallbackNames = {
    en: "English",
    ar: "العربية",
  };
  return fallbackNames[langCode] || langCode.toUpperCase();
};

const getFallbackLanguageDirection = (langCode) => {
  const rtlLanguages = ["ar", "he", "fa", "ur"];
  return rtlLanguages.includes(langCode) ? "rtl" : "ltr";
};

export const getLanguageDisplayName = (langCode, availableLanguages) => {
  const language = availableLanguages.find((lang) => lang.code === langCode);
  return language ? language.name : langCode.toUpperCase();
};

export const getLanguageDirection = (langCode, availableLanguages) => {
  const language = availableLanguages.find((lang) => lang.code === langCode);
  return language ? language.direction : "ltr";
};

export const codeToDisplayName = (langCode, availableLanguages) => {
  return getLanguageDisplayName(langCode, availableLanguages);
};

export const displayNameToCode = (displayName, availableLanguages) => {
  const language = availableLanguages.find((lang) => lang.name === displayName);
  return language ? language.code : "en";
};
