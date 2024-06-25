import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const token = localStorage.getItem("authToken")


export const getOrder = createAsyncThunk(
    "order/getOrder/", async ( thunkApi) => {
        try {
            const response = await axios.get(
                baseUrl + "orders/my_orders/" ,

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


const getOrderSlice = createSlice({
    name: "getOrder",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(getOrder.pending, (state) => {
            state.loading = true
        })
        .addCase(getOrder.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(getOrder.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            console.log("ERROR FROM SLICE->", action.payload);

            // if (action.payload.status === 401) {
            //     toast.error("Session expired. Redirecting to login page...");
            //     window.location.href = "/admin/login";
            // } else {
            //     console.log("ERROR FROM SLICE->", action.payload);
            //     toast(action.payload.message)
            // }
        })
    }
})

export default getOrderSlice