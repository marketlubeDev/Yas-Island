import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  zoomLevel: 1,
  isDarkMode: false,
  isHighContrast: false,
};

const accessibilitySlice = createSlice({
  name: "accessibility",
  initialState,
  reducers: {
    setZoomLevel: (state, action) => {
      state.zoomLevel = action.payload;
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
    },
  },
});

export const { setZoomLevel, toggleDarkMode } = accessibilitySlice.actions;
export default accessibilitySlice.reducer;
