import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-800 text-gray-100 text-center py-4 mt-auto shadow-inner">
      <p className="text-sm tracking-wide hover:text-white transition-all duration-300">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-white">MediSure</span> | Trusted & Secure
        Pharmaceutical Tracking
      </p>
    </footer>
  );
}