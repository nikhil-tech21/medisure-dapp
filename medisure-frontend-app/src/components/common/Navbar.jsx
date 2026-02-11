import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Close dropdown if user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = (role) => {
    navigate(`/login?role=${role}`);
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-[#0f0f1a] via-[#1a1a2e] to-[#0b0b12] text-white px-6 py-4 flex justify-between items-center border-b border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
      {/* Brand Logo */}
      <h1 className="text-2xl font-bold tracking-wide text-purple-400 select-none cursor-pointer">
        MediSure
      </h1>

      {/* Login Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="bg-[#23233a] px-5 py-2 rounded-md hover:bg-[#2e2e47] active:scale-95 transition-all duration-200 shadow-md text-sm font-medium"
        >
          Login
        </button>

        {dropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-48 bg-[#1a1a2e]/95 backdrop-blur-xl text-gray-200 rounded-lg shadow-lg border border-white/10 animate-fadeIn z-50"
          >
            {["manufacturer", "distributor", "retailer", "consumer"].map((role) => (
              <button
                key={role}
                onClick={() => handleLogin(role)}
                className="block w-full text-left px-4 py-2 hover:bg-[#2e2e47] capitalize transition-all duration-200"
              >
                {role}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}