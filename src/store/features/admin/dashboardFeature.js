// common/dashboard-data/


import axios from "axios";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const token = localStorage.getItem("authToken")

export const getDashboardData = createAsyncThunk(
    "common/dashboard/", async (thunkApi) => {
        try {
            const response = await axios.get(
                baseUrl + "common/dashboard-data/",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const dashboardDataSlice = createSlice({
    name: "getDashboardData",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(getDashboardData.pending, (state) => {
            state.loading = true
        })
        .addCase(getDashboardData.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(getDashboardData.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default dashboardDataSlice