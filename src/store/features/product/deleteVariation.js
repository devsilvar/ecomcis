//  /products/variations/{id}/

import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const token = localStorage.getItem("authToken")


export const deleteVariation = createAsyncThunk(
    "products/deleteVariation", async(id, thunkApi) =>{
        try{
            const response = await axios.delete(
                baseUrl + `products/variations/${id}/`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            return response.data
        } catch (error){
            const notify = (msg) => toast(msg);

            
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const deleteVariationSlice = createSlice({
    name: "deleteVariation",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(deleteVariation.pending, (state) => {
            state.loading = true
        })
        .addCase(deleteVariation.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null

            // refresh page
            toast(`Product variation Removed`);
            setTimeout(() => {
                window.location.reload()
            }, 2000);

        })
        .addCase(deleteVariation.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default deleteVariationSlice