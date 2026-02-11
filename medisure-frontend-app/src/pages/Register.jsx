import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUserTag } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const roleFromQuery = new URLSearchParams(location.search).get("role") || "consumer";

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: roleFromQuery,
  });
  const [loading, setLoading] = useState(false);

  // 🧠 Predefined roles (memoized)
  const roles = useMemo(
    () => ["manufacturer", "distributor", "retailer", "consumer"],
    []
  );

  // 🖋 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle registration
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("medisureUsers") || "[]");
    const isDuplicate = existingUsers.some(
      (u) => u.username === formData.username && u.role === formData.role
    );

    if (isDuplicate) {
      alert("⚠️ User already registered for this role.");
      return;
    }

    const newUser = {
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password,
      role: formData.role,
    };

    localStorage.setItem("medisureUsers", JSON.stringify([...existingUsers, newUser]));

    setLoading(true);
    setTimeout(() => {
      alert("✅ Registration successful!");
      navigate(`/login?role=${formData.role}`);
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0b0b12] via-[#1a1a2e] to-[#0b0b12] text-gray-100 relative overflow-hidden">
      {/* 🌌 Ambient Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-700/20 blur-3xl rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/20 blur-3xl rounded-full" />

      {/* 🔳 Form Card */}
      <div className="relative z-10 w-[90%] max-w-lg bg-[#1c1c2b]/90 backdrop-blur-xl p-10 rounded-3xl shadow-[0_0_50px_rgba(139,92,246,0.3)] border border-white/10 animate-fadeIn">
        <h2 className="text-4xl font-bold mb-4 text-white text-center">
          Create Your Account
        </h2>
        <p className="text-gray-400 mb-8 text-center">
          Register as{" "}
          <span className="text-purple-400 font-medium capitalize">
            {formData.role}
          </span>
        </p>

        {/* 🧾 Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role Selector */}
          <div className="relative">
            <FaUserTag className="absolute left-3 top-3.5 text-gray-400" />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-[#222238] border border-gray-600/50 rounded-lg text-gray-100 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Username */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="username"
              className="w-full pl-10 pr-4 py-3 bg-[#222238] border border-gray-600/50 rounded-lg text-gray-100 focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-400"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full pl-10 pr-4 py-3 bg-[#222238] border border-gray-600/50 rounded-lg text-gray-100 focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className="w-full pl-10 pr-4 py-3 bg-[#222238] border border-gray-600/50 rounded-lg text-gray-100 focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-400"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className="w-full pl-10 pr-4 py-3 bg-[#222238] border border-gray-600/50 rounded-lg text-gray-100 focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-lg text-white transition-all duration-300 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-600 hover:to-purple-600 shadow-[0_0_35px_rgba(139,92,246,0.6)]"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Already Registered */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate(`/login?role=${formData.role}`)}
            className="text-purple-400 hover:underline cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}