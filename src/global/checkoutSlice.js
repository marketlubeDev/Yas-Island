import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkout: {
    startDate: "",
    endDate: "",
    guests: {},
    totalPrice: 0,
    product: null,
    productVariant: null, 
    email:"",
    firstName:"",
    lastName:"",
    residence:"",
    nationality:"",
    phone:"",
  },
};

const checkoutSlice = createSlice({ 
    name: "checkout",
    initialState,
    reducers: {
        setCheckout: (state, action) => {
            state.checkout = action.payload;
        },
        clearCheckout: (state) => {
            state.checkout = {};
        },  
        setEmail: (state, action) => {
            state.checkout.email = action.payload;
        },
            
    },
});

export const { setCheckout, setEmail } = checkoutSlice.actions;