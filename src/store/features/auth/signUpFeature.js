import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";

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

            toast('Sign up successful')

            setTimeout(() => {
                window.location.href = "/register";
            }, 1500);

        })
        .addCase(signUp.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload

            if (action.payload) {

                Object.keys(action.payload).forEach((key) => {
                    toast.error(`${action.payload[key]}`);
                  });
                
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


export default signUpSlice.reducer;
