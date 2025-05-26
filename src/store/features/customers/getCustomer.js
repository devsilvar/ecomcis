import axios from "axios";
import { baseUrl } from "../../../utils/constant";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token = localStorage.getItem("authToken");

// Thunk to get a customer contact by ID
export const getCustomerContact = createAsyncThunk(
    "contacts/getCustomerContact",
    async (thunkApi) => {
        try {
            const response = await axios.get(
                `${baseUrl}users/contacts/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);

// Slice
const getCustomerContactSlice = createSlice({
    name: "getCustomerContact",
    initialState: {
        loading: false,
        data: [] || null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCustomerContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCustomerContact.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getCustomerContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default getCustomerContactSlice.reducer;
