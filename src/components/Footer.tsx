import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-slate-800 pb-16">
        
        {/* Column 1: Brand & Bio */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <BarChart3 className="text-white w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white uppercase">Pinnacle</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Providing expert accounting, tax, and strategic financial consulting for businesses looking to scale with precision and clarity.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition-all"><Facebook size={18} /></a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition-all"><Twitter size={18} /></a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition-all"><Linkedin size={18} /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Services</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition">Tax Preparation</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Audit & Assurance</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Payroll Management</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Business Strategy</a></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Contact Us</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="text-blue-500 w-5 h-5 shrink-0" />
              <span>Delhi, India </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-blue-500 w-5 h-5" />
              <span>+91 9467362705</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-blue-500 w-5 h-5" />
              <span>team@pinnacleaccountingservices.in</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Stay Updated</h4>
          <p className="text-sm mb-4">Get the latest financial insights delivered to your inbox.</p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Email address" 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-blue-600 outline-none"
            />
            <button className="absolute right-2 top-2 bg-blue-600 p-1.5 rounded-lg hover:bg-blue-500 transition">
              <ArrowRight size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Area */}
      <div className="max-w-7xl mx-auto px-6 mt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
        <p>© 2021 Pinnacle Accounting Services. All Rights Reserved.</p>
        <div className="flex items-center gap-2 text-slate-400">
          <span>Designed & Developed with</span>
          <span className="text-blue-500">❤️</span>
          <span>by</span>
          <a 
            href="https://your-portfolio-link.com" // Replace with your actual portfolio, GitHub, or LinkedIn URL
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white font-semibold hover:text-blue-400 transition"
          >
            Your Name
          </a>
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
