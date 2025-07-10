import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  // Personal Details
  firstName: "",
  lastName: "", 
  country: "",
  nationality: "",
  emailId: "",
  phoneNumber: "",
  countryCode: "",

  // Cart Details
  coupons: [],
  items: [],
  netAmount: 0,
  taxAmount: 0,
  grossAmount: 0,
  
  // Language
  language: "",

  // Agreements
  isTnCAgrred: false,
  isConsentAgreed: false,

  // Additional Info
  promoCode: ""
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    // Set all checkout data
    setCheckout: (state, action) => {
      return { ...state, ...action.payload };
    },
    
    // Update personal details
    updatePersonalDetails: (state, action) => {
      const { firstName, lastName, country, nationality, emailId, phoneNumber } = action.payload;
      state.firstName = firstName || state.firstName;
      state.lastName = lastName || state.lastName;
      state.country = country || state.country;
      state.nationality = nationality || state.nationality;
      state.emailId = emailId || state.emailId;
      state.phoneNumber = phoneNumber || state.phoneNumber;
    },

    // Update cart details
    updateCartDetails: (state, action) => {
      const { items, amount, coupons } = action.payload;
      state.items = items || state.items;
      state.amount = amount || state.amount;
      state.coupons = coupons || state.coupons;
    },

    // Update agreements
    updateAgreements: (state, action) => {
      const { isTnCAgrred, isConsentAgreed } = action.payload;
      state.isTnCAgrred = isTnCAgrred;
      state.isConsentAgreed = isConsentAgreed;
    },

    // Set email
    setCheckoutEmail: (state, action) => {
      state.emailId = action.payload;
    },

    // Clear checkout
    clearCheckout: () => {
      return initialState;
    },
  },  
});

const persistConfig = {
  key: 'yasIslandCheckout',
  storage,
  whitelist: [
    'firstName', 'lastName', 'country', 'nationality', 'emailId', 
    'phoneNumber', 'countryCode', 'coupons', 'items', 'amount', 
    'language', 'isTnCAgrred', 'isConsentAgreed', 'promoCode' , 'netAmount' , 'taxAmount' , 'grossAmount'
  ]
};

export const { 
  setCheckout, 
  updatePersonalDetails, 
  updateCartDetails, 
  updateAgreements,
  setCheckoutEmail, 
  clearCheckout 
} = checkoutSlice.actions;

const persistedCheckoutReducer = persistReducer(persistConfig, checkoutSlice.reducer);
export default persistedCheckoutReducer;
