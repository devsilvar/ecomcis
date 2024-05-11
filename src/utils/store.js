import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "../services/api";
import { adminApi } from "../services/adminsApi";

export const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, adminApi.middleware),
});

setupListeners(store.dispatch);
