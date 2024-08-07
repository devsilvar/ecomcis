import { combineReducers } from '@reduxjs/toolkit';

import signUpSlice from './features/auth/signUpFeature';
import logInSlice from './features/auth/loginInFeature';
import listProductSlice from './features/product/listProduct';
import getProductSlice from './features/product/getProduct';
import getCartSlicer from './features/cart/getCart';
import removeCartSlicer from './features/cart/removeFromCart';
import listCategorySlice from './features/product/listCategory';
import adminLogInSlice from './features/admin/auth/login';

import addProductSlice from './features/product/addPoduct';
import addToCartSlice from './features/cart/addToCart';

import listCarouselSlice from './features/product/listCarousel';
import removeProductSlice from './features/product/removeProduct';

import listAdminsSlice from './features/admin/admins/listAdmins';
import addAdminSlice from './features/admin/admins/createAdmin';

import dashboardDataSlice from './features/admin/dashboardFeature';
import getProfileSlice from './features/account/profile';

import getSessionSlice from './features/cart/getSession';
import getShippingAddressSlice from './features/account/getShippingAddress';
import addShippingAddressSlice from './features/account/addShippingAddress';
import createOrderSlice from './features/order/createOrder';
import getOrderSlice from './features/order/getOrder';
import getAdminCustomersSlice from './features/admin/customers';
import getAdminOrdersSlice from './features/admin/orders';
import getOrderDetailSlice from './features/admin/orderDetails';

import updateOrderStatusSlice from './features/admin/updateOrder';
import uploadImagesSlice from './features/admin/carousel';
import addCategorySlice from './features/product/addCategory';
import addVariationSlice from './features/product/addProductVariation';
import deleteProductSlice from './features/product/deleteProduct';
import deleteVariationSlice from './features/product/deleteVariation';
import addSingleVariationSlice from './features/product/addSingleVariation';


const rootReducer = combineReducers({
    signUp: signUpSlice.reducer,
    logIn: logInSlice.reducer,
    listProduct: listProductSlice.reducer,
    getProduct: getProductSlice.reducer,
    getCart: getCartSlicer.reducer,
    removeCart: removeCartSlicer.reducer,
    adminLogin: adminLogInSlice.reducer,
    listCategory: listCategorySlice.reducer,
    addProduct: addProductSlice.reducer,
    addToCart: addToCartSlice.reducer,
    listCarousel: listCarouselSlice.reducer,
    removeProduct: removeProductSlice.reducer,
    listAdmin: listAdminsSlice.reducer,
    addAdmin: addAdminSlice.reducer,
    dashboardData: dashboardDataSlice.reducer,
    getProfile: getProfileSlice.reducer,
    getSession: getSessionSlice.reducer,
    getShippingAddress: getShippingAddressSlice.reducer,
    addShippingAddress: addShippingAddressSlice.reducer,
    createOrder: createOrderSlice.reducer,
    getOrder: getOrderSlice.reducer,
    getCustomers: getAdminCustomersSlice.reducer,
    getAdminOrder: getAdminOrdersSlice.reducer,
    getOrderDetail: getOrderDetailSlice.reducer,
    updateOrderStatus: updateOrderStatusSlice.reducer,
    uploadImages: uploadImagesSlice.reducer,
    addCategory: addCategorySlice.reducer,
    addVariation: addVariationSlice.reducer,
    deleteProduct: deleteProductSlice.reducer,
    deleteVariation :deleteVariationSlice.reducer,
    addSingleVariation: addSingleVariationSlice.reducer,
  });
  
  export default rootReducer;
  