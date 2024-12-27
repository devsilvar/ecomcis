// products-filter

import axios from "axios";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const filterProduct = createAsyncThunk(
    "products/filterProduct/", async ({ search = "", category = "", color = "", size="",price_min="", price_max=""  }, thunkApi) =>  {
        try {
            const query = new URLSearchParams();
            if (search) query.append("search", search);
            if (category) query.append("category", category);
            if (size) query.append("size", size);
            if (color) query.append("color", color);
            if (price_max) query.append("price_max", price_max);
            if (price_min) query.append("price_min", price_min);

            // Parse `filter` and add to query parameters

            let url = `${baseUrl}products/products-filter/?${query.toString()}`
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
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(filterProduct.pending, (state) => {
            state.loading = true
        })
        .addCase(filterProduct.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(filterProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default filterProductSlice