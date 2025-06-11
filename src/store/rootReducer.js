import { combineReducers } from "@reduxjs/toolkit";

import signUpSlice from "./features/auth/signUpFeature";
import logInSlice from "./features/auth/loginInFeature";
import listProductSlice from "./features/product/listProduct";
import getProductSlice from "./features/product/getProduct";
import getCartSlicer from "./features/cart/getCart";
import removeCartSlicer from "./features/cart/removeFromCart";
import listCategorySlice from "./features/product/listCategory";
import adminLogInSlice from "./features/admin/auth/login";

import addProductSlice from "./features/product/addPoduct";
import addToCartSlice from "./features/cart/addToCart";

import listCarouselSlice from "./features/product/listCarousel";
import removeProductSlice from "./features/product/removeProduct";




import listAdminsSlice from "./features/admin/admins/listAdmins";
import addAdminSlice from "./features/admin/admins/createAdmin";
import dashboardDataSlice from "./features/admin/dashboardFeature";
import getProfileSlice from "./features/account/profile";

import getSessionSlice from "./features/cart/getSession";
import getShippingAddressSlice from "./features/account/getShippingAddress";
import addShippingAddressSlice from "./features/account/addShippingAddress";
import createOrderSlice from "./features/order/createOrder";
import getOrderSlice from "./features/order/getOrder";
import getAdminCustomersSlice from "./features/admin/customers";
import getAdminOrdersSlice from "./features/admin/orders";
import getOrderDetailSlice from "./features/admin/orderDetails";

import updateOrderStatusSlice from "./features/admin/updateOrder";
import uploadImagesSlice from "./features/admin/carousel";
import addCategorySlice from "./features/product/addCategory";
import deleteCategorySlice from "./features/product/deletsCategory";
import productSoldSlice from "./features/product/productsSold";

import addVariationSlice from "./features/product/addProductVariation";
import deleteProductSlice from "./features/product/deleteProduct";
import getAllProductsSlice  from "./features/product/getAllProducts";
import deleteVariationSlice from "./features/product/deleteVariation";
import addSingleVariationSlice from "./features/product/addSingleVariation";
import updateProductSlice from "./features/product/updateProduct";
import trendingProductSlice from "./features/product/trendingProduct";
import updateVariationSlice from "./features/product/updateVariations";
import wallxPaymentSlice from "./features/payment/wallX";
import getProductImageSlice from "./features/product/productImages";
import currencyConverterSlice from "./features/payment/currencyConverter";
import getNewsFlashSlice from "./features/newsFlash/get";
import addNewsFlashSlice from "./features/newsFlash/add";
import searchProductSlice from "./features/product/searchProduct";
import cartReducer from "./features/cart/saveToCart";
import wishlistReducer from "./features/cart/saveToWishlist";
import forgotPasswordSlice from "./features/auth/forgotPassword";
import resetPasswordSlice from "./features/auth/resetPassword";
import { geoApi } from "../services/api";
import listProductSizeSlice from "./features/product/listSizes";
import listProductColorSlice from "./features/product/listColors";
import filterProductSlice from "./features/product/productFilter";
import { api } from "../services/api";
import { authSlice } from "./authSlice";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authSlice.reducer,
  signUp: signUpSlice,
  logIn: logInSlice,
  listProduct: listProductSlice,
  getProduct: getProductSlice,
  getCart: getCartSlicer,
  removeCart: removeCartSlicer,
  adminLogin: adminLogInSlice,
  listCategory: listCategorySlice,
  addProduct: addProductSlice,
  addToCart: addToCartSlice,
  getAllProducts: getAllProductsSlice,
  listCarousel: listCarouselSlice,
  removeProduct: removeProductSlice,
  listAdmin: listAdminsSlice,
  addAdmin: addAdminSlice,
  dashboardData: dashboardDataSlice,
  getProfile: getProfileSlice,
  getSession: getSessionSlice,
  getShippingAddress: getShippingAddressSlice,
  addShippingAddress: addShippingAddressSlice,
  createOrder: createOrderSlice,
  getOrder: getOrderSlice,

  getCustomers: getAdminCustomersSlice,
  getAdminOrder: getAdminOrdersSlice,
  getOrderDetail: getOrderDetailSlice,
  updateOrderStatus: updateOrderStatusSlice,
  uploadImages: uploadImagesSlice,
  addCategory: addCategorySlice,
  deleteCategory: deleteCategorySlice,
  getProductsSold: productSoldSlice,
  addVariation: addVariationSlice,
  deleteProduct: deleteProductSlice,
  deleteVariation: deleteVariationSlice,
  addSingleVariation: addSingleVariationSlice,
  updateProduct: updateProductSlice,
  updateVariation: updateVariationSlice,
  wallxPayment: wallxPaymentSlice,
  trendingProduct: trendingProductSlice,
  getProductImage: getProductImageSlice,
  currency: currencyConverterSlice,
  getNewsFlash: getNewsFlashSlice,
  addNewsFlash: addNewsFlashSlice,
  searchProduct: searchProductSlice,
  cart: cartReducer,
  wishlist: wishlistReducer,
  forgotPassword: forgotPasswordSlice,
  resetPassword: resetPasswordSlice,
  listProductSize: listProductSizeSlice,
  listProductColor: listProductColorSlice,
  filterProduct: filterProductSlice,
});


export default rootReducer;
