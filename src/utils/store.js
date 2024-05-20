import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { adminApi } from "../services/adminsApi";
import { ProductApi } from "../services/productApi";
import { overviewApi } from "../services/overviewapi";

export const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [overviewApi.reducerPath]: overviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ProductApi.middleware,
      adminApi.middleware,
      overviewApi.middleware
    ),
});

setupListeners(store.dispatch);
