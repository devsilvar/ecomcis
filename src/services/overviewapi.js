import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../utils/constant";

export const overviewApi = createApi({
  reducerPath: "overviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    // get dashboard overview
    getDashboardOverview: builder.query({
      query: () => "common/dashboard-data/",
    }),
  }),
});

export const { useGetDashboardOverviewQuery } = overviewApi;
