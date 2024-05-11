"users/admin-profiles/";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApis",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://7388b71f-78f3-421c-a15d-97f8eb2b27d7-00-3euyvc8uiqwuh.kirk.replit.dev/api/v1/",
  }),
  endpoints: (builder) => ({
    // get all admins
    getAllAdmins: builder.query({
      query: () => "users/admin-profiles/",
    }),

    // Admin Details
    getAdminDetails: builder.query({
      query: (id) => `/users/adminprofile/${id}/`,
    }),

    // create a new admin
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "users/create_admin/",
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
} = adminApi;
