import axios from "axios";
import { baseUrl } from "../../../utils/constant";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token = localStorage.getItem("authToken");

// Thunk to add a customer contact
export const addCustomerContact = createAsyncThunk(
    "contacts/addCustomerContact",
    async ({data }, thunkApi) => {
        try {
            const response = await axios.post(
                `${baseUrl}users/contacts/`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
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
const addCustomerContactSlice = createSlice({
    name: "addCustomerContact",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCustomerContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCustomerContact.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(addCustomerContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default addCustomerContactSlice.reducer;
