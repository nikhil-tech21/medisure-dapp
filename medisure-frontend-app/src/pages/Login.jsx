import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaLock, FaEnvelope } from "react-icons/fa";

import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpeg";
import image3 from "../assets/images/image3.jpg";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = new URLSearchParams(location.search).get("role") || "user";

  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // 🖼️ Memoized slides (avoids re-creation on each render)
  const slides = useMemo(
    () => [
      {
        image: image1,
        title: "Manufacturer — Capturing Trust in Every Transaction",
        desc: "Ensure every batch of medicine is registered on blockchain for transparent quality assurance and authenticity verification.",
      },
      {
        image: image2,
        title: "Distributor — Verified Medicines, Trusted Origins",
        desc: "Seamlessly track every product from factory to retailer using immutable blockchain records and smart validation.",
      },
      {
        image: image3,
        title: "Retailer — Smart Distribution Across Networks",
        desc: "Sell only verified medicines with real-time blockchain confirmation of authenticity and supply chain traceability.",
      },
    ],
    []
  );

  // 🕒 Auto-slide effect (optimized)
  useEffect(() => {
    const intervalId = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      5000
    );
    return () => clearInterval(intervalId);
  }, [slides.length]);

  // 🧠 Input handler
  const handleChange = (e) =>
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // 🔐 Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!agree) {
      alert("⚠️ Please agree to Terms & Conditions");
      return;
    }

    const users = JSON.parse(localStorage.getItem("medisureUsers") || "[]");
    const foundUser = users.find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password &&
        u.role === role
    );

    if (!foundUser) {
      alert("❌ Invalid credentials or unregistered user.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("userRole", role);
      navigate(`/${role}/dashboard`);
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0b0b12] via-[#141428] to-[#0b0b12] text-gray-100 relative overflow-hidden">
      {/* 🌌 Ambient Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-700/20 blur-3xl rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/20 blur-3xl rounded-full" />

      {/* 🔳 Main Card */}
      <div className="flex flex-col md:flex-row bg-[#161622]/90 backdrop-blur-2xl overflow-hidden shadow-2xl w-[95%] max-w-6xl min-h-[75vh] border border-white/10 rounded-3xl animate-fadeIn">
        {/* 🖼️ LEFT — Image Carousel */}
        <div className="md:w-1/2 relative overflow-hidden flex items-center justify-center bg-black">
          <div
            className="flex transition-transform duration-700 ease-in-out h-[350px] sm:h-[420px] md:h-[500px] lg:h-[520px]"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              width: `${slides.length * 100}%`,
            }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className="w-full flex-shrink-0 relative flex items-center justify-center"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover rounded-l-3xl"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a]/85 to-transparent rounded-l-3xl" />
                <div className="absolute bottom-8 left-8 right-8 z-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-snug">
                    {slide.title}
                  </h2>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {slide.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 🔘 Carousel Indicators */}
          <div className="absolute bottom-4 w-full flex justify-center space-x-2 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === currentSlide
                    ? "bg-purple-500 w-6 h-2"
                    : "bg-gray-600 w-2 h-2"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 🔐 RIGHT — Login Form */}
        <div className="md:w-1/2 flex items-center justify-center p-8 md:p-16">
          <div className="w-full max-w-md bg-[#1c1c2b]/80 p-10 rounded-2xl shadow-[0_0_40px_rgba(139,92,246,0.25)] border border-white/10">
            <h2 className="text-4xl font-bold mb-4 text-white tracking-tight">
              Login to MediSure
            </h2>
            <p className="text-gray-400 mb-8 text-base">
              Blockchain-secured access for{" "}
              <span className="text-purple-400 font-medium capitalize">
                {role}
              </span>
            </p>

            {/* 🧾 Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3.5 text-gray-400 text-lg" />
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={credentials.username}
                  onChange={handleChange}
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 text-base bg-[#222238] border border-gray-600/50 rounded-lg text-gray-100 focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-400"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <FaLock className="absolute left-3 top-3.5 text-gray-400 text-lg" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  className="w-full pl-10 pr-4 py-3 text-base bg-[#222238] border border-gray-600/50 rounded-lg text-gray-100 focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-400"
                  required
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agree}
                  onChange={() => setAgree((prev) => !prev)}
                  className="w-4 h-4 text-purple-500 rounded focus:ring-purple-400 bg-gray-700 border-gray-600"
                />
                <label htmlFor="agree">
                  I agree to the{" "}
                  <span className="text-purple-400 cursor-pointer hover:underline">
                    Terms & Conditions
                  </span>
                </label>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold text-lg text-white transition-all duration-300 ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-600 hover:to-purple-600 shadow-[0_0_35px_rgba(139,92,246,0.6)]"
                }`}
              >
                {loading ? "Authenticating..." : "Login"}
              </button>
            </form>

            {/* 🔗 Registration Link */}
            <p className="text-center text-gray-400 text-sm mt-6">
              New user?{" "}
              <span
                onClick={() => navigate(`/register?role=${role}`)}
                className="text-purple-400 hover:underline cursor-pointer"
              >
                Register here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}