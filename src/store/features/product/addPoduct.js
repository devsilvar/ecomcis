import axios from "axios";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const token = localStorage.getItem("authToken")


export const addProduct = createAsyncThunk(
    "products/addProduct/", async (data, thunkApi) => {
        try {
            const response = await axios.post(
                baseUrl + "products/create_products/" ,
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

        })
        .addCase(addProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default addProductSlice