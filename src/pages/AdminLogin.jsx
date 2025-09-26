import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../Api/axiosClient"; // Adjust path as needed

import { AuthContext } from "../context/AuthContext";
import { Lock, Mail, LoaderCircle } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  // If an admin is already logged in, redirect them away from the login page
  useEffect(() => {
    if (user && user.role === 'admin') {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await axiosClient.post("/api/auth/login", {
  email,
  password,
});


      // CRITICAL STEP: Verify the user has the 'admin' role
      if (data.role !== "admin") {
        setError("Access Denied. You do not have admin privileges.");
        setLoading(false);
        return;
      }

      // If the role is correct, log the admin in using the global context
      login(data);
      // The useEffect will handle the redirect once the user state is updated
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <div className="text-center mb-8">
            <div className="inline-block bg-black p-3 rounded-xl mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 7L12 12L22 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 12V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
            <p className="text-gray-500 mt-2">Please sign in to manage the website.</p>
        </div>
        
        {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6 text-center font-medium">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              type="email"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 flex items-center justify-center"
          >
            {loading ? <LoaderCircle className="animate-spin"/> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
