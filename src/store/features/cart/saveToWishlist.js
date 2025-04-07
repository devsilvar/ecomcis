import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { WISHLIST_KEY } from "../../../libs/constants";

const initialState = {
  wishlist: JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    loadWishlist: (state) => {
      state.wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
    },
    saveToWishlist: (state, action) => {
      state.wishlist.push(action.payload);
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(state.wishlist));
      toast.success("Product added to your wishlist");
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(state.wishlist));
      toast.success("Product removed from your wishlist");
    },
  },
});

export const { saveToWishlist, loadWishlist, removeFromWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
