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
import addShippingAddressSlice, { addShippingAddress } from './features/account/addShippingAddress';

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
  });
  
  export default rootReducer;
  