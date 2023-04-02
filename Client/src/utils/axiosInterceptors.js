import axios from "axios";
import { logout } from "store/user/user-actions";

// axios Instance
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

// Adding a request interceptor
export const requestInterceptors = axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Adding a response interceptor
export const responseInterceptors = axiosInstance.interceptors.response.use(
  function (response) {
    if (response.status === 401) {
      logout();
      localStorage.clear();
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
