// /orders/trending-products/

import axios from "axios";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const trendingProduct = createAsyncThunk(
    "products/trendingProduct/", async (thunkApi) => {
        try {
            const response = await axios.get(
                baseUrl + "orders/trending-products/"
            )
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const trendingProductSlice = createSlice({
    name: "trendingProduct",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(trendingProduct.pending, (state) => {
            state.loading = true
        })
        .addCase(trendingProduct.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(trendingProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default trendingProductSlice