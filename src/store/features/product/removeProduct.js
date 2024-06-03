import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const token = localStorage.getItem("authToken")


export const removeProduct = createAsyncThunk(
    "products/removeProduct/", async (data, thunkApi) => {
        try {
            const response = await axios.post(
                baseUrl + "products/delete_products/" ,
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


const removeProductSlice = createSlice({
    name: "removeProduct",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(removeProduct.pending, (state) => {
            state.loading = true
        })
        .addCase(removeProduct.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null

            // refresh page
            toast(`Product Removed`);
            window.location.reload()

        })
        .addCase(removeProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default removeProductSlice