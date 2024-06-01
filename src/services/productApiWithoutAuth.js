import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../utils/constant";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  // prepareHeaders: (headers) => {
  //   // const token = localStorage.getItem("authToken")

  //   // console.log("TOKEN:", token);

  //   // if (token) {
  //   // //   headers.set("Authorization", `Bearer ${token}`);
  //   // }
  //   return headers;
  // },
});

export const ProductApiWithoutAuth = createApi({
  reducerPath: "productApiWithoutAuth",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    // get all products
    getAllProducts: builder.query({
      query: () => "products/products_list/",
    }),

    // search for products
    searchAllProducts: builder.query({
      query: (product) => `products/search?q=${product}`,
    }),

    // get all categories
    getAllCategories: builder.query({
      query: () => "products/categories/list/",
    }),

    // getSingleProduct
    getProductById: builder.query({
      query: (id) => `products/product-detail/${id}`,
    }),

    


  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useSearchAllProductsQuery,
  useGetAllCategoriesQuery,
} = ProductApiWithoutAuth;
