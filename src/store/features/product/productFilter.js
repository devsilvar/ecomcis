// products-filter

import axios from "axios";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const filterProduct = createAsyncThunk(
    "products/filterProduct/", async ( {
        name = "",
        category = "",
        color = "",
        size = "",
        price_min = "",
        price_max = "",
        page = 1,
        page_size = 10,
      }, thunkApi) =>  {
        try {
            const query = new URLSearchParams();
            if (name) query.append("name", name);
            if (category) query.append("category", category);
            if (color) query.append("color", color);
            if (size) query.append("size", size);
            if (price_min) query.append("price_min", price_min);
            if (price_max) query.append("price_max", price_max);
            if (page) query.append("page", page);
            if (page_size) query.append("page_size", page_size);
      
            const url = `${baseUrl}products/products-filter/?${query.toString()}`;
            // Parse `filter` and add to query parameters
            const response = await axios.get(url);

            return response.data
        } catch (error) {
            console.log("error >>", error)
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

const filterProductSlice = createSlice({
    name: "filterProduct",
    initialState: {
      loading: false,
      data: null,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(filterProduct.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(filterProduct.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
          state.error = null;
        })
        .addCase(filterProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    }
})

export default filterProductSlice