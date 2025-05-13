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
      const newItem = action.payload;
    
      // === ✅ Validate item structure ===
      if (
        !newItem ||
        typeof newItem !== "object" ||
        !newItem.id ||
        !Array.isArray(newItem.images) ||
        newItem.images.length === 0
      ) {
        console.warn("Invalid item. Skipping add to cart:", newItem);
        toast.error("Item could not be added. Try again.");
        return;
      }
    
      const existingIndex = state.cart.findIndex((item) => item.id === newItem.id);
    
      if (existingIndex !== -1) {
        state.cart[existingIndex] = newItem;
      } else {
        state.cart.push(newItem);
      }
    
      localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
      toast.success(`${newItem.name} added to your cart`);
    },
    
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
    },
    increaseQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (!item) return;
    
      // If item has a size limit, check it
      if (item.size && item.size.quantity !== undefined && item.quantity >= item.size.quantity) return;
    
      item.quantity += 1;
      localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
    },setCartFromAPI: (state, action) => {
      state.cart = action.payload;
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
  setCartFromAPI,
  decreaseQuantity,
  clearCart,
  setSelectedColor,
  setSelectedSize,
} = cartSlice.actions;
export default cartSlice.reducer;
