import axios from "axios";
import { baseUrl } from "../../../utils/constant";
import toast from 'react-hot-toast';

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export const addNewsFlash = createAsyncThunk(
    "order/getOrder/", async (data, thunkApi) => {
        try {
            const response = await axios.post(
                baseUrl + "notifications/newsflash/" ,
                data,
            )
            toast(`News Flash created`);
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const addNewsFlashSlice = createSlice({
    name: "addNewsFlash",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(addNewsFlash.pending, (state) => {
            state.loading = true
        })
        .addCase(addNewsFlash.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(addNewsFlash.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default addNewsFlashSlice.reducer;