import axios from "axios";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const searchProduct = createAsyncThunk(
    "products/searchProduct/", async (query, thunkApi) =>  {
        try {
            const response = await axios.get(`${baseUrl}products/product/?${query}`);

            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const searchProductSlice = createSlice({
    name: "searchProduct",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(searchProduct.pending, (state) => {
            state.loading = true
        })
        .addCase(searchProduct.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(searchProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default searchProductSlice