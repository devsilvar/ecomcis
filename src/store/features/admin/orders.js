import axios from "axios";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const token = localStorage.getItem("authToken")

export const getAdminOrders = createAsyncThunk(
    "admin/orders", async (thunkApi) => {
        try {
            const response = await axios.get(
                baseUrl + "orders/orders/",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            console.log('FROM AXIOS --', response.status)
            // if(response.status === 401){
            //     toast("session expired")
            //     window.location.href = "/admin/login";
            // }
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const getAdminOrdersSlice = createSlice({
    name: "getAdminOrders",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(getAdminOrders.pending, (state) => {
            state.loading = true
        })
        .addCase(getAdminOrders.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
            console.log("FROM REDUCER", action.payload)
        })
        .addCase(getAdminOrders.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default getAdminOrdersSlice