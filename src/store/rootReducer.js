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
  });
  
  export default rootReducer;
  