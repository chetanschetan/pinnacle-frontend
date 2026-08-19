import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import SuccessModal from '../components/SuccessModal';

const Signup = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    location: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(''); // Clear any previous errors

  try {
    // 1. Send the data to your Node.js/Express backend
    const { data } = await API.post('/api/auth/register', formData);
    
    // 2. Instead of navigating away immediately, show the success prompt
    setShowModal(true); 

  } catch (err: any) {
    // Handle specific backend errors (e.g., "User already exists")
    setError(err.response?.data?.message || 'Something went wrong');
    console.error("Signup Error:", err);
  }
};

  const goToOnboarding = () => {
    setShowModal(false);
    navigate('/onboarding'); // Redirect to the 5 questions
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Create Account</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Location (e.g. Haryana)"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            required
          />
          <button className="w-full bg-blue-900 text-white p-3 rounded font-semibold hover:bg-blue-800 transition">
            Sign Up
          </button>
        </form>
      </div>
      <SuccessModal isOpen={showModal} onClose={goToOnboarding} />
    </div>
  );
};

export default Signup;