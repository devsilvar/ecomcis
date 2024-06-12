import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";

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
        error: null
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

            // setTimeout(()=>{
            //     window.location.href = "/";
            // }, 2000)

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
        })
    }
})


export default logInSlice
