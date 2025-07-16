// Utility function to translate park names between languages
export const translateParkName = (currentPark) => {
  const parkMappings = {
    // English to Arabic
    "Ferrari World Yas Island": "فيراري وورلد ياس آيلاند",
    "Ferrari World": "فيراري وورلد",
    "Warner Bros. World": "وارنر برذرز وورلد",
    "Warner Bros": "وارنر برذرز",
    "Seaworld Yas Island": "سي وورلد ياس آيلاند",
    Seaworld: "سي وورلد",
    "Yas Waterworld": "ياس ووتروورلد",
    "Yas Island Theme Parks": "حدائق ياس آيلاند",
    "Theme Parks": "الحدائق",

    // Arabic to English
    "فيراري وورلد ياس آيلاند": "Ferrari World Yas Island",
    "فيراري وورلد": "Ferrari World",
    "وارنر برذرز وورلد": "Warner Bros. World",
    "وارنر برذرز": "Warner Bros",
    "سي وورلد ياس آيلاند": "Seaworld Yas Island",
    "سي وورلد": "Seaworld",
    "ياس ووتروورلد": "Yas Waterworld",
    "حدائق ياس آيلاند": "Yas Island Theme Parks",
    الحدائق: "Theme Parks",
  };

  // If we have a mapping for the current park name, return the translated version
  if (parkMappings[currentPark]) {
    return parkMappings[currentPark];
  }

  // If no mapping found, return the original value
  return currentPark;
};

// Function to get the appropriate park name for a given language
export const getParkNameForLanguage = (currentPark, targetLanguage) => {
  if (!currentPark) return "";

  // If the current park name is already in the target language, return it as is
  if (targetLanguage === "en") {
    // Check if it's already in English (basic check for English characters)
    if (/[a-zA-Z]/.test(currentPark)) {
      return currentPark;
    }
  } else if (targetLanguage === "ar") {
    // Check if it's already in Arabic (basic check for Arabic characters)
    if (/[\u0600-\u06FF]/.test(currentPark)) {
      return currentPark;
    }
  }

  // Otherwise, translate it
  return translateParkName(currentPark);
};
