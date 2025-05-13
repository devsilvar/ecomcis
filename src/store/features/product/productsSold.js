// apiSlice/productSoldSlice.js
import axios from "axios";
import { baseUrl } from "../../../utils/constant";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Create async thunk
export const getProductsSold = createAsyncThunk(
  "products/getProductsSold",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(`${baseUrl}products/products/total-sold/`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Create slice
const productSoldSlice = createSlice({
  name: "productsSold",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsSold.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsSold.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getProductsSold.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default productSoldSlice.reducer;