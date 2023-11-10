import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const contactApi = axios.create({
  baseURL: 'https://connections-api.herokuapp.com/',
});

const setToken = token => {
  contactApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const clearToken = () => {
  contactApi.defaults.headers.common.Authorization = '';
};

export const registerThunk = createAsyncThunk(
  'register',
  async (credentials, thunkApi) => {
    try {
      const { data } = await contactApi.post('users/signup', credentials);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'login',
  async (credentials, thunkApi) => {
    try {
      const { data } = await contactApi.post('users/login', credentials);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'users/logout',
  async (_, thunkApi) => {
    try {
      await contactApi.post('users/login');
      clearToken();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    try {
      const { data } = await contactApi.get('/users/current');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
