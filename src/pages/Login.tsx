// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Lock, Mail, BarChart3, ArrowLeft, Loader2 } from 'lucide-react';
// import API from '../api/axios';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setLoading(true);
//   try {
//     const { data } = await API.post('/auth/login', { email, password });
//     console.log("Login Response:", data);

//     // 1. Token Save Karo (Axios Interceptor ke liye)
//     const token = data.token || data.user?.token;
//     if (token) {
//       localStorage.setItem('token', token);
//     }

//     // 2. Complete User Info Save Karo (Navbar aur Auth Checks ke liye)
//     const userPayload = data.user ? { ...data.user, token } : data;
//     localStorage.setItem('userInfo', JSON.stringify(userPayload));

//     if (data.user) {
//       localStorage.setItem('user', JSON.stringify(data.user));
//     }

//     // 3. Role Based Navigation
//     const userRole = data.role || data.user?.role;

//     if (userRole === 'admin') {
//       navigate('/admin-dashboard');
//     } else {
//       navigate('/userdashboard');
//     }

//   } catch (err: any) {
//     alert(err.response?.data?.message || "Login failed");
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
//         <div className="flex justify-center mb-6">
//           <div className="bg-blue-900 p-3 rounded-xl shadow-lg">
//             <BarChart3 className="text-white w-8 h-8" />
//           </div>
//         </div>
//         <h2 className="text-3xl font-black text-slate-900">Sign in to Pinnacle</h2>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-10 px-10 shadow-2xl rounded-[2.5rem] border border-slate-100">
//           <form className="space-y-6" onSubmit={handleLogin}>
//             <div>
//               <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
//               <div className="relative">
//                 <Mail className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
//                 <input
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-900 outline-none transition"
//                   placeholder="Enter Email"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
//               <div className="relative">
//                 <Lock className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
//                 <input
//                   type="password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-900 outline-none transition"
//                   placeholder="Enter password"
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full flex justify-center py-4 px-4 bg-blue-900 text-white rounded-2xl font-bold text-lg hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 disabled:opacity-70"
//             >
//               {loading ? <Loader2 className="animate-spin" /> : "Sign in"}
//             </button>
//             <p>
//               Don't have an account? 
//               <Link to="/signup" className="text-blue-600"> Register here</Link>
//             </p>
//             <Link to="/" className="flex items-center justify-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-900 transition mt-4">
//               <ArrowLeft size={16} /> Back to Home
//             </Link>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, BarChart3, ArrowLeft, Loader2 } from 'lucide-react';
import API from '../api/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post('/auth/login', { email, password });
      console.log("Login Response:", data);

      // CRITICAL FIX: Clean previous session data to prevent cross-account clashes
      localStorage.clear();

      // 1. Token Save Karo
      const token = data.token || data.user?.token;
      if (token) {
        localStorage.setItem('token', token);
      }

      // 2. Complete User Info & Role Save Karo
      const userPayload = data.user ? { ...data.user, token } : data;
      localStorage.setItem('userInfo', JSON.stringify(userPayload));

      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      // 3. Role-Based Explicit Navigation
      const userRole = data.role || data.user?.role;

      if (userRole === 'admin') {
        navigate('/admin-dashboard', { replace: true });
      } else {
        navigate('/userdashboard', { replace: true });
      }

    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-900 p-3 rounded-xl shadow-lg">
            <BarChart3 className="text-white w-8 h-8" />
          </div>
        </div>
        <h2 className="text-3xl font-black text-slate-900">Sign in to Pinnacle</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-10 shadow-2xl rounded-[2.5rem] border border-slate-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-900 outline-none transition"
                  placeholder="Enter Email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-900 outline-none transition"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-4 px-4 bg-blue-900 text-white rounded-2xl font-bold text-lg hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Sign in"}
            </button>
            <p>
              Don't have an account? 
              <Link to="/signup" className="text-blue-600"> Register here</Link>
            </p>
            <Link to="/" className="flex items-center justify-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-900 transition mt-4">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;