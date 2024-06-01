import axios from "axios";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const listProduct = createAsyncThunk(
    "products/listProduct/", async (thunkApi) => {
        try {
            const response = await axios.get(
                baseUrl + "products/products_list/"
            )
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const listProductSlice = createSlice({
    name: "listProduct",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(listProduct.pending, (state) => {
            state.loading = true
        })
        .addCase(listProduct.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(listProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default listProductSlice