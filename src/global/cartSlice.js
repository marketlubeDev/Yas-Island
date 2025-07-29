import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  subtotal: 0,
  vatAndTax: 0,
  total: 0,
  isCartOpen: false,
  isEmailVerification: false,
  verificationEmail: "",
};

const calculateCartTotals = (items, productList = []) => {
  console.log("items", JSON.stringify(items, null, 2));
  console.log("productList", JSON.stringify(productList, null, 2));
  console.log(productList, "list");

  const subtotal = items.reduce((total, item) => {
    // Find the product that contains this variant
    const product = productList.find((product) =>
      product.product_variants?.some(
        (variant) => variant.productid === item.productId
      )
    );

    // Find the specific variant
    const variant = product?.product_variants?.find(
      (variant) => variant.productid === item.productId
    );

    if (variant) {
      console.log(`Found price for ${item.productId}:`, {
        net: variant.net_amount,
        vat: variant.vat,
        quantity: item.quantity,
      });
      return total + variant.net_amount * (item.quantity || 0);
    } else {
      console.warn(`No price found for productId: ${item.productId}`);
      return total;
    }
  }, 0);

  const vatAndTax = items.reduce((taxTotal, item) => {
    // Find the product that contains this variant
    const product = productList.find((product) =>
      product.product_variants?.some(
        (variant) => variant.productid === item.productId
      )
    );

    // Find the specific variant
    const variant = product?.product_variants?.find(
      (variant) => variant.productid === item.productId
    );

    if (variant) {
      return taxTotal + variant.vat * (item.quantity || 0);
    } else {
      return taxTotal;
    }
  }, 0);

  const total = subtotal + vatAndTax;

  console.log("Calculated totals:", { subtotal, vatAndTax, total });

  return {
    subtotal,
    vatAndTax,
    total,
  };
};

// Thunk to recalculate totals with product list from global state
export const recalculateTotals = createAsyncThunk(
  "cart/recalculateTotals",
  async (_, { getState }) => {
    const state = getState();
    const cartItems = state.cart.cartItems;
    const productList = state.product.allProducts;
    return { cartItems, productList };
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action, type = "cart") => {
      if (type === "cart") {
        const existingItemIndex = state.cartItems.findIndex(
          (item) =>
            item.productId === action.payload.productId &&
            item.validFrom === action.payload.validFrom
        );
        if (existingItemIndex !== -1) {
          state.cartItems[existingItemIndex].quantity =
            (state.cartItems[existingItemIndex].quantity || 1) +
            (action.payload.quantity || 1);
        } else {
          state.cartItems.push({ ...action.payload });
        }
      } else {
        state.cartItems.push({ ...action.payload });
      }
      // Trigger recalculation after adding item
      state.needsRecalculation = true;
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      // Trigger recalculation after removing item
      state.needsRecalculation = true;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.subtotal = 0;
      state.vatAndTax = 0;
      state.total = 0;
      state.needsRecalculation = false;
    },
    setIsCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },
    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) =>
          !(
            item.productId === action.payload.id &&
            item.validFrom === action.payload.validFrom
          )
      );
      // Trigger recalculation after removing item
      state.needsRecalculation = true;
    },
    updateQuantity: (state, action) => {
      state.cartItems = state.cartItems
        .map((item) =>
          item.productId === action.payload.id &&
          item.validFrom === action.payload.validFrom
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
        .filter((item) => item.quantity > 0);
      // Trigger recalculation after updating quantity
      state.needsRecalculation = true;
    },
    setIsEmailVerification: (state, action) => {
      state.isEmailVerification = action.payload;
    },
    setVerificationEmail: (state, action) => {
      state.verificationEmail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(recalculateTotals.fulfilled, (state, action) => {
      const { cartItems, productList } = action.payload;
      const totals = calculateCartTotals(cartItems, productList);
      state.subtotal = totals.subtotal;
      state.vatAndTax = totals.vatAndTax;
      state.total = totals.total;
      state.needsRecalculation = false;
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  setIsCartOpen,
  removeItemFromCart,
  updateQuantity,
  setIsEmailVerification,
  setVerificationEmail,
} = cartSlice.actions;

export default cartSlice.reducer;
