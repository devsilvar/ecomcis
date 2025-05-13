import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = process.env.REACT_APP_FIXER_API_KEY;

const API_URL = "https://data.fixer.io/api/latest";

// Thunk to fetch exchange rates
export const fetchExchangeRates = createAsyncThunk(
  "currency/fetchExchangeRates",
  async () => {
    // const hasDataSet = localStorage.getItem("exchangeRates");
    // const lastUpdated = localStorage.getItem("exchangeRatesTimestamp");
    // const now = Date.now();
    // const oneDay = 24 * 60 * 60 * 1000;

    // if (hasDataSet && lastUpdated && now - lastUpdated < oneDay) {
    //   return JSON.parse(hasDataSet);
    // }

    const response = await axios.get(
      `${API_URL}?access_key=${API_KEY}&base=USD`
    );
    let rates = null;

    const dummy = {
      success: true,
      timestamp: 1519296206,
      base: "USD",
      date: "2024-09-12",
      rates: {
        AED: 4.165007,
        AFN: 82.3014,
        ALL: 99.499173,
        AMD: 443.457812,
        ANG: 2.029961,
        AOA: 1034.172457,
        ARS: 1219.784225,
        AUD: 1.818891,
        AWG: 2.043964,
        AZN: 1.941082,
        BAM: 1.956767,
        BBD: 2.290152,
        BDT: 137.810208,
        BGN: 1.950917,
        BHD: 0.427379,
        BIF: 3371.743339,
        BMD: 1.13396,
        BND: 1.49774,
        BOB: 7.837874,
        BRL: 6.680159,
        BSD: 1.134271,
        BTC: 0.00001385881,
        BTN: 97.650399,
        BWP: 15.819818,
        BYN: 3.711967,
        BYR: 22225.624103,
        BZD: 2.278326,
        CAD: 1.576642,
        CDF: 3262.404066,
        CHF: 0.923537,
        CLF: 0.029083,
        CLP: 1116.021186,
        CNY: 8.294352,
        CNH: 8.265409,
        COP: 4959.806773,
        CRC: 581.992758,
        CUC: 1.13396,
        CUP: 30.049951,
        CVE: 110.319521,
        CZK: 25.096794,
        DJF: 201.781502,
        DKK: 7.466829,
        DOP: 70.049986,
        DZD: 149.381117,
        EGP: 58.204765,
        ERN: 17.009406,
        ETB: 147.385339,
        EUR: 1,
        FJD: 2.593764,
        FKP: 0.876338,
        GBP: 0.868503,
        GEL: 3.129402,
        GGP: 0.876338,
        GHS: 17.581493,
        GIP: 0.876338,
        GMD: 81.83247,
        GNF: 9825.990573,
        GTQ: 8.749201,
        GYD: 237.310751,
        HKD: 8.796694,
        HNL: 29.338511,
        HRK: 7.533124,
        HTG: 148.915258,
        HUF: 413.355617,
        IDR: 19075.761387,
        ILS: 4.2159,
        IMP: 0.876338,
        INR: 97.865074,
        IQD: 1482.822256,
        IRR: 47713.703889,
        ISK: 146.991112,
        JEP: 0.876338,
        JMD: 179.272619,
        JOD: 0.803959,
        JPY: 162.61502,
        KES: 146.900362,
        KGS: 98.723749,
        KHR: 4540.305495,
        KMF: 498.430498,
        KPW: 1020.631215,
        KRW: 1645.308074,
        KWD: 0.348197,
        KYD: 0.939886,
        KZT: 585.157512,
        LAK: 24574.277166,
        LBP: 101901.637667,
        LKR: 336.812514,
        LRD: 226.857004,
        LSL: 22.146993,
        LTL: 3.348291,
        LVL: 0.685921,
        LYD: 6.282947,
        MAD: 10.664482,
        MDL: 20.12125,
        MGA: 5191.592158,
        MKD: 63.485198,
        MMK: 2380.944052,
        MNT: 3983.756865,
        MOP: 9.062988,
        MRU: 44.98116,
        MUR: 51.20995,
        MVR: 17.51596,
        MWK: 1967.815358,
        MXN: 23.117666,
        MYR: 5.068298,
        MZN: 72.428491,
        NAD: 22.146993,
        NGN: 1814.141401,
        NIO: 41.742384,
        NOK: 12.171273,
        NPR: 156.657517,
        NZD: 1.957467,
        OMR: 0.436559,
        PAB: 1.13396,
        PEN: 4.227566,
        PGK: 4.644123,
        PHP: 65.031632,
        PKR: 318.332726,
        PLN: 4.325477,
        PYG: 9089.813556,
        QAR: 4.127344,
        RON: 5.043521,
        RSD: 118.666893,
        RUB: 95.712458,
        RWF: 1606.720906,
        SAR: 4.251897,
        SBD: 9.6385,
        SCR: 16.387092,
        SDG: 680.729404,
        SEK: 11.16845,
        SGD: 1.509368,
        SHP: 0.891115,
        SLE: 25.83164,
        SLL: 23778.584117,
        SOS: 646.613438,
        SRD: 41.571326,
        STD: 23470.691101,
        SVC: 9.922321,
        SYP: 14743.865311,
        SZL: 22.146993,
        THB: 38.410322,
        TJS: 12.327053,
        TMT: 3.967826,
        TND: 3.43828,
        TOP: 2.73134,
        TRY: 43.159866,
        TTD: 7.705829,
        TWD: 37.19955,
        TZS: 3027.335833,
        UAH: 46.895583,
        UGX: 4178.679478,
        USD: 1.13396,
        UYU: 49.19846,
        UZS: 14707.773938,
        VES: 84.599519,
        VND: 29227.391108,
        VUV: 142.638691,
        WST: 3.229522,
        XAF: 664.573998,
        XAG: 0.035233,
        XAU: 0.000351,
        XCD: 3.06896,
        XDR: 0.847665,
        XOF: 664.573998,
        XPF: 119.331742,
        YER: 278.243504,
        ZAR: 21.749816,
        ZMK: 10207.007219,
        ZMW: 31.841636,
        ZWL: 365.13479,
      },
    };

    if (response.data.success) {
      rates = response.data.rates;
    } else {
      rates = dummy.rates;
    }

    localStorage.setItem("exchangeRates", JSON.stringify(rates));
    localStorage.setItem("exchangeRatesTimestamp", Date.now());

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

export default currencyConverterSlice.reducer;
