import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  zoomLevel: 1,
  isDarkMode: false,
  isHighContrast: false,
  backgroundColor: "#FFFFFF",
  textColor: "#000",
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
        state.backgroundColor = "#0B0C0C";
        state.textColor = "#FFFFFF";
      } else if (state.isDarkMode && !state.isHighContrast) {
        // Second click: Enable high contrast
        state.isDarkMode = false;
        state.isHighContrast = true;
        state.backgroundColor = "#000000";
        state.textColor = "#FFFF00";
      } else {
        // Third click: Return to normal
        state.isDarkMode = false;
        state.isHighContrast = false;
        state.backgroundColor = "#FFFFFF";
        state.textColor = "#000";
      }
    },
  },
});

export const { setZoomLevel, toggleDarkMode } = accessibilitySlice.actions;
export default accessibilitySlice.reducer;
