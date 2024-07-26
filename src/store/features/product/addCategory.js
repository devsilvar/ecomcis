// /products/categories/add/

import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const token = localStorage.getItem("authToken")


export const addCategory = createAsyncThunk(
    "products/addCategory/", async (data, thunkApi) => {
        try {
            const response = await axios.post(
                baseUrl + "products/categories/add/" ,
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


const addCategorySlice = createSlice({
    name: "addCategory",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(addCategory.pending, (state) => {
            state.loading = true
        })
        .addCase(addCategory.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null

            // refresh page
            toast(`Category added to cart`);
            window.location.reload()

        })
        .addCase(addCategory.rejected, (state, action) => {
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

export default addCategorySlice