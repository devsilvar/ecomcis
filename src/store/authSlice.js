import { createSlice } from "@reduxjs/toolkit";
import {
  AUTH_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  USER_INFO_KEY,
} from "../libs/constants";
import { api } from "../services/api";

const initialState = {
  user: JSON.parse(localStorage.getItem(USER_INFO_KEY)) || null,
  token: localStorage.getItem(AUTH_TOKEN_KEY),
  refresh_token: localStorage.getItem(REFRESH_TOKEN_KEY),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refresh_token = null;
      localStorage.removeItem(USER_INFO_KEY);
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      sessionStorage.removeItem("isAuthenticated");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.access_token;
        state.refresh_token = payload.refresh_token;
        state.user = {
          email: payload.username,
          full_name: payload.full_name,
        };
        localStorage.setItem(
          USER_INFO_KEY,
          JSON.stringify({
            email: payload.username,
            full_name: payload.full_name,
          })
        );
        localStorage.setItem(AUTH_TOKEN_KEY, payload.access_token);
        localStorage.setItem(REFRESH_TOKEN_KEY, payload.refresh_token);
        sessionStorage.setItem("isAuthenticated", true);
      }
    );
  },
});

export const { logout } = authSlice.actions;
