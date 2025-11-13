import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  OTP: "",
  metadata: "",
};

const otpSlice = createSlice({
  name: "OTPData",
  initialState,
  reducers: {
    setOtp: (state, action) => {
      state.email = action.payload.email;
      state.OTP = action.payload.OTP;
      state.metadata = action.payload.metadata || "";
    },
    clearOtp: (state) => {
      state.email = "";
      state.OTP = "";
      state.metadata = "";
    },
  },
});

export const { setOtp, clearOtp } = otpSlice.actions;
export default otpSlice.reducer;
