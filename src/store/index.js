import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "../services/api";
import { geoApi } from "../services/api";

import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([api.middleware, geoApi.middleware]),
  devTools: process.env.NODE_ENV !== "production",
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
setupListeners(store.dispatch);

export default store;
