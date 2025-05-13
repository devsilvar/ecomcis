import axios from "axios";
import { baseUrl } from "../../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const addAdmin = createAsyncThunk(
    "users/addAdmin/", async (data, thunkApi) => {
        try {
            const response = await axios.post(
                baseUrl + "users/create_admin/", data
            )
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const addAdminSlice = createSlice({
    name: "addAdmin",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(addAdmin.pending, (state) => {
            state.loading = true
        })
        .addCase(addAdmin.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(addAdmin.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default addAdminSlice.reducer;