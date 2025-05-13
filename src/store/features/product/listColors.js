// api.amarae.io/api/v1/products/

import axios from "axios";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const listProductColor = createAsyncThunk(
    "products/listColor/", async (thunkApi) => {
        try {
            const response = await axios.get(
                baseUrl + "products/colors/"
            )
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const listProductColorSlice = createSlice({
    name: "listProductColor",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(listProductColor.pending, (state) => {
            state.loading = true
        })
        .addCase(listProductColor.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(listProductColor.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default listProductColorSlice.reducer;