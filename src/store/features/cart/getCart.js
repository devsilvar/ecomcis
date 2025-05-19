import axios from "axios";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const token = localStorage.getItem("authToken")

export const getCart = createAsyncThunk(
    "products/getCart/", async ( thunkApi) => {
        try {
            const response = await axios.get(
                baseUrl + "cart/cart-items/" ,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            return response.data
        } catch (error) {
            if(error.response.status === 401) {
                localStorage.removeItem("authToken")
                sessionStorage.setItem("isAuthenticated", false)
                alert('get cart Please log in to proceed')
                window.location.href = "/register"
            }
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const getCartSlicer = createSlice({
    name: "getCart",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(getCart.pending, (state) => {
            state.loading = true
        })
        .addCase(getCart.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(getCart.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default getCartSlicer.reducer;