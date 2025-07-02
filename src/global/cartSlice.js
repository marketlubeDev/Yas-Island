import { createSlice } from "@reduxjs/toolkit";


const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('yasIslandCart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return {
    cartItems: [],
    subtotal: 0,
    vatAndTax: 0,
    total: 0,
    isCartOpen: false,
  };
};

const initialState = loadCartFromStorage();
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


const saveCartToStorage = (cartState) => {
  try {
    localStorage.setItem('yasIslandCart', JSON.stringify(cartState));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
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
      saveCartToStorage(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      const totals = calculateCartTotals(state.cartItems);
      state.subtotal = totals.subtotal;
      state.vatAndTax = totals.vatAndTax;
      state.total = totals.total;
      saveCartToStorage(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.subtotal = 0;
      state.vatAndTax = 0;
      state.total = 0;
      localStorage.removeItem('yasIslandCart');
    },
    setIsCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
      saveCartToStorage(state);
    },
    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => !(item.productId === action.payload.id && item.validFrom === action.payload.validFrom)
      );
      const totals = calculateCartTotals(state.cartItems);
      state.subtotal = totals.subtotal;
      state.vatAndTax = totals.vatAndTax;
      state.total = totals.total;
      saveCartToStorage(state);
    },
    updateQuantity: (state, action) => {
      state.cartItems = state.cartItems.map((item) =>
        (item.productId === action.payload.id && item.validFrom === action.payload.validFrom) ? { ...item, quantity: action.payload.quantity } : item
      );
      const totals = calculateCartTotals(state.cartItems);
      state.subtotal = totals.subtotal;
      state.vatAndTax = totals.vatAndTax;
      state.total = totals.total;
      saveCartToStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setIsCartOpen, removeItemFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
