import { createSlice } from "@reduxjs/toolkit";

const loadLanguageFromStorage = () => {
  try {
    const savedLanguage = localStorage.getItem('yasIslandLanguage');
    if (savedLanguage) {
      return {
        currentLanguage: savedLanguage
      };
    }
  } catch (error) {
    console.error('Error loading language from localStorage:', error);
  }
  return {
    currentLanguage: "en",
  };
};

const saveLanguageToStorage = (language) => {
  try {
    localStorage.setItem('yasIslandLanguage', language);
  } catch (error) {
    console.error('Error saving language to localStorage:', error);
  }
};

const initialState = loadLanguageFromStorage();

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
      saveLanguageToStorage(action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
