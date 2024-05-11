import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://7388b71f-78f3-421c-a15d-97f8eb2b27d7-00-3euyvc8uiqwuh.kirk.replit.dev/api/v1/",
  }),
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

    // add categories
    addCategories: builder.mutation({
      query: (data) => ({
        url: "products/categories/add/",
        method: "POST",
        body: data,
      }),
    }),

    // create a new product
    createProduct: builder.mutation({
      query: (product) => ({
        url: "products/add_products/",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["getAllProducts"],
    }),

    // update product

    updateProduct: builder.mutation({
      query: (data) => ({
        url: "products/update_product",
        method: "PUT",
        body: data,
      }),
    }),

    // delete a new product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: "products/delete_products/",
        method: "POST",
        body: id,
      }),
    }),

    // create variation

    createVariation: builder.mutation({
      query: (data) => ({
        url: "products/variations/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useSearchAllProductsQuery,
  useGetAllCategoriesQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useAddCategoriesMutation,
  useUpdateProductMutation,
  useCreateVariationMutation,
} = api;
