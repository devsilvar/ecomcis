

import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const merchant_id="WallX-00000219"

export const wallxPayment = createAsyncThunk(
    "payment/wallX/", async (data, thunkApi) => {
        try {
            const response = await axios.post(
                 "https://business.wallx.co/api-v1/claim_paycode/",
                data
            )
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const wallxPaymentSlice = createSlice({
    name: "wallxPayment",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(wallxPayment.pending, (state) => {
            state.loading = true
        })
        .addCase(wallxPayment.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(wallxPayment.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default wallxPaymentSlice