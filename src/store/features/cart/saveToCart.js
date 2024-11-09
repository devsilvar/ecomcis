import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cart')) || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    saveToCart: (state, action) => {
      state.cartItems.push(action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    loadCart: (state) => {
      state.cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    }
  },
});

export const { saveToCart, loadCart } = cartSlice.actions;
export default cartSlice.reducer;
