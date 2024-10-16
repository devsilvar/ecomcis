import axios from "axios";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export const getNewsFlash = createAsyncThunk(
    "order/getOrder/", async ( thunkApi) => {
        try {
            const response = await axios.get(
                baseUrl + "notifications/newsflash/" ,
            )
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const getNewsFlashSlice = createSlice({
    name: "getNewsFlash",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(getNewsFlash.pending, (state) => {
            state.loading = true
        })
        .addCase(getNewsFlash.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(getNewsFlash.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default getNewsFlashSlice