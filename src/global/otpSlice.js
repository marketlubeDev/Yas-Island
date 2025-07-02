import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    OTP: "",
};

const otpSlice = createSlice({
    name: "OTPData",
    initialState,
    reducers: {
        setOtp: (state, action) => {
            state.email = action.payload.email;
            state.OTP = action.payload.OTP;
        },     
        clearOtp: (state) => {
            state.email = "";
            state.OTP = "";
        },
    },
});

export const { setOtp, clearOtp } = otpSlice.actions;
export default otpSlice.reducer;