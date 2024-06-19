import axios from "axios";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getSession = createAsyncThunk(
    "cart/session/", async (thunkApi) => {
        try {
            const response = await axios.get(
                baseUrl + "/cart/session_id/" 
            )
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const getSessionSlice = createSlice({
    name: "getSession",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(getSession.pending, (state) => {
            state.loading = true
        })
        .addCase(getSession.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null

            console.log("SESSION ->",action.payload)
        })
        .addCase(getSession.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default getSessionSlice