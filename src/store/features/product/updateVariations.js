//  /products/variations/{id}/

import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token = localStorage.getItem("authToken")

export const updateVariation = createAsyncThunk(
    "products/updateVariation",
    async ({ id, data }, thunkApi) => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.put(
          `${baseUrl}products/variations/${id}/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error updating variation", error.response?.data);
        return thunkApi.rejectWithValue(error.response?.data);
      }
    }
  );
  


const updateVariationSlice = createSlice({
    name: "updateVariation",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(updateVariation.pending, (state) => {
            state.loading = true;
          })
          .addCase(updateVariation.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
           // toast(`Product variation Updated`);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          })
          .addCase(updateVariation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         //   toast.error("Failed to update variation");
            console.log("Error details:", action.payload);
          });
      }
      
})

export default updateVariationSlice.reducer