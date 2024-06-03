import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { baseUrl } from "../../../utils/constant";

const token = localStorage.getItem("authToken")

export const addToCart = createAsyncThunk(
    "products/addToCart/", async (data, thunkApi) => {
        try {
            const response = await axios.post(
                baseUrl + "cart/add-to-cart/", data,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

const addToCartSlice = createSlice({
    name: "addToCart",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(addToCart.pending, (state) => {
            state.loading = true
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})


export default addToCartSlice
