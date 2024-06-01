// redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
export default store;
