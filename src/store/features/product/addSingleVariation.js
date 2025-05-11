import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const token = localStorage.getItem("authToken")


export const addSingleVariation = createAsyncThunk(
    "products/addSingleVariation/", async (data, thunkApi) => {
        try {
            alert("entered api")
            const response = await axios.post(
                baseUrl + "products/variations/" ,
                data,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            return response.data
        } catch (error) {
            if(error.response.status === 401){
                localStorage.removeItem("authToken")
                sessionStorage.removeItem('isAuthenticated')
                toast.error(`Session Expired`);

                setTimeout(() => {
                    window.location.href = "/admin/login"
                }, 1500);
            }
            return thunkApi.rejectWithValue(error.response.data)
        }
    }
)


const addSingleVariationSlice = createSlice({
    name: "addSingleVariation",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(addSingleVariation.pending, (state) => {
            state.loading = true
        })
        .addCase(addSingleVariation.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null

            // refresh page
            toast(`Product variation added`);
         console.log("action.payload", action.payload) 
            setTimeout(() =>{
                window.location.href = "/admin/products/"
            }, 2000)

        })
        .addCase(addSingleVariation.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload

            if (action.payload.status === 401) {
                toast.error("Session expired. Redirecting to login page...");
                window.location.href = "/admin/login";
            } else {
                console.log("ERROR FROM SLICE->", action.payload);
            }
        })
    }
})

export default addSingleVariationSlice