

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
