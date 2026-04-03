// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { User, LogOut, LayoutDashboard, ChevronDown, ShieldCheck, Mail, Fingerprint, Activity } from 'lucide-react';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showProfile, setShowProfile] = useState(false);
//   const [userInfo, setUserInfo] = useState<any>(null);

//   useEffect(() => {
//     const savedUser = localStorage.getItem('userInfo');
//     if (savedUser) setUserInfo(JSON.parse(savedUser));
//   }, [location]);

//   const handleLogout = () => {
//     localStorage.removeItem('userInfo');
//     setUserInfo(null);
//     setShowProfile(false);
//     navigate('/login');
//   };

//   const dashboardPath = userInfo?.role === 'admin' ? '/admin-dashboard' : '/userdashboard';

//   return (
//     <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-xl border-b border-slate-200/60 z-[100] transition-all">
//       <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
//         {/* Logo - Modern & Bold */}
//         {/* <Link to="/" className="flex items-center gap-2.5 group">
//           <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-lg shadow-slate-900/10">
//             <Activity className="text-white w-6 h-6" />
//           </div>
//           <span className="text-xl font-black text-slate-900 tracking-tight uppercase">
//             Pinnacle<span className="text-blue-600">.</span>
//           </span>
//         </Link> */}


//          <Link to="/" className="flex items-center gap-3 group">
//           {/* Container resized to w-12 h-12 (48px) */}
//             <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-md border border-slate-100 group-hover:scale-105 transition-all duration-300">
//               <img 
//                 src="/logo.png" 
//                 alt="Pinnacle Logo" 
//                 className="w-full h-full object-contain p-1.5" 
//                 onError={(e) => {
//                   console.error("Logo not found in public folder");
//                 }}
//               />
//             </div>
            
//             <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">
//               Pinnacle<span className="text-blue-600">.</span>
//             </span>
//         </Link>


//         {/* Right Section */}
//         <div className="flex items-center gap-4 relative">
//           {userInfo ? (
//             <div className="relative">
//               {/* Profile Trigger - Modern Pill Design */}
//               <button 
//                 onClick={() => setShowProfile(!showProfile)}
//                 className={`flex items-center gap-3 p-1.5 pr-4 rounded-2xl transition-all border shadow-sm active:scale-95 ${
//                   showProfile ? 'bg-white border-blue-200 ring-4 ring-blue-50' : 'bg-white border-slate-200 hover:border-blue-300'
//                 }`}
//               >
//                 <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-inner ${
//                   userInfo.role === 'admin' ? 'bg-slate-900 text-white' : 'bg-blue-600 text-white'
//                 }`}>
//                   <User size={18} />
//                 </div>
//                 <div className="text-left hidden sm:block">
//                   <p className="text-xs font-black text-slate-900 leading-none">{userInfo.fullName}</p>
//                   <div className="flex items-center gap-1 mt-1">
//                     <div className={`w-1.5 h-1.5 rounded-full ${userInfo.role === 'admin' ? 'bg-blue-500 animate-pulse' : 'bg-green-500'}`} />
//                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{userInfo.role}</p>
//                   </div>
//                 </div>
//                 <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${showProfile ? 'rotate-180' : ''}`} />
//               </button>

//               {/* FLOATING PROFILE CARD - Fintech Aesthetic */}
//               {showProfile && (
//                 <>
//                   <div className="fixed inset-0 z-[-1]" onClick={() => setShowProfile(false)}></div>
//                   <div className="absolute top-16 right-0 w-80 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 p-8 animate-in fade-in slide-in-from-top-4 duration-300">
                    
