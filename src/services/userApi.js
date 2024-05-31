import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../utils/constant";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const UserApi = createApi({
  reducerPath: "userAPi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({

    // user details
    userDetails: builder.query({
        query: () => "users/active-user-details/",
    }),
   


  }),
});

export const {

  useUserDetailsQuery,

} = UserApi;
