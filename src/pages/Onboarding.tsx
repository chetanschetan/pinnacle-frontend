import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, Shield, LayoutDashboard, LogOut } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('userInfo');
    if (savedUser) setUserInfo(JSON.parse(savedUser));
    
    // Logic to handle navbar transition on scroll
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    navigate('/login');
  };

  const dashboardPath = userInfo?.role === 'admin' ? '/admin-dashboard' : '/userdashboard';

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm h-16" : "bg-transparent h-20"
      }`}>
        <div className="max-w-7xl mx-auto px-8 h-full flex justify-between items-center">
          
          {/* LOGO SECTION - Now using /logo.png from public folder */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/logo.png" 
              alt="Pinnacle Logo" 
              className="h-10 w-auto object-contain transition-transform group-hover:scale-110" 
              onError={(e) => (e.currentTarget.style.display = 'none')} 
            />
            {/* <span className="text-xl font-black tracking-tighter uppercase text-slate-900">
              Pinnacle<span className="text-blue-600">.</span>
            </span> */}
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/services" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 transition">Services</Link>
            <div className="h-4 w-[1px] bg-slate-200"></div>
            
            {userInfo ? (
              <div className="flex items-center gap-4">
                <Link to={dashboardPath} className="text-xs font-black uppercase tracking-widest text-slate-900 hover:text-blue-600 transition flex items-center gap-2">
                   <LayoutDashboard size={14} /> Dashboard
                </Link>
                <button onClick={handleLogout} className="px-5 py-2 bg-red-50 text-red-600 rounded-xl font-bold text-xs hover:bg-red-600 hover:text-white transition border border-red-100">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link to="/login" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition">Login</Link>
                <Link to="/signup" className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-blue-600 transition-all shadow-lg shadow-slate-900/10">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            <div className="w-full lg:w-3/5 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="inline-flex items-center gap-2 bg-slate-50 text-slate-500 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] border border-slate-100">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                Strategic Financial Management
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight">
                High-Performance <br />
                <span className="text-blue-600 italic">Accounting.</span> <br /> 
                Built for Scale.
              </h1>
              
              <p className="text-base sm:text-lg text-slate-500 max-w-lg leading-relaxed font-medium">
                We provide the structural financial oversight modern firms require. From tax compliance to advisory, we turn complexity into clarity.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {userInfo ? (
                  <Link to="/book-consultation" className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-slate-900/10">
                    Book Consultation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <>
                    <Link to="/signup" className="inline-flex items-center justify-center px-8 py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition shadow-xl shadow-slate-900/10 active:scale-95">
                      Get Started Free
                    </Link>
                    <Link to="/login" className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition active:scale-95">
                      Client Login
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Image Container */}
            <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-50 rounded-full blur-2xl opacity-60"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-slate-100 rounded-full blur-2xl opacity-60"></div>
                
                <div className="relative rounded-[2rem] overflow-hidden border-[6px] border-white shadow-xl transition-all duration-700">
                  <img 
                    src="https://images.unsplash.com/photo-1554224155-1696413575b9?auto=format&fit=crop&q=80&w=800" 
                    alt="Professional Context" 
                    className="w-full aspect-[4/5] object-cover"
                  />
                  
                  <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-900 p-2 rounded-lg">
                        <Shield className="text-white w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Tier-1 Security</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SSL Encrypted</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;