//                     <div className="flex flex-col items-center text-center mb-8">
//                       <div className="relative">
//                         <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-4 text-white shadow-2xl ${
//                           userInfo.role === 'admin' ? 'bg-slate-900 rotate-3' : 'bg-blue-600 -rotate-3'
//                         }`}>
//                           <User size={40} />
//                         </div>
//                         <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-md">
//                           <ShieldCheck size={16} className="text-blue-600" />
//                         </div>
//                       </div>
//                       <h3 className="text-2xl font-black text-slate-900 leading-tight">{userInfo.fullName}</h3>
//                       <p className="text-sm font-medium text-slate-400 mt-1">{userInfo.email}</p>
//                     </div>

//                     <div className="space-y-3 mb-8">
//                       <div className="flex items-center justify-between p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100">
//                         <div className="flex items-center gap-3">
//                           <ShieldCheck size={18} className="text-slate-400" />
//                           <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Access</span>
//                         </div>
//                         <span className="text-xs font-black text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full">{userInfo.role}</span>
//                       </div>
                      
//                       <div className="p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100 overflow-hidden">
//                         <div className="flex items-center gap-3 mb-2">
//                           <Fingerprint size={18} className="text-slate-400" />
//                           <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">System ID</span>
//                         </div>
//                         <p className="text-[10px] font-mono text-slate-400 break-all bg-white p-2 rounded-lg border border-slate-200/50">
//                           {userInfo._id}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="space-y-3">
//                       <Link 
//                         to={dashboardPath}
//                         onClick={() => setShowProfile(false)}
//                         className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-blue-600 transition shadow-xl shadow-slate-900/10 active:scale-95"
//                       >
//                         <LayoutDashboard size={18} /> Manage Dashboard
//                       </Link>
//                       <button 
//                         onClick={handleLogout}
//                         className="flex items-center justify-center gap-2 w-full py-4 bg-red-50 text-red-600 rounded-2xl font-bold text-sm hover:bg-red-600 hover:text-white transition active:scale-95"
//                       >
//                         <LogOut size={18} /> Terminate Session
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>
//           ) : (
//             <div className="flex items-center gap-4">
//               <Link to="/login" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition">Sign In</Link>
//               <Link 
//                 to="/signup" 
//                 className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-blue-600 transition shadow-lg shadow-slate-900/20 active:scale-95"
//               >
//                 Get Started
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  // 1. Listen for scroll to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Refresh user info on page change
  useEffect(() => {
    const savedUser = localStorage.getItem('userInfo');
    if (savedUser) setUserInfo(JSON.parse(savedUser));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    navigate('/login');
  };

  const dashboardPath = userInfo?.role === 'admin' ? '/admin-dashboard' : '/userdashboard';

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
      scrolled 
        ? "bg-white/90 backdrop-blur-md shadow-md h-16" 
        : "bg-transparent h-24"
    }`}>
      <div className="max-w-7xl mx-auto px-8 h-full flex justify-between items-center">
        
        {/* LOGO - White box removed, logo stands alone */}
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/logo.png" 
            alt="Pinnacle Logo" 
            className="h-10 w-auto object-contain transition-transform group-hover:scale-110" 
          />
          {/* <span className={`text-2xl font-black tracking-tighter uppercase transition-colors ${
            scrolled ? "text-slate-900" : "text-slate-900"
          }`}>
            Pinnacle<span className="text-blue-600">.</span>
          </span> */}
        </Link>

        {/* NAVIGATION LINKS */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/services" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 transition">Services</Link>
          
          {userInfo ? (
            <div className="flex items-center gap-6">
              <Link to={dashboardPath} className="text-xs font-black uppercase tracking-widest text-slate-900 hover:text-blue-600 transition flex items-center gap-2">
                 <LayoutDashboard size={16} /> Dashboard
              </Link>
              <button 
                onClick={handleLogout} 
                className="px-6 py-2 bg-red-50 text-red-600 rounded-xl font-bold text-xs hover:bg-red-600 hover:text-white transition border border-red-100 shadow-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/login" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition">Login</Link>
              <Link to="/signup" className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-xs hover:bg-blue-600 transition-all shadow-lg shadow-slate-900/10">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;