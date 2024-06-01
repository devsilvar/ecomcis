import { combineReducers } from '@reduxjs/toolkit';

import signUpSlice from './features/auth/signUpFeature';
import logInSlice from './features/auth/loginInFeature';
import listProductSlice from './features/product/listProduct';
import getProductSlice from './features/product/getProduct';

const rootReducer = combineReducers({
    signUp: signUpSlice.reducer,
    logIn: logInSlice.reducer,
    listProduct: listProductSlice.reducer,
    getProduct: getProductSlice.reducer,
  });
  
  export default rootReducer;
  