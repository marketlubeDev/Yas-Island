import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  zoomLevel: 1,
};

const accessibilitySlice = createSlice({
  name: "accessibility",
  initialState,
  reducers: {
    setZoomLevel: (state, action) => {
      state.zoomLevel = action.payload;
    },
  },
});

export const { setZoomLevel } = accessibilitySlice.actions;
export default accessibilitySlice.reducer;
