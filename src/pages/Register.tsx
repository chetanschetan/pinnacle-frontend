import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("1. Form submit triggered");
    // Task #3 Validation: Phone must be 10 digits
    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Error: Phone number must be exactly 10 digits.");
      return;
    }

    setLoading(true);
    try {
      const response = await API.post('/auth/signup', formData);
    console.log("2. Backend responded with:", response.status, response.data);        // If the backend says "User Created" (Status 201)
      if (response.status === 201 || response.data.success) {
console.log("3. Success! Redirecting to OTP in 2 seconds...");        
        // THIS IS THE KEY: Move to the Verify page and pass the email
        navigate('/verify-email', { state: { email: formData.email } });
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-xl p-8">
        <h2 className="text-3xl font-black text-slate-900 mb-6 text-center">Create Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name *"
            required
            className="w-full p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            required
            className="w-full p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password *"
            required
            className="w-full p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            maxLength={10}
            placeholder="10-Digit Phone Number *"
            required
            className="w-full p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="City/Location *"
            required
            className="w-full p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-900 text-white font-black rounded-2xl hover:bg-black transition-all disabled:opacity-50 mt-4"
          >
            {loading ? "PROCESSING..." : "REGISTER NOW"}
          </button>
        </form>

        <p className="text-center mt-6 text-slate-500">
          Already have an account? <Link to="/login" className="text-blue-900 font-bold underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;