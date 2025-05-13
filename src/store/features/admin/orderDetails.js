import axios from "axios";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const token = localStorage.getItem("authToken");

export const getOrderDetail = createAsyncThunk(
  "admin/order",
  async (id, thunkApi) => {
    try {
      const response = await axios.get(
        baseUrl + `orders/orders/admin_details/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
    //  const notify = (msg) => toast(msg);
      if (error.response.status === 401) {
      //  notify("Session timed out");
        setTimeout(() => {
          window.location.href = "/admin/login";
        }, 2000);
      }
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const getOrderDetailSlice = createSlice({
  name: "getOrderDetail",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getOrderDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getOrderDetailSlice.reducer;
