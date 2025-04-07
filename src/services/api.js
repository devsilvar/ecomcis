import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../utils/constant";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  refetchOnReconnect: true,
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => `products/products-filter`,
    }),
    getProductById: build.query({
      query: (id) => `products/product/${id}`,
    }),
    getCartItems: build.query({
      query: () => `cart/cart-items`,
    }),
    addToCart: build.mutation({
      query: (product) => ({
        url: `cart/add-to-cart`,
        method: "POST",
        body: product,
      }),
    }),
    addToWishlist: build.mutation({
      query: (product) => ({
        url: `cart/wishlist`,
        method: "POST",
        body: product,
      }),
    }),
    login: build.mutation({
      query: (user) => ({
        url: `users/login/`,
        method: "POST",
        body: user,
      }),
    }),
    register: build.mutation({
      query: (user) => ({
        url: `users/register/`,
        method: "POST",
        body: user,
      }),
    }),
    forgotPassword: build.mutation({
      query: (payload) => ({
        url: `users/password-reset/`,
        method: "POST",
        body: payload,
      }),
    }),
    resetPassword: build.mutation({
      query: (payload) => ({
        url: `users/reset-password/${payload.userId}/${payload.token}/`,
        method: "POST",
        body: payload.data,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddToCartMutation,
  useAddToWishlistMutation,
  useGetCartItemsQuery,
  useResetPasswordMutation,
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
} = api;
