import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { toast } from 'react-hot-toast'
import { logout } from '../store/authSlice' // If you have an auth slice
import { baseUrl } from '../utils/constant'

// 1. Base query to attach token
const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.token || localStorage.getItem("authToken")
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
    return headers
  },
})

// 2. Handle expired token or auth errors
const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401 && api.getState().auth?.token) {
    api.dispatch(logout())
    toast.error("Session expired. Please log in again.")
    window.location.href = '/login'
  }

  return result
}

// 3. Create the API
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 60 * 60 * 24, // optional cache time
  refetchOnReconnect: true,
  endpoints: (build) => ({
    // Get current user
    getUserDetails: build.query({
      query: () => 'users/active-user-details/',
    }),

    // Contact-related
   
  }),
})

// 4. Export hooks
export const {
  useGetUserDetailsQuery,
 
} = userApi;
