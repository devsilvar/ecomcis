import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../utils/constant";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers) => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("authToken");
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

export const adminApi = createApi({
  reducerPath: "adminApis",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    // get all admins
    getAllAdmins: builder.query({
      query: () => "users/admin-list/",
    }),

    // Admin Details
    getAdminDetails: builder.query({
      query: (id) => `users/adminprofile/${id}/`,
    }),

    // create a new admin
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "users/create_admin/",
        method: "POST",
        body: data,
      }),
    }),

    // unlock admin
    unlockAdmin: builder.mutation({
      query: (id) => ({
        url: `users/admin/unlock${id}`,
        method: "POST",
      }),
    }),

    // unlock admin
    lockAdmin: builder.mutation({
      query: (id) => ({
        url: `users/admin/lock${id}`,
        method: "POST",
      }),
    }),

    // Admin Login
    adminLogin: builder.mutation({
      query: (data) => ({
        url: "users/admin/login/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllAdminsQuery,
  useGetAdminDetailsQuery,
  useCreateAdminMutation,
  useAdminLoginMutation,
  useUnlockAdminMutation,
  useLockAdminMutation,
} = adminApi;
