import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  subtotal: 0,
  vatAndTax: 0,
  total: 0,
  isCartOpen: false,
  isEmailVerification: false,
  verificationEmail: "",
};

const calculateCartTotals = (items) => {
  const subtotal = items.reduce((total, item) => total + (item?.price?.net * (item.quantity || 1)), 0);
  const vatAndTax = items.reduce((taxTotal, item) => taxTotal + (item?.price?.tax * (item.quantity || 1)), 0);
  const total = subtotal + vatAndTax;
  
  return {
    subtotal,
    vatAndTax,
    total
  };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.productId === action.payload.productId && item.validFrom === action.payload.validFrom 
      );
      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity = (state.cartItems[existingItemIndex].quantity || 1) + (action.payload.quantity || 1);
      } else {
        state.cartItems.push({ ...action.payload });
      }
      const totals = calculateCartTotals(state.cartItems);
      state.subtotal = totals.subtotal;
      state.vatAndTax = totals.vatAndTax;
      state.total = totals.total;
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      const totals = calculateCartTotals(state.cartItems);
      state.subtotal = totals.subtotal;
      state.vatAndTax = totals.vatAndTax;
      state.total = totals.total;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.subtotal = 0;
      state.vatAndTax = 0;
      state.total = 0;
    },
    setIsCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },
    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => !(item.productId === action.payload.id && item.validFrom === action.payload.validFrom)
      );
      const totals = calculateCartTotals(state.cartItems);
      state.subtotal = totals.subtotal;
      state.vatAndTax = totals.vatAndTax;
      state.total = totals.total;
    },
    updateQuantity: (state, action) => {
      state.cartItems = state.cartItems
        .map((item) =>
          (item.productId === action.payload.id && item.validFrom === action.payload.validFrom) 
            ? { ...item, quantity: action.payload.quantity } 
            : item
        )
        .filter(item => item.quantity > 0);
      const totals = calculateCartTotals(state.cartItems);
      state.subtotal = totals.subtotal;
      state.vatAndTax = totals.vatAndTax;
      state.total = totals.total;
    },
    setIsEmailVerification: (state, action) => {
      state.isEmailVerification = action.payload;
    },
    setVerificationEmail: (state, action) => {
      state.verificationEmail = action.payload;
    },  
  },
});

export const { addToCart, removeFromCart, clearCart, setIsCartOpen, removeItemFromCart, updateQuantity, setIsEmailVerification, setVerificationEmail } = cartSlice.actions;
export default cartSlice.reducer;
