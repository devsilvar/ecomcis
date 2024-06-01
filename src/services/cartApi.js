import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../utils/constant";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("authToken");

    console.log("TOKEN:", token);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const CartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    // get all products
    // getAllProducts: builder.query({
    //   query: () => "products/products_list/",
    // }),


    // get cart item
    getCartItem: builder.query({
      query: (customer_id) => `cart/cart-items/${customer_id}`,
    }),

    // get all categories
    // getAllCategories: builder.query({
    //   query: () => "products/categories/list/",
    // }),

    // getSingleProduct
    // getProductById: builder.query({
    //   query: (id) => `products/product-detail/${id}`,
    // }),

    // add categories
    addToCart: builder.mutation({
      query: (data) => ({
        url: "cart/add-to-cart/",
        method: "POST",
        body: data,
      }),
    }),

    // create a new product
    // createProduct: builder.mutation({
    //   query: (product) => ({
    //     url: "products/create_products/",
    //     method: "POST",
    //     body: product,
    //   }),
    //   invalidatesTags: ["getAllProducts"],
    // }),

    // update product

    // updateProduct: builder.mutation({
    //   query: (data) => ({
    //     url: "products/update_product",
    //     method: "PUT",
    //     body: data,
    //   }),
    // }),

    // delete a new product
    // deleteProduct: builder.mutation({
    //   query: (id) => ({
    //     url: "products/delete_products/",
    //     method: "POST",
    //     body: id,
    //   }),
    // }),

    // create variation

    // createVariation: builder.mutation({
    //   query: (data) => ({
    //     url: "products/variations/",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),

  }),
});

export const {
//   useGetAllProductsQuery,
//   useGetProductByIdQuery,
//   useSearchAllProductsQuery,
//   useGetAllCategoriesQuery,
  useAddToCartMutation,
  useGetCartItemQuery,
//   useDeleteProductMutation,
//   useAddCategoriesMutation,
//   useUpdateProductMutation,
//   useCreateVariationMutation,
} = CartApi;
