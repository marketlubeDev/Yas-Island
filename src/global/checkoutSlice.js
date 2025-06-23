import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDate: "",
  guests: {},
  totalPrice: 0,
  product: null,
  productVariant: null,
  email: "",
  firstName: "",
  lastName: "",
  residence: "",
  nationality: "",
  phone: "",
  cartItems: [],
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
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setCheckoutDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setCheckout, setEmail, setCartItems, setCheckoutDate } = checkoutSlice.actions;
export default checkoutSlice.reducer;
