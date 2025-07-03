import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coupons: [],
  items: [],
  emailId: "",
  language: "",
  amount: 0,
  firstName: "",
  lastName: "", 
  phoneNumber: "",
  countryCode: "",
  isTnCAgrred: false,
  isConsentAgreed: false,
  
};


const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckout: (state, action) => {
      state.checkout = action.payload;
    },
    clearCheckout: (state) => {
      state.checkout = initialState;
    },
    setCheckoutEmail: (state, action) => {
      state.checkout.emailId = action.payload;
    },
  },  
});

export const { setCheckout, setCheckoutEmail, clearCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
