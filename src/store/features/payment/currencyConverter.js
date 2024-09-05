

import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const API_KEY=process.env.FIXER_API_KEY

export const currencyConvert = createAsyncThunk(
    "fixer/currency/",
    async (_, thunkApi) => {
        try {
            const storedRates = localStorage.getItem("exchangeRates");
            if (storedRates) {
                return JSON.parse(storedRates); // Return stored rates if available
            }

            const response = await axios.get(
                `https://data.fixer.io/api/latest?access_key=${API_KEY}`
            );
            
            const data = response.data;
            
            // Save rates in localStorage for future use
            localStorage.setItem("exchangeRates", JSON.stringify(data));
            
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);


const currencyConvertSlice = createSlice({
    name: "currencyConvert",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(currencyConvert.pending, (state) => {
            state.loading = true
        })
        .addCase(currencyConvert.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        })
        .addCase(currencyConvert.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default currencyConvertSlice