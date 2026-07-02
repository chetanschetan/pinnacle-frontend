
import axios from 'axios';

// Remove the /api from the base variable here so Sockets can use the root
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const API = axios.create({
  baseURL: `${BASE_URL}/api`, // Axios gets the /api suffix here
  withCredentials: true,
});

export default API;
