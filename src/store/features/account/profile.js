import axios from "axios";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let token = localStorage.getItem("authToken");

export const getProfile = createAsyncThunk(
  "users/profile/",
  async (thunkApi) => {
    try {
      const response = await axios.get(baseUrl + "users/active-user-details/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        // localStorage.removeItem("authToken")
        // sessionStorage.removeItem('isAuthenticated')
        // window.location.href = "/"
      }
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const getProfileSlice = createSlice({
  name: "getProfile",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getProfileSlice.reducer;
