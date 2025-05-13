import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import toast from 'react-hot-toast';

import { baseUrl } from "../../../utils/constant";

export const logIn = createAsyncThunk(
    "users/register/", async (data, thunkApi) => {
        try {
            const response = await axios.post(
                baseUrl + "users/login/", data
            )
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

const logInSlice = createSlice({
    name: "logIn",
    initialState: {
        loading: false,
        data: null,
        error: null,
        isAuthenticated: false,
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(logIn.pending, (state) => {
            state.loading = true
        })
        .addCase(logIn.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null

            state.isAuthenticated = true;

            localStorage.setItem("authToken", action.payload.access_token)
            localStorage.setItem("rereshToken", action.payload.refresh_token)
            sessionStorage.setItem("isAuthenticated", true)
            window.location.reload()

        })
        .addCase(logIn.rejected, (state, action) => {
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


export default logInSlice.reducer;
