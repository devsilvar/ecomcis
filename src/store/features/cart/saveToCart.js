import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { CART_KEY } from "../../../libs/constants";

const initialState = {
  cart: JSON.parse(localStorage.getItem(CART_KEY)) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadCart: (state) => {
      state.cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    },
    saveToCart: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        // replace item with new item
        const index = state.cart.findIndex(
          (item) => item.id === action.payload.id
        );
        state.cart[index] = action.payload;
      } else {
        state.cart.push(action.payload);
      }
      localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
      toast.success(`${action.payload.name} added to your cart`);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
    },
    increaseQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item.quantity >= item.size.quantity) return;
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
    setSelectedColor: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.color = action.payload.color;
      }
      localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
    },
    setSelectedSize: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.size = action.payload.size;
      }
      localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem(CART_KEY);
    },
  },
});

export const {
  saveToCart,
  loadCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  setSelectedColor,
  setSelectedSize,
} = cartSlice.actions;
export default cartSlice.reducer;
