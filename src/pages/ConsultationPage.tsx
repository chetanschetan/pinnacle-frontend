import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Navbar from '../components/Navbar';

// 1. Form Data Interface Definition
interface FormDataState {
  service: string;
  requirementType: string;
  incomeRange: string;
  incomeSources: string[];
  name: string;
  email: string;
  phone: string;
}

const ConsultationPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      alert("Please login or create an account to book your free consultation.");
      navigate('/login');
    }
  }, [navigate]);

  const [formData, setFormData] = useState<FormDataState>({
    service: '', 
    requirementType: '',
    incomeRange: '',
    incomeSources: [],
    name: '',
    email: '',
    phone: ''
  });

  const servicesList: string[] = ['Tax Preparation', 'Financial Advisory', 'Accounting', 'Other'];
  const requirementsList: string[] = ['Personal', 'Business', 'Non-Government', 'Charity Organization', 'Residential Society'];
  const incomeRanges: string[] = ['Less than Rs 2.5 Lakhs', 'Rs 2.5 - 4.9 Lakhs', 'Rs 5 - 10 Lakhs', 'Rs 10 - 50 Lakhs', 'More than Rs 50 Lakhs', 'Prefer not to say'];
  const sourceList: string[] = ['Salary', 'Business', 'Investments', 'Rental', 'Other'];

  const handleServiceSelect = (value: string): void => {
    setFormData(prev => ({
      ...prev,
      service: value 
    }));
  };

  // 2. Type-Safe Array Toggle Function
  const toggleArrayItem = (
    listName: keyof FormDataState, 
    value: string
  ): void => {
    setFormData(prev => {
      const currentList = prev[listName];
      if (Array.isArray(currentList)) {
        return {
          ...prev,
          [listName]: currentList.includes(value) 
            ? currentList.filter((i: string) => i !== value) 
            : [...currentList, value]
        };
      }
      return prev;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // 1. Phone Validation
    if (formData.phone.length !== 10) {
      alert("Error: Phone number must be exactly 10 digits.");
      return;
    }

    // 2. Form Field Validation
    if (!formData.service || !formData.requirementType || !formData.incomeRange) {
      alert("Please fill in all required fields marked with *");
      return;
    }

    try {
      setLoading(true);
      await API.post('/consultations/submit', { answers: formData });
      
      alert("Consultation submitted successfully!");
      navigate('/userdashboard');
    } catch (err: any) { 
      const errorMessage = err.response?.data?.message || "Submission failed. Please try again.";
      console.error("API Error:", err.response?.status, errorMessage);
      
      if (err.response?.status === 401) {
        alert("Session expired. Please log in again.");
        navigate('/login');
      } else {
        alert(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
          <div className="bg-blue-900 p-10 text-white text-center">
            <h1 className="text-3xl font-black italic">Book Free Consultation</h1>
            <p className="text-blue-200 mt-2 font-medium">Expert financial advice tailored to your profile.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-10">
            {/* 1. Services */}
            <div>
              <label className="block text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Interested Service *</label>
              <div className="grid grid-cols-2 gap-3">
                {servicesList.map(s => (
                  <button 
                    key={s} 
                    type="button" 
                    onClick={() => handleServiceSelect(s)}
                    className={`p-4 rounded-2xl border-2 text-sm font-bold transition-all duration-300 ${
                        formData.service === s 
                        ? 'border-blue-900 bg-blue-900 text-white shadow-lg shadow-blue-900/20 scale-[1.02]' 
                        : 'border-slate-100 text-slate-500 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Requirement Type */}
            <div>
              <label className="block text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Requirement For *</label>
              <select 
                required
                value={formData.requirementType}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({...formData, requirementType: e.target.value})} 
                className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold outline-none ring-2 ring-transparent focus:ring-blue-900 transition"
              >
                <option value="">Select Category</option>
                {requirementsList.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            {/* 3. Income Range */}
            <div>
              <label className="block text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Annual Income *</label>
              <div className="space-y-2">
                {incomeRanges.map(range => (
                  <label key={range} className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition ${formData.incomeRange === range ? 'bg-blue-50 border border-blue-100' : 'bg-slate-50 hover:bg-slate-100'}`}>
                    <input 
                      type="radio" 
                      name="income" 
                      required
                      checked={formData.incomeRange === range}
                      onChange={() => setFormData({...formData, incomeRange: range})} 
                      className="w-5 h-5 accent-blue-900" 
                    />
                    <span className={`text-sm font-bold ${formData.incomeRange === range ? 'text-blue-900' : 'text-slate-700'}`}>{range}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 4. Primary Income Sources */}
            <div>
              <label className="block text-sm font-black uppercase tracking-widest text-slate-400 mb-4">
                Primary Income Sources <span className="text-[10px] lowercase font-medium">(Optional)</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {sourceList.map(source => (
                  <button
                    key={source}
                    type="button"
                    onClick={() => toggleArrayItem('incomeSources', source)}
                    className={`px-6 py-3 rounded-2xl border-2 text-xs font-bold transition-all duration-200 ${
                      formData.incomeSources.includes(source)
                        ? 'border-blue-900 bg-blue-900 text-white shadow-lg shadow-blue-900/20 scale-[1.02]'
                        : 'border-slate-100 text-slate-500 bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    {source}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-slate-400 px-2">Full Name</p>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  required 
                  value={formData.name} 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, name: e.target.value})} 
                  className="w-full p-4 bg-slate-50 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-blue-900 transition" 
                />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-slate-400 px-2">Email Address</p>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  required 
                  value={formData.email} 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value})} 
                  className="w-full p-4 bg-slate-50 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-blue-900 transition" 
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <p className="text-[10px] font-black uppercase text-slate-400 px-2">Phone Number (10 Digits)</p>
                <input 
                  type="tel" 
                  placeholder="(+91) XXXXXXXXXX" 
                  required 
                  maxLength={10}
                  value={formData.phone} 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value.replace(/\D/g, ''); 
                    setFormData({...formData, phone: value});
                  }} 
                  className={`w-full p-4 bg-slate-50 rounded-2xl font-bold outline-none transition border-2 ${
                    formData.phone.length > 0 && formData.phone.length < 10 
                    ? 'border-red-200 focus:ring-red-500' 
                    : 'border-transparent focus:ring-blue-900'
                  }`} 
                />
                {formData.phone.length > 0 && formData.phone.length < 10 && (
                  <p className="text-[10px] text-red-500 font-bold px-2 italic animate-pulse">
                    Enter exactly 10 digits
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={formData.phone.length !== 10 || loading}
              className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all ${
                formData.phone.length === 10 
                  ? 'bg-blue-900 text-white hover:bg-black shadow-xl' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {loading ? "Submitting..." : "Submit Consultation"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;
