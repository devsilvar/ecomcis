import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const token = localStorage.getItem("authToken")


export const createOrder = createAsyncThunk(
    "order/createOrder/", async (data, thunkApi) => {
        try {
            const response = await axios.post(
                baseUrl + "orders/create-order/" ,
                data,
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


const createOrderSlice = createSlice({
    name: "createOrder",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(createOrder.pending, (state) => {
            state.loading = true
        })
        .addCase(createOrder.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null

            // refresh page
            sessionStorage.setItem(
                'order', JSON.stringify(action.payload)
            )
            // store action.payload into sessionStorage

            toast(`Order created, proceed to payment`);
            setTimeout(() => {
                window.location.href = "/payment";
            }, 1000)

        })
        .addCase(createOrder.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload

            if (action.payload.status === 401) {
                toast.error("Session expired. Redirecting to login page...");
                window.location.href = "/register";
            } else {
                toast(action.payload.message)
            }
        })
    }
})

export default createOrderSlice