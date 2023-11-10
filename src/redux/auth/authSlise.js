import { isAnyOf } from '@reduxjs/toolkit';
import {
  registerThunk,
  logoutThunk,
  loginThunk,
  refreshThunk,
} from './authOperations';

const initialState = {
  user: {
    name: '',
    email: '',
  },
  token: '',
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
  isLoading: false,
};

const authSlise = {
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.user.name = payload.name;
        state.user.email = payload.email;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logoutThunk.fulfilled, (state, { payload }) => {
        return (state = initialState);
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(refreshThunk.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addMatcher(
        isAnyOf(
          refreshThunk.pending,
          registerThunk.pending,
          loginThunk.pending,
          logoutThunk.pending
        ),
        (state, { payload }) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          refreshThunk.rejected,
          registerThunk.rejected,
          loginThunk.rejected,
          logoutThunk.rejected
        ),
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
};

export const authReducer = authSlise.reducer;
