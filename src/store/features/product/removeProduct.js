import axios from "axios";
import toast from 'react-hot-toast';
import { baseUrl } from "../../../utils/constant";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token = localStorage.getItem("authToken");

export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (data, thunkApi) => {
    try {
      const response = await axios.delete(
        baseUrl + "products/product/",
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          data, // Include `data` inside the request body for DELETE method
        }
      );

      // If the product is deleted, but the status is 504, treat it as successful
      if (response.status === 504) {
   //     toast.success("Product deleted successfully");

        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 1000);

        return {}; // Return an empty object as response for the fulfilled case
      }

      // Handle normal success case
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 504) {
        // Treat 504 as success in the catch block too, in case it's an error here
    //    toast.success("Product deleted successfully");

        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 1000);

        return {}; // Return an empty object as success
      } else if (error.response.status === 401) {
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("isAuthenticated");

        window.location.href = "/admin/login";
      }

      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const removeProductSlice = createSlice({
  name: "removeProduct",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(removeProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;

      //  toast(`Product Removed`);
        window.location.href = "/admin/dashboard";
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default removeProductSlice.reducer;
