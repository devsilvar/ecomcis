// /products/categories/delete/

import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../../../utils/constant";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token = localStorage.getItem("authToken");

// Thunk for deleting a category
export const deleteCategory = createAsyncThunk(
  "products/deleteCategory",
  async (categoryId, thunkApi) => {
    try {
      const response = await axios.delete(
        `${baseUrl}products/categories/${categoryId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("isAuthenticated");
        window.location.href = "/admin/login";
      }
      return thunkApi.rejectWithValue(error.response?.data || { message: "Unknown error" });
    }
  }
);

// Slice
const deleteCategorySlice = createSlice({
  name: "deleteCategory",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        toast.success("Category deleted successfully!");

        // Optional: Refresh after short delay
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;

        if (action.payload?.status === 401) {
          toast.error("Session expired. Redirecting to login page...");
          window.location.href = "/admin/login";
        } else {
          toast.error(action.payload?.message || "Failed to delete category.");
          console.error("DELETE CATEGORY ERROR ->", action.payload);
        }
      });
  },
});

export default deleteCategorySlice;
