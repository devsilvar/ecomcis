import axios from "axios";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const listCarousel = createAsyncThunk(
    "products/listCarousel/", async (thunkApi) => {
        try {
            const response = await axios.get(
                baseUrl + "products/cover-page-carousels/"
            )
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const listCarouselSlice = createSlice({
    name: "listCarousel",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(listCarousel.pending, (state) => {
            state.loading = true
        })
        .addCase(listCarousel.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(listCarousel.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default listCarouselSlice.reducer;