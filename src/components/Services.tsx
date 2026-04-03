import React, { useState, useEffect } from 'react';
import { ShieldCheck, PieChart, Users, Landmark, FileText, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';

const services = [
  {
    title: "Tax Planning & Prep",
    desc: "Strategic tax minimization and precise filing for individuals and corporations.",
    icon: <ShieldCheck className="w-8 h-8 text-blue-900" />,
    color: "bg-blue-50"
  },
  {
    title: "Audit & Assurance",
    desc: "Independent, rigorous examination of financial records to ensure total compliance.",
    icon: <Landmark className="w-8 h-8 text-blue-900" />,
    color: "bg-indigo-50"
  },
  {
    title: "Payroll Management",
    desc: "Seamless, automated payroll processing with tax withholding and direct deposit.",
    icon: <Users className="w-8 h-8 text-blue-900" />,
    color: "bg-slate-50"
  },
  {
    title: "Business Consulting",
    desc: "Data-driven insights to optimize your cash flow and scale your business safely.",
    icon: <PieChart className="w-8 h-8 text-blue-900" />,
    color: "bg-blue-50"
  },
  {
    title: "Financial Statements",
    desc: "Accurate balance sheets and income statements prepared for stakeholders.",
    icon: <FileText className="w-8 h-8 text-blue-900" />,
    color: "bg-indigo-50"
  },
  {
    title: "M&A Advisory",
    desc: "Professional guidance through mergers, acquisitions, and business sales.",
    icon: <Briefcase className="w-8 h-8 text-blue-900" />,
    color: "bg-slate-50"
  }
];

const Services = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMenu = () => setIsOpen(false);
  return (
    <section id="services" className="pt-7 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/logo.png" 
              alt="Pinnacle Logo" 
              className="h-10 w-auto object-contain transition-transform group-hover:scale-110" 
            />
        </Link>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-4">Our Expertise</h2>
          <p className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Comprehensive Financial Solutions for Modern Firms
          </p>
          <div className="h-1.5 w-24 bg-blue-900 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div 
              key={i} 
              className="group p-10 rounded-[2rem] border border-slate-100 bg-white hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className={`${s.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                {s.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-900 transition-colors">
                {s.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {s.desc}
              </p>
              <div className="mt-8 flex items-center gap-2 text-blue-900 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More <span className="text-lg">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;