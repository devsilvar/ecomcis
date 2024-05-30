import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../utils/constant";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers) => {
    const token = JSON.parse(localStorage.getItem("authToken"));

    if (token) {
      // headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const AuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({



    // log in user
    loginUser: builder.mutation({
      query: (payload) => ({
        url: "users/login/",
        method: "POST",
        body: payload,
      }),
    }),
    
    // sign up user
    signUp: builder.mutation({
      query: (payload) => ({
        url: "users/register/",
        method: "POST",
        body: payload,
      }),
    }),


  }),
});

export const {

  useLoginUserMutation,
  useSignUpMutation,

} = AuthApi;
