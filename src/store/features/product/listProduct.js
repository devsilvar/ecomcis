import axios from "axios";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const listProduct = createAsyncThunk(
    "products/listProduct/", async ({ search = "", category = "", color = "", size=""  }, thunkApi) =>  {
        try {
            const query = new URLSearchParams();
            if (search) query.append("search", search);
            if (category) query.append("category", category);
            if (size) query.append("size", size);
            if (color) query.append("color", color);

            // Parse `filter` and add to query parameters

            let url = `${baseUrl}products/product/?${query.toString()}`
            const response = await axios.get(url);

            return response.data
        } catch (error) {
            console.log("error >>", error)
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const listProductSlice = createSlice({
    name: "listProduct",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(listProduct.pending, (state) => {
            state.loading = true
        })
        .addCase(listProduct.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(listProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default listProductSlice