import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSmallPhone: false, // max-width: 575.98px
  isPhone: false, // 576px - 767.98px
  isTablets: false, // 768px - 991.98px
  isBigTablets: false, // 992px - 1199.98px
  isDesktop: false, // 1200px - 1399.98px
  isBigDesktop: false, // 1400px - 1699.98px
  isExtraBigDesktop: false, // 1700px and above
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
};

const responsiveSlice = createSlice({
  name: "responsive",
  initialState,
  reducers: {
    setIsSmallPhone: (state, action) => {
      state.isSmallPhone = action.payload;
    },
    setIsPhone: (state, action) => {
      state.isPhone = action.payload;
    },
    setIsTablets: (state, action) => {
      state.isTablets = action.payload;
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
    setIsExtraBigDesktop: (state, action) => {
      state.isExtraBigDesktop = action.payload;
    },
  },
});

export const {
  setIsSmallPhone,
  setIsPhone,
  setIsTablets,
  setIsBigTablets,
  setIsDesktop,
  setIsBigDesktop,
  setIsExtraBigDesktop,
} = responsiveSlice.actions;

export default responsiveSlice.reducer;
