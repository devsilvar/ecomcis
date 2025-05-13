import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import toast from 'react-hot-toast';

import { baseUrl } from "../../../utils/constant";

export const forgotPassword = createAsyncThunk(
    "users/password-reset/", async (data, thunkApi) => {
        try {
            const response = await axios.post(
                baseUrl + "users/password-reset/", data
            )
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState: {
        loading: false,
        data: null,
        error: null,
        isAuthenticated: false,
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(forgotPassword.pending, (state) => {
            state.loading = true
        })
        .addCase(forgotPassword.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
            toast.success("Password reset link sent successfully")
            window.location.reload()

        })
        .addCase(forgotPassword.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload

            if (action.payload) {
                for (const key in action.payload) {
                  if (Array.isArray(action.payload[key])) {
                    action.payload[key].forEach((message) => toast.error(key + " : " + message));
                  }
                  else{
                    toast.error(action.payload.detail)
                  }
                }
              } else {
                toast.error("An unknown error occurred");
              }
            
            if(action.payload.non_field_errors){
                toast.error(action.payload.non_field_errors)
            }
            
        })
    }
})


export default forgotPasswordSlice.reducer;
