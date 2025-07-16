// Utility function to translate sort values between languages
export const translateSortValue = (currentSort) => {
  const sortMappings = {
    // English to Arabic
    "Price (High to Low)": "السعر (من الأعلى إلى الأقل)",
    "Price (Low to High)": "السعر (من الأقل إلى الأعلى)",

    // Arabic to English
    "السعر (من الأعلى إلى الأقل)": "Price (High to Low)",
    "السعر (من الأقل إلى الأعلى)": "Price (Low to High)",
  };

  // If we have a mapping for the current sort value, return the translated version
  if (sortMappings[currentSort]) {
    return sortMappings[currentSort];
  }

  // If no mapping found, return the original value
  return currentSort;
};

// Function to get the appropriate sort value for a given language
export const getSortValueForLanguage = (currentSort, targetLanguage) => {
  if (!currentSort) return "";

  // If the current sort value is already in the target language, return it as is
  if (targetLanguage === "en") {
    if (
      currentSort === "Price (High to Low)" ||
      currentSort === "Price (Low to High)"
    ) {
      return currentSort;
    }
  } else if (targetLanguage === "ar") {
    if (
      currentSort === "السعر (من الأعلى إلى الأقل)" ||
      currentSort === "السعر (من الأقل إلى الأعلى)"
    ) {
      return currentSort;
    }
  }

  // Otherwise, translate it
  return translateSortValue(currentSort, targetLanguage);
};
