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
  async (credential, thunkApi) => {
    try {
      const { data } = await contactApi.post('users/signup', credential);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'login',
  async (credential, thunkApi) => {
    try {
      const { data } = await contactApi.post('users/login', credential);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk('logout', async (_, thunkApi) => {
  try {
    await contactApi.post('users/logout');
    clearToken();
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    const savedToken = thunkApi.getState().auth.token;

    if (!savedToken) {
      return thunkApi.rejectWithValue('Token is not exist');
    }
    try {
      setToken(savedToken);
      const { data } = await contactApi.get('users/current');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
