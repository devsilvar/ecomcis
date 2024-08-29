import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const token = localStorage.getItem("authToken")


export const addProduct = createAsyncThunk(
    "products/addProduct/", async (data, thunkApi) => {
        try {
            const response = await axios.post(
                baseUrl + "products/product/" ,
                data,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            return response.data
        } catch (error) {
            if(error.response.status === 401){
                localStorage.removeItem("authToken")
                sessionStorage.removeItem('isAuthenticated')
                toast.error(`Session Expired`);

                setTimeout(() => {
                    window.location.href = "/admin/login"
                }, 1500);
            }
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const addProductSlice = createSlice({
    name: "addProduct",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(addProduct.pending, (state) => {
            state.loading = true
        })
        .addCase(addProduct.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null

            // refresh page
            toast(`Product added to cart`);

        })
        .addCase(addProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payloads

            if (action.payload.status === 401) {
                toast.error("Session expired. Redirecting to login page...");
                window.location.href = "/admin/login";
            } else {
                console.log("ERROR FROM SLICE->", action.payload);
            }
        })
    }
})

export default addProductSlice