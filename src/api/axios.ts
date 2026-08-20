import axios, { InternalAxiosRequestConfig } from 'axios';

// Fallback active Cloudflare Tunnel URL
const BASE_URL = import.meta.env.VITE_API_URL || 'https://yarn-harrison-card-another.trycloudflare.com/api';

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Token to every request
API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default API;