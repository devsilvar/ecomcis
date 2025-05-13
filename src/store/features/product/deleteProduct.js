import axios from "axios";
import toast from 'react-hot-toast';
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const token = localStorage.getItem("authToken")


export const deleteProduct = createAsyncThunk(
    "products/deleteProduct", async(id, thunkApi) =>{
        try{
            const response = await axios.delete(
                baseUrl + `products/product/${id}/`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            return response.data
        } catch (error){
            if(error.response.status === 401){
                localStorage.removeItem("authToken")
                sessionStorage.removeItem('isAuthenticated')

                window.location.href = "/admin/login"
            }
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const deleteProductSlice = createSlice({
    name: "deleteProduct",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(deleteProduct.pending, (state) => {
            state.loading = true
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null

            // refresh page
//            toast(`Product Removed`);
            setTimeout(() => {
                window.location.href = "/admin/dashboard"
            }, 2000);

        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default deleteProductSlice.reducer;