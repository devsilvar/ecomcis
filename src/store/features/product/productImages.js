import axios from "axios";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const token = localStorage.getItem("authToken")


export const getProductImage = createAsyncThunk(
    "products/productImage", async(id, thunkApi) =>{
        try{
            const response = await axios.get(
                baseUrl + `products/product-images/?product_id=${id}`,
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


const getProductImageSlice = createSlice({
    name: "getProductImage",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(getProductImage.pending, (state) => {
            state.loading = true
        })
        .addCase(getProductImage.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null

        })
        .addCase(getProductImage.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default getProductImageSlice.reducer;