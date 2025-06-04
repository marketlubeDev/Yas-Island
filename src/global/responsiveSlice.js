import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobile: false,
  isTablet: false,
  isBigTablets: false,
  isDesktop: false,
  isBigDesktop: false,
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
};

const responsiveSlice = createSlice({
  name: "responsive",
  initialState,
  reducers: {
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setIsTablet: (state, action) => {
      state.isTablet = action.payload;
    },
    setIsBigTablets: (state, action) => {
      state.isBigTablets = action.payload;
    },
    setIsDesktop: (state, action) => {
      state.isDesktop = action.payload;
    },
    setIsBigDesktop: (state, action) => {
      state.isBigDesktop = action.payload;
    },
  },
});

export const {
  setIsMobile,
  setIsTablet,
  setIsBigTablets,
  setIsDesktop,
  setIsBigDesktop,
} = responsiveSlice.actions;

export default responsiveSlice.reducer;
