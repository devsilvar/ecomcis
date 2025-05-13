// COPIED AND PASTED WITHOUT EDITING

import axios from "axios";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let token = localStorage.getItem("authToken")

export const getShippingAddress = createAsyncThunk(
    "users/shippingAddress/", async (thunkApi) => {
        try {
            const response = await axios.get(
                baseUrl + "users/shipping_address_details/", 
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


const getShippingAddressSlice = createSlice({
    name: "getShippingAddress",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(getShippingAddress.pending, (state) => {
            state.loading = true
        })
        .addCase(getShippingAddress.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(getShippingAddress.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default getShippingAddressSlice.reducer;