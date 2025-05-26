import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from '../../../utils/constant'

const token = localStorage.getItem("authToken");


export const updateCustomerContact = createAsyncThunk(
  'customer/updateCustomerContact',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.patch(`${baseUrl}users/contacts/`, payload,     {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to update contact')
    }
  }
)

const initialState = {
  data: [] || null,
  loading: false,
  error: null,
}

const updateCustomerContactSlice = createSlice({
  name: 'updateCustomerContact',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateCustomerContact.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCustomerContact.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(updateCustomerContact.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default updateCustomerContactSlice.reducer
