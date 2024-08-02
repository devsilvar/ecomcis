// src/redux/slices/productSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

import { baseUrl } from '../../../utils/constant';

const token = localStorage.getItem("authToken")

export const addProductVariations = createAsyncThunk(
  'product/addProductVariations',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        baseUrl + 'products/variations/create/', 
        payload,
        {
          headers: {
              'Content-Type': 'multipart/form-data',
              "Authorization": `Bearer ${token}`
          }
      }
      );
      console.log("RESPONSE", response.data)
      return response.data;
    } catch (error) {
      if(error.response.status === 401){
        localStorage.removeItem("authToken")
        sessionStorage.removeItem('isAuthenticated')
        toast.error(`Session Expired`);

        setTimeout(() => {
            window.location.href = "/admin/login"
        }, 1500);
    }
      return rejectWithValue(error.response.data);
    }
  }
);

const addVariationSlice = createSlice({
  name: 'product',
  initialState: {
    data: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductVariations.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addProductVariations.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload
      })
      .addCase(addProductVariations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addVariationSlice;
