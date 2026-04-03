import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, BarChart3, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header / Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
              <ShieldCheck size={16} /> Verified Accounting Firm
            </div>
            <h1 className="text-6xl font-extrabold leading-tight text-slate-900 mb-6">
              Precision in <span className="text-blue-900">Numbers</span>, Excellence in Strategy.
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              We handle your taxes, audits, and financial planning so you can focus on scaling your business. Simple, secure, and professional.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 px-8 py-4 bg-blue-900 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:bg-blue-800 transition">
                {/* Start Consultation <ArrowRight size={20} /> */}
                <Link 
                  to="/onboarding" 
                  className="bg-white px-8 py-4 rounded-full font-bold text-blue-900 shadow-xl hover:scale-105 transition transform"
                >
                  Start Your Free Consultation
                </Link>
              </button>
              <div className="flex items-center gap-3 px-6 py-4">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" />)}
                </div>
                <span className="text-sm font-medium text-slate-500">Trusted by 500+ Businesses</span>
              </div>
            </div>
          </div>

          {/* Right Side: Professional Visual */}
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-900/5 rounded-full blur-3xl" />
            <div className="relative bg-white p-4 rounded-3xl shadow-2xl border border-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800" 
                alt="Accounting Dashboard" 
                className="rounded-2xl w-full h-[400px] object-cover"
              />
              {/* Floating Stat Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-xl text-green-600">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Tax Compliance</p>
                  <p className="text-xl font-black">100% Secure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;