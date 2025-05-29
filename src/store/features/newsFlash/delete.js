import axios from "axios";
import { baseUrl } from "../../../utils/constant";
import toast from 'react-hot-toast';

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for deleting a news flash
export const deleteNewsFlash = createAsyncThunk(
  "newsFlash/delete",
  async (id, thunkApi) => {
    try {
      const response = await axios.delete(`${baseUrl}notifications/newsflash/${id}/`);
      toast.success("News Flash deleted");
      window.location.reload();
      return { id };
    } catch (error) {
      toast.error("Failed to delete News Flash");
      return thunkApi.rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const deleteNewsFlashSlice = createSlice({
  name: "deleteNewsFlash",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteNewsFlash.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteNewsFlash.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(deleteNewsFlash.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default deleteNewsFlashSlice.reducer;
