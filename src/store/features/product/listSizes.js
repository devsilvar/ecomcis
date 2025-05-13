// api.amarae.io/api/v1/products/

import axios from "axios";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const listProductSize = createAsyncThunk(
    "products/listSizes/", async (thunkApi) => {
        try {
            const response = await axios.get(
                baseUrl + "products/sizes/"
            )
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const listProductSizeSlice = createSlice({
    name: "listProductSize",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(listProductSize.pending, (state) => {
            state.loading = true
        })
        .addCase(listProductSize.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(listProductSize.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default listProductSizeSlice.reducer;