import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


import { baseUrl } from "../../../../utils/constant";

export const adminLogIn = createAsyncThunk(
    "users/admin/register/", async (data, thunkApi) => {
        try {
            const response = await axios.post(
                baseUrl + "users/admin/login/", data
            )
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

const adminLogInSlice = createSlice({
    name: "adminLogIn",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(adminLogIn.pending, (state) => {
            state.loading = true
        })
        .addCase(adminLogIn.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null

            localStorage.setItem("authToken", action.payload.access);
            
        })
        .addCase(adminLogIn.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            toast(`Login failed: ${action.payload.message}`);
        })
    }
})


export default adminLogInSlice
