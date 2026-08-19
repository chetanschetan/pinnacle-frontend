// import axios from 'axios';

// // Development me localhost, Production (Vercel) par empty string
// const BASE_URL = import.meta.env.VITE_API_URL || '';

// const API = axios.create({
//   // Agar BASE_URL empty hai to '/api' banega, jo relative path hai
//   baseURL: BASE_URL ? `${BASE_URL}/api` : '/api', 
//   withCredentials: true,
// });

// export default API;

// import axios from 'axios';

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'https://pinnacle-backend-1-qyyx.onrender.com/api',
//   withCredentials: true,
// });

// export default API;

import axios from 'axios';

// Vercel Proxy will redirect '/api' requests to your EC2 IP http://13.233.157.176:5000/api
const API = axios.create({
  baseURL: 'https://noticed-visiting-option-occupational.trycloudflare.com/api', 
  withCredentials: true,
});

// Request Interceptor: Attach Token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Ya jahan aap token save karte ho
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;