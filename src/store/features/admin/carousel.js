import axios from "axios";
import { baseUrl } from "../../../utils/constant";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';

const token = localStorage.getItem("authToken");

export const uploadImages = createAsyncThunk(
  "images/upload",
  async (images, thunkApi) => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await axios.post(
        baseUrl + "products/coverpage-carousel/add/",
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.image_urls;
    } catch (error) {
  //    toast.error("Image upload failed!"); // Display toast notification for error
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const uploadImagesSlice = createSlice({
  name: "uploadImages",
  initialState: {
    loading: false,
    imageUrls: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.loading = false;
        state.imageUrls = action.payload;
        state.error = null;
      //  toast.success("Images uploaded successfully!"); // Display toast notification for success
        // reload
//        window.location.reload();
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default uploadImagesSlice.reducer;
