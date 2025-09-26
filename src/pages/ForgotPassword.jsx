import { useState } from "react";
import axios from "axios";
import { Mail, KeyRound, Lock, Eye, EyeOff } from "lucide-react";
import axiosClient from "../Api/axiosClient"; // Adjust path as needed

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/api/auth/forgot-password", { email });

      alert("OTP sent to email");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      alert("Password reset successful! You can now login.");
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4 bg-gray-50">
      {step === 1 ? (
        <form
          onSubmit={sendOtp}
          className="bg-white border border-gray-200 shadow-xl p-8 rounded-2xl w-full max-w-md"
        >
          <div className="flex items-center space-x-3 group justify-center mb-4">
            <div className="relative">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors duration-300">
                <div className="w-3 h-3 bg-white rounded-sm"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-900 tracking-tight leading-none">
                Northeast
              </span>
              <span className="text-xs text-gray-500 font-medium tracking-wider uppercase leading-none">
                Travels
              </span>
            </div>
          </div>
          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Forgot Password
          </h2>

          {/* Email Input */}
          <div className="relative mb-6">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition duration-300 shadow-md"
          >
            Send OTP
          </button>
        </form>
      ) : (
        <form
          onSubmit={resetPassword}
          className="bg-white border border-gray-200 shadow-xl p-8 rounded-2xl w-full max-w-md"
        >
          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Reset Password
          </h2>

          {/* OTP Input */}
          <div className="relative mb-4">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          {/* New Password Input with Toggle */}
          <div className="relative mb-6">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition duration-300 shadow-md"
          >
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
}
