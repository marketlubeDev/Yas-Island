import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  qrCodeFromURL: null,
  isQRCodeInURL: false,
  qrValidationData: null,
  isQRValidating: false,
  isQRValidationError: false,
  qrCodeStatus: "idle", // 'idle', 'validating', 'valid', 'invalid'
  cartData: null,
  isCartLoading: false,
  cartError: null,
};

const qrCodeSlice = createSlice({
  name: "qrCode",
  initialState,
  reducers: {
    setQRCodeFromURL: (state, action) => {
      state.qrCodeFromURL = action.payload;
    },
    setIsQRCodeInURL: (state, action) => {
      state.isQRCodeInURL = action.payload;
    },
    setQRValidationData: (state, action) => {
      state.qrValidationData = action.payload;
    },
    setIsQRValidating: (state, action) => {
      state.isQRValidating = action.payload;
    },
    setIsQRValidationError: (state, action) => {
      state.isQRValidationError = action.payload;
    },
    setQRCodeStatus: (state, action) => {
      state.qrCodeStatus = action.payload;
    },
    setCartData: (state, action) => {
      state.cartData = action.payload;
    },
    setIsCartLoading: (state, action) => {
      state.isCartLoading = action.payload;
    },
    setCartError: (state, action) => {
      state.cartError = action.payload;
    },
    clearQRCode: (state) => {
      state.qrCodeFromURL = null;
      state.isQRCodeInURL = false;
      state.qrValidationData = null;
      state.isQRValidating = false;
      state.isQRValidationError = false;
      state.qrCodeStatus = "idle";
      state.cartData = null;
      state.isCartLoading = false;
      state.cartError = null;
    },
    // Combined action to set QR code and start validation
    initializeQRCode: (state, action) => {
      const { qrCode, isFromURL } = action.payload;
      state.qrCodeFromURL = qrCode;
      state.isQRCodeInURL = isFromURL;
      state.qrCodeStatus = "validating";
      state.isQRValidating = true;
    },
  },
});

export const {
  setQRCodeFromURL,
  setIsQRCodeInURL,
  setQRValidationData,
  setIsQRValidating,
  setIsQRValidationError,
  setQRCodeStatus,
  setCartData,
  setIsCartLoading,
  setCartError,
  clearQRCode,
  initializeQRCode,
} = qrCodeSlice.actions;

export default qrCodeSlice.reducer;
