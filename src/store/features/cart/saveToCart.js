import { createSlice } from "@reduxjs/toolkit";
import { CART_KEY } from "../../../libs/constants";

const initialState = {
  cart: JSON.parse(localStorage.getItem(CART_KEY)) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    saveToCart: (state, action) => {
      state.cart.push(action.payload);
      console.log("Cart saved:", state.cart.quantity);
      // localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    loadCart: (state) => {
      state.cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    },
    addToCart: (state, action) => {
      if (!state.cart.find((item) => item.id === action.payload.id)) {
        state.cart.push(action.payload);
      }

      localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
    },
    increaseQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
      localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
    },
    decreaseQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
    },
  },
});

export const {
  saveToCart,
  loadCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
