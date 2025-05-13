import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from 'react-hot-toast';


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

            window.location.href = "/admin/dashboard";
            
        })
        .addCase(adminLogIn.rejected, (state, action) => {
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


export default adminLogInSlice.reducer;
