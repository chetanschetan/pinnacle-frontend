// // import axios from 'axios';

// // const API = axios.create({
// //   baseURL: 'http://localhost:5000/api', // Match your backend port
// //   withCredentials: true, // Crucial for httpOnly cookies
// // });

// // export default API;


// import axios from 'axios';

// const isProduction = import.meta.env.PROD

// const API = axios.create({
//   baseURL: isProduction 
//   ? 'http://Pinnaclebackend-env-1.eba-7vrhq8z5.us-east-1.elasticbeanstalk.com ' 
//   : 'http://localhost:5000/api', 
//   withCredentials: true,
// });

// export default API;


// import axios from 'axios';

// const isProduction = import.meta.env.PROD;

// const API = axios.create({
//   // Note: Standard practice is to add /api to the end of the production URL as well
//   // baseURL: isProduction 
//   //   ? 'http://Pinnaclebackend-env-1.eba-7vrhq8z5.us-east-1.elasticbeanstalk.com/api' 
//   //   : 'http://localhost:5000/api', 
//   baseURL: 'http://localhost:5000/api',
//   withCredentials: true,
// });

// // Add this interceptor to ensure the token is sent even if cookies aren't used
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;

// frontend/src/api/axios.ts
import axios from 'axios';

// Remove the /api from the base variable here so Sockets can use the root
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const API = axios.create({
  baseURL: `${BASE_URL}/api`, // Axios gets the /api suffix here
  withCredentials: true,
});

export default API;