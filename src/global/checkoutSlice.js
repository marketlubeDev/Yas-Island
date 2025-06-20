import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startDate: "",
  endDate: "",
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
  cartItems: [{ id: 1, name: "Test Item" }],
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
  },
});

export const { setCheckout, setEmail, setCartItems } = checkoutSlice.actions;
export default checkoutSlice.reducer;
