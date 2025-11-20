"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";

const page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/user/signup", form);
      toast.success(response.data.message, { position: "top-right" });
      setForm({ username: "", email: "", password: "" });
      router.push("/sign-in");
    } catch (err) {
      if (err.response) {
        console.log("API response:", err.response.data);
        if (err.response.data.warning) {
          toast.warning(err.response.data.warning, { position: "top-right" });
        } else if (err.response.data.message) {
          toast.warning(err.response.data.message, { position: "top-right" });
        } else if (err.response.data.error) {
          toast.error(err.response.data.error, { position: "top-right" });
        }
      } else {
        console.log("Unknown error:", err);
        toast.error("Something went wrong", { position: "top-right" });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="w-full max-w-md bg-[rgba(255,255,255,0.05)] backdrop-blur-lg border border-gray-700 rounded-3xl shadow-2xl p-8 animate-glowIn">
        <h2 className="text-3xl font-bold text-white text-center mb-8 tracking-wide">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div className="relative group">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-400 transition-colors" />
            <input
              type="text"
              placeholder="Username"
              value={form.username || ""}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-[rgba(255,255,255,0.1)] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-70 transition-all duration-300 backdrop-blur-sm shadow-inner"
            />
          </div>

          {/* Email */}
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-400 transition-colors" />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              required
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-[rgba(255,255,255,0.1)] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-70 transition-all duration-300 backdrop-blur-sm shadow-inner"
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-400 transition-colors" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-[rgba(255,255,255,0.1)] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-70 transition-all duration-300 backdrop-blur-sm shadow-inner"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-400 transition-colors font-medium"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg tracking-wide shadow-lg hover:shadow-indigo-400/50 hover:scale-105 transition-all duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Extra links */}
        <div className="mt-6 text-center text-gray-400">
          <p>
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-indigo-500 hover:underline cursor-pointer"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes glowIn {
          0% {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
            box-shadow: 0 0 0 rgba(0, 0, 0, 0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.5),
              0 0 40px rgba(139, 92, 246, 0.3);
          }
        }

        .animate-glowIn {
          animation: glowIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default page;
