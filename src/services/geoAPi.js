import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const geoApi = createApi({
  reducerPath: 'geoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://nominatim.openstreetmap.org/',  prepareHeaders: (headers) => {
    headers.set('User-Agent', 'myapp/1.0 (yusuf@devrecruit.org)');
    return headers;
  }, }),
  endpoints: (builder) => ({
    getCoordinatesByAddress: builder.query({
      query: (address) => `search?q=${encodeURIComponent(address)}&format=json`,
    }),
  }),
});



export const { useGetCoordinatesByAddressQuery , useLazyGetCoordinatesByAddressQuery, } = geoApi;