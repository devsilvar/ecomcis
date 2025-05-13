import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from 'react-hot-toast';

import { baseUrl } from "../../../utils/constant";

const token = localStorage.getItem("authToken")

export const addToCart = createAsyncThunk(
    "products/addToCart/", async (data, thunkApi) => {
        
        try {
            const response = await axios.post(
                baseUrl + "cart/add-to-cart/", data,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }   
            )
            return response.data
        } catch (error) {
            const notify = (msg) => toast(msg);

            if(error.response.status === 401){
                notify("Please log in to proceed")
                setTimeout(()=>{
                    window.location.href = "/register";
                }, 2000)
            }
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)

const addToCartSlice = createSlice({
    name: "addToCart",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(addToCart.pending, (state) => {
            state.loading = true
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null

            // redirect to "/"
            toast(`Product added to cart`);

            setTimeout(() => {
                window.location.href = "/checkout"
            }, 2000)
            // remove cart from sessionStorage
            localStorage.removeItem("cart");
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})


export default addToCartSlice.reducer;
