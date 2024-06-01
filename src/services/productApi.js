import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../utils/constant";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("authToken")

    console.log("TOKEN:", token);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const ProductApi = createApi({
  reducerPath: "productApi",
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
        url: "products/create_products/",
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
  useGetProductByIdQuery,
  useSearchAllProductsQuery,
  useGetAllCategoriesQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useAddCategoriesMutation,
  useUpdateProductMutation,
  useCreateVariationMutation,
} = ProductApi;
