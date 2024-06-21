import axios from "axios";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getProduct = createAsyncThunk(
    "products/getProducts/", async (id, thunkApi) => {
        try {
            const response = await axios.get(
                baseUrl + "products/product/detail/" + id
            )
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const getProductSlice = createSlice({
    name: "listProduct",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(getProduct.pending, (state) => {
            state.loading = true
        })
        .addCase(getProduct.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(getProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default getProductSlice