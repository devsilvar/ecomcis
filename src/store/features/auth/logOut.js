import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";

import { baseUrl } from "../../../utils/constant";

export const logOut = createAsyncThunk(
    "users/register/", async (data, thunkApi) => {
        try {
            const response = await axios.post(
                baseUrl + "users/auth/logout", data
            )
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

const logOutSlice = createSlice({
    name: "logOut",
    initialState: {
        loading: false,
        data: null,
        error: null,
        isAuthenticated: false,
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(logOut.pending, (state) => {
            state.loading = true
        })
        .addCase(logOut.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null

            state.isAuthenticated = true;

            localStorage.removeItem("authToken")
            sessionStorage.removeItem("isAuthenticated")
            window.location.href = "/"

        })
        .addCase(logOut.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload

            console.log(action.payload)
        })
    }
})


export default logOutSlice
