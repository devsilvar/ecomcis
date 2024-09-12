

import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const API_KEY="f7f80aac7032ab688163e1c01c40cb4b"

const API_URL = "https://data.fixer.io/api/latest"; 


// Thunk to fetch exchange rates
export const fetchExchangeRates = createAsyncThunk(
  "currency/fetchExchangeRates",
  async () => {
    const response = await axios.get(`${API_URL}?access_key=${API_KEY}`);
    let rates = null;

    const dummy = {
      "success": true,
      "timestamp": 1519296206,
      "base": "EUR",
      "date": "2024-09-12",
      "rates": {
          "AUD": 1.566015,
          "CAD": 1.560132,
          "CHF": 1.154727,
          "CNY": 7.827874,
          "GBP": 0.882047,
          "JPY": 132.360679,
          "USD": 1.23396,
          "NGN": 1923.91,
          "EUR": 1
      }
  }

    console.log(response.data.success)

    if (response.data.success){
      rates = response.rates
    }else{
      rates = dummy.rates
    }
    
    localStorage.setItem("exchangeRates", JSON.stringify(rates));

    return rates;
  }
);

const currencyConverterSlice = createSlice({
  name: "currency",
  initialState: {
    rates: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rates = action.payload;
      })
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default currencyConverterSlice;
