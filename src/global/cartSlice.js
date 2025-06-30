import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  subtotal: 0,
  vatAndTax: 0,
  total: 0,
  isCartOpen: false,
};

const TAX_RATE = 0.05; // 5% VAT & tax rate

const calculateCartTotals = (items) => {
  const subtotal = items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  const vatAndTax = subtotal * TAX_RATE;
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
      state.cartItems.push(action.payload);
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
        (item) => item.id !== action.payload
      );
      const totals = calculateCartTotals(state.cartItems);
      state.subtotal = totals.subtotal;
      state.vatAndTax = totals.vatAndTax;
      state.total = totals.total;
    },
    updateQuantity: (state, action) => {
      state.cartItems = state.cartItems.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
      const totals = calculateCartTotals(state.cartItems);
      state.subtotal = totals.subtotal;
      state.vatAndTax = totals.vatAndTax;
      state.total = totals.total;
    },
    deleteItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      const totals = calculateCartTotals(state.cartItems);
      state.subtotal = totals.subtotal;
      state.vatAndTax = totals.vatAndTax;
      state.total = totals.total;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setIsCartOpen, removeItemFromCart, updateQuantity, deleteItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
