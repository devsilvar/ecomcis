import axios from "axios";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const removeCart = createAsyncThunk(
    "products/removeCart/", async (cartId, thunkApi) => {
        try {
            const response = await axios.delete(
                baseUrl + `cart/cart-items/${cartId}/remove/`
            )
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const removeCartSlicer = createSlice({
    name: "removeCart",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(removeCart.pending, (state) => {
            state.loading = true
        })
        .addCase(removeCart.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(removeCart.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default removeCartSlicer