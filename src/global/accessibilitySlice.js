import { createSlice } from "@reduxjs/toolkit";

const loadAccessibilityFromStorage = () => {
  try {
    const savedAccessibility = localStorage.getItem('yasIslandAccessibility');
    if (savedAccessibility) {
      return JSON.parse(savedAccessibility);
    }
  } catch (error) {
    console.error('Error loading accessibility settings from localStorage:', error);
  }
  return {
    zoomLevel: 1,
    isDarkMode: false,
    isHighContrast: false,
  };
};

const saveAccessibilityToStorage = (state) => {
  try {
    localStorage.setItem('yasIslandAccessibility', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving accessibility settings to localStorage:', error);
  }
};

const initialState = loadAccessibilityFromStorage();

const accessibilitySlice = createSlice({
  name: "accessibility",
  initialState,
  reducers: {
    setZoomLevel: (state, action) => {
      state.zoomLevel = action.payload;
      saveAccessibilityToStorage(state);
    },
    toggleDarkMode: (state) => {
      if (!state.isDarkMode && !state.isHighContrast) {
        // First click: Enable dark mode
        state.isDarkMode = true;
        state.isHighContrast = false;
      } else if (state.isDarkMode && !state.isHighContrast) {
        // Second click: Enable high contrast
        state.isDarkMode = false;
        state.isHighContrast = true;
      } else {
        // Third click or any other state: Return to normal
        state.isDarkMode = false;
        state.isHighContrast = false;
      }
      saveAccessibilityToStorage(state);
    },
  },
});

export const { setZoomLevel, toggleDarkMode } = accessibilitySlice.actions;
export default accessibilitySlice.reducer;
