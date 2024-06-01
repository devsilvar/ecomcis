import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { baseUrl } from "../../../utils/constant";

export const signUp = createAsyncThunk(
    "users/register/", async (data, thunkApi) => {
        try {
            const response = await axios.post(
                baseUrl + "users/register/", data
            )
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

const signUpSlice = createSlice({
    name: "signUp",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(signUp.pending, (state) => {
            state.loading = true
        })
        .addCase(signUp.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(signUp.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})


export default signUpSlice
