import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { adminApi } from "../services/adminsApi";
import { ProductApi } from "../services/productApi";
import { overviewApi } from "../services/overviewapi";
import { CartApi } from "../services/cartApi";
import { AuthApi } from "../services/authApi";
import { UserApi } from "../services/userApi";


export const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [overviewApi.reducerPath]: overviewApi.reducer,
    [CartApi.reducerPath]: CartApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ProductApi.middleware,
      adminApi.middleware,
      overviewApi.middleware,
      CartApi.middleware,
      AuthApi.middleware,
      UserApi.middleware,
    ),
});

setupListeners(store.dispatch);
