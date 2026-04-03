import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../api/axios'; // Your axios instance

const VerifyEmail: React.FC = () => {
  const [otp, setOtp] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the email passed from the Register page state
  const email = location.state?.email || "";

  // Resend Timer Logic
  // 1. Update the Resend Timer Logic in your component
    useEffect(() => {
    let interval: number; // Use 'number' instead of NodeJS.Timeout

    if (timer > 0) {
        interval = window.setInterval(() => {
        setTimer((prev) => prev - 1);
        }, 1000);
    }

    // Cleanup function to stop the timer if the user leaves the page
    return () => {
        if (interval) window.clearInterval(interval);
    };
    }, [timer]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return alert("Please enter a 6-digit code");

    setLoading(true);
    try {
      const response = await API.post('/auth/verify-email', { email, otp });
      alert(response.data.message);
      
      // Since backend sends user data and sets cookie on success:
      // Update your Global State (Redux/Context) here if needed
      navigate('/userdashboard'); 
    } catch (err: any) {
      alert(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    try {
      await API.post('/auth/resend-otp', { email }); // You'll need this route
      setTimer(60);
      alert("New code sent to your email!");
    } catch (err) {
      alert("Failed to resend code");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 text-center">
        <h2 className="text-3xl font-black text-slate-900 mb-2">Check Your Email</h2>
        <p className="text-slate-500 mb-8">
          We sent a 6-digit verification code to <br />
          <span className="font-bold text-slate-800">{email}</span>
        </p>

        <form onSubmit={handleVerify} className="space-y-6">
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            placeholder="000000"
            className="w-full text-center text-4xl font-black tracking-[0.5em] p-5 bg-slate-100 rounded-3xl border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-900 text-white font-black rounded-2xl hover:bg-black transition-all disabled:opacity-50"
          >
            {loading ? "VERIFYING..." : "VERIFY ACCOUNT"}
          </button>
        </form>

        <div className="mt-8">
          <p className="text-slate-500 text-sm">
            Didn't receive the code?
          </p>
          <button
            onClick={handleResend}
            disabled={timer > 0}
            className={`mt-2 font-bold uppercase tracking-wider text-sm ${
              timer > 0 ? "text-slate-300" : "text-blue-600 hover:text-blue-800 underline"
            }`}
          >
            {timer > 0 ? `Resend code in ${timer}s` : "Resend Code Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;