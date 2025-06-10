import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  zoomLevel: 1,
  isDarkMode: false,
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
      state.isDarkMode = !state.isDarkMode;

      state.backgroundColor = state.isDarkMode ? "#0B0C0C" : "#FFFFFF";
      state.textColor = state.isDarkMode ? "#FFFFFF" : "#000";
    },
  },
});

export const { setZoomLevel, toggleDarkMode } = accessibilitySlice.actions;
export default accessibilitySlice.reducer;
