import axios from 'axios';

// Development me localhost, Production (Vercel) par empty string
const BASE_URL = import.meta.env.VITE_API_URL || '';

const API = axios.create({
  // Agar BASE_URL empty hai to '/api' banega, jo relative path hai
  baseURL: BASE_URL ? `${BASE_URL}/api` : '/api', 
  withCredentials: true,
});

export default API;