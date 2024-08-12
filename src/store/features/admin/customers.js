import axios from "axios";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token = localStorage.getItem("authToken")

export const getAdminCustomers = createAsyncThunk(
    "common/dashboard/", async (thunkApi) => {
        try {
            const response = await axios.get(
                baseUrl + "users/list-users/",
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


const getAdminCustomersSlice = createSlice({
    name: "getAdminCustomers",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(getAdminCustomers.pending, (state) => {
            state.loading = true
        })
        .addCase(getAdminCustomers.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(getAdminCustomers.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default getAdminCustomersSlice