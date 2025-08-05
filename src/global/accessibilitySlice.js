import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  zoomLevel: 1,
  isDarkMode: false,
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
    },
    setColorMode: (state, action) => {
      const mode = action.payload;
      if (mode === "normal") {
        state.isDarkMode = false;
      } else if (mode === "invert") {
        state.isDarkMode = true;
      }
    },
  },
});

export const { setZoomLevel, toggleDarkMode, setColorMode } =
  accessibilitySlice.actions;
export default accessibilitySlice.reducer;
