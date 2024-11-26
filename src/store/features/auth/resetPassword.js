import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";

import { baseUrl } from "../../../utils/constant";

export const resetPassword = createAsyncThunk(
    "users/reset-password/", async ({data, token, userId}, thunkApi) => {
        try {
            const response = await axios.post(
                baseUrl + "users/reset-password/" + userId + "/" + token + "/", data
            )
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

const resetPasswordSlice = createSlice({
    name: "resetPassword",
    initialState: {
        loading: false,
        data: null,
        error: null,
        isAuthenticated: false,
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(resetPassword.pending, (state) => {
            state.loading = true
        })
        .addCase(resetPassword.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
            toast.success("Password reset successfully")
            setTimeout(() => {
                window.location.href = "/"
            }, 1000)

        })
        .addCase(resetPassword.rejected, (state, action) => {
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


export default resetPasswordSlice
