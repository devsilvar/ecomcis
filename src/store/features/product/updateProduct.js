import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const token = localStorage.getItem("authToken")


export const updateProduct = createAsyncThunk(
    "products/updateProduct", async(id, data, thunkApi) =>{
        try{
            const response = await axios.put(
                baseUrl + `products/product/${id}/`,
                data,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            return response.data
        } catch (error){
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const updateProductSlice = createSlice({
    name: "updateProduct",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(updateProduct.pending, (state) => {
            state.loading = true
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null

            // refresh page
            toast(`Product Updated`);
            // window.location.reload()

        })
        .addCase(updateProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default updateProductSlice