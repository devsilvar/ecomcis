import axios from "axios";
import { baseUrl } from "../../../utils/constant";
import { toast } from "react-toastify";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let token = localStorage.getItem("authToken")

export const addShippingAddress = createAsyncThunk(
    "users/addShippingAddress/", async (data, thunkApi) => {
        try {
            const response = await axios.post(
                baseUrl + "users/addresses/create/", 
                data,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            return response.data
        } catch (error) {
            console.log("ADD SHIPPING ADDRESS ERROR: ",error.response)
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const addShippingAddressSlice = createSlice({
    name: "addShippingAddress",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(addShippingAddress.pending, (state) => {
            state.loading = true
        })
        .addCase(addShippingAddress.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null

            // refresh page
            toast(`Shipping address added`);
            window.location.reload()
        })
        .addCase(addShippingAddress.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default addShippingAddressSlice