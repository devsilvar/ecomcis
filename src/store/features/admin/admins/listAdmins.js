//users/admin-list

import axios from "axios";
import { baseUrl } from "../../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const listAdmins = createAsyncThunk(
    "users/listAdmins/", async (thunkApi) => {
        try {
            const response = await axios.get(
                baseUrl + "users/admin-list"
            )
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const listAdminsSlice = createSlice({
    name: "listAdmins",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(listAdmins.pending, (state) => {
            state.loading = true
        })
        .addCase(listAdmins.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(listAdmins.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default listAdminsSlice.reducer;