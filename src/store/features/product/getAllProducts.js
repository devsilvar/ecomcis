import axios from "axios";
import { baseUrl } from "../../../utils/constant";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch all products
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(baseUrl + "products/product/");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const getAllProductsSlice = createSlice({
  name: "allProducts",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getAllProductsSlice.reducer;
