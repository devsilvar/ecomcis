import axios from "axios";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const listCategory = createAsyncThunk(
    "products/listCategory/", async (thunkApi) => {
        try {
            const response = await axios.get(
                baseUrl + "products/categories/list/"
            )
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const listCategorySlice = createSlice({
    name: "listCategory",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(listCategory.pending, (state) => {
            state.loading = true
        })
        .addCase(listCategory.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(listCategory.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default listCategorySlice.reducer;