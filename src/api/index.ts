import axios from 'axios';
import { LH } from '../context/AuthContext';

export const api = axios.create({ baseURL: 'https://reqres.in/api' });

api.interceptors.request.use(
  (config) => {
    const localStorageJson = localStorage.getItem(LH);

    if (localStorageJson && config.headers) {
      const user = JSON.parse(localStorageJson);

      config.headers['Authorization'] = `Bearer ${user?.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
