import axios from "axios";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';

const token = localStorage.getItem("authToken")

export const updateOrder = createAsyncThunk(
    "admin/orderUpdate", async ({ id, data }, thunkApi) => {
        try {
            const response = await axios.put(
                baseUrl + `orders/orders/${id}/status/update/`,
                data,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            //  if successful, reload page
            window.location.href= "/admin/orders"
            return response.data
        } catch (error) {
       //     const notify = (msg) => toast(msg);
            if(error.response.status === 401){
         //       notify("Session timed out")
                setTimeout(()=>{
                    window.location.href = "/admin/login";
                }, 2000)
            }
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const updateOrderStatusSlice = createSlice({
    name: "updateOrder",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(updateOrder.pending, (state) => {
            state.loading = true
        })
        .addCase(updateOrder.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(updateOrder.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default updateOrderStatusSlice.reducer;