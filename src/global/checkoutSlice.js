import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

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
  isConsentAgreed: false
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckout: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearCheckout: (state) => {
      return initialState;
    },
    setCheckoutEmail: (state, action) => {
      state.emailId = action.payload;
    },
  },  
});

const persistConfig = {
  key: 'yasIslandCheckout',
  storage,
  whitelist: ['coupons', 'items', 'emailId', 'language', 'amount', 'firstName', 'lastName', 'phoneNumber', 'countryCode', 'isTnCAgrred', 'isConsentAgreed'] // persist all fields
};

export const { setCheckout, setCheckoutEmail, clearCheckout } = checkoutSlice.actions;

const persistedCheckoutReducer = persistReducer(persistConfig, checkoutSlice.reducer);
export default persistedCheckoutReducer;
