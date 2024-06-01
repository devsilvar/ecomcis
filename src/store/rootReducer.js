import { combineReducers } from '@reduxjs/toolkit';

import signUpSlice from './features/auth/signUpFeature';
import logInSlice from './features/auth/loginInFeature';
import listProductSlice from './features/product/listProduct';
import getProductSlice from './features/product/getProduct';
import getCartSlicer from './features/cart/getCart';
import removeCartSlicer from './features/cart/removeFromCart';

const rootReducer = combineReducers({
    signUp: signUpSlice.reducer,
    logIn: logInSlice.reducer,
    listProduct: listProductSlice.reducer,
    getProduct: getProductSlice.reducer,
    getCart: getCartSlicer.reducer,
    removeCart: removeCartSlicer.reducer,
  });
  
  export default rootReducer;
  