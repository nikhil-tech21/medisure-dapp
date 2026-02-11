import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCapsules,
  FaClipboardList,
  FaIndustry,
  FaFlask,
  FaBarcode,
  FaCheckCircle,
} from "react-icons/fa";

export default function ManufacturerDashboard() {
  const navigate = useNavigate(); // ✅ added

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0b12] via-[#14142b] to-[#0b0b12] text-gray-100 p-8 md:p-14 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-md">
          Manufacturer Dashboard
        </h1>
        <p className="text-gray-400 mt-3 text-lg">
          Register new medicine batches, track quality tests, and record them on blockchain.
        </p>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div className="bg-[#1c1c2b]/90 p-6 rounded-2xl border border-white/10 text-center shadow-[0_0_40px_rgba(99,102,241,0.3)]">
          <FaCapsules className="mx-auto text-4xl text-indigo-400 mb-3" />
          <h3 className="text-xl font-semibold text-white">Total Batches</h3>
          <p className="text-gray-400 mt-1 text-sm">128 registered</p>
        </div>

        <div className="bg-[#1c1c2b]/90 p-6 rounded-2xl border border-white/10 text-center shadow-[0_0_40px_rgba(139,92,246,0.3)]">
          <FaFlask className="mx-auto text-4xl text-purple-400 mb-3" />
          <h3 className="text-xl font-semibold text-white">Quality Tests</h3>
          <p className="text-gray-400 mt-1 text-sm">92 passed, 3 pending</p>
        </div>

        <div className="bg-[#1c1c2b]/90 p-6 rounded-2xl border border-white/10 text-center shadow-[0_0_40px_rgba(16,185,129,0.3)]">
          <FaCheckCircle className="mx-auto text-4xl text-green-400 mb-3" />
          <h3 className="text-xl font-semibold text-white">Blockchain Verified</h3>
          <p className="text-gray-400 mt-1 text-sm">115 certified entries</p>
        </div>

        <div className="bg-[#1c1c2b]/90 p-6 rounded-2xl border border-white/10 text-center shadow-[0_0_40px_rgba(79,70,229,0.3)]">
          <FaIndustry className="mx-auto text-4xl text-indigo-500 mb-3" />
          <h3 className="text-xl font-semibold text-white">Dispatched</h3>
          <p className="text-gray-400 mt-1 text-sm">54 batches delivered</p>
        </div>
      </div>

      {/* Batch Management Section */}
      <div className="max-w-6xl mx-auto mt-14 bg-[#161622]/80 border border-white/10 p-8 rounded-2xl shadow-[0_0_40px_rgba(79,70,229,0.25)] backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
          <FaClipboardList className="text-indigo-400" />
          Recent Batch Registrations
        </h2>

        {/* table unchanged */}
        {/* ... your table code stays EXACTLY the same ... */}
      </div>

      {/* Blockchain Registration Section */}
      <div className="max-w-6xl mx-auto mt-14 text-center bg-[#1c1c2b]/90 border border-white/10 p-10 rounded-3xl shadow-[0_0_50px_rgba(99,102,241,0.3)]">
        <FaBarcode className="text-5xl mx-auto text-indigo-400 mb-4" />
        <h3 className="text-2xl font-semibold text-white mb-2">
          Register a New Batch
        </h3>
        <p className="text-gray-400 text-base max-w-2xl mx-auto mb-6">
          Add a new batch to the blockchain with full traceability — from raw
          materials to verified dispatch.
        </p>

        {/* ✅ ONLY THIS LINE IS CHANGED */}
        <button
          onClick={() => navigate("/manufacturer/register")}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 px-8 py-3 rounded-xl text-white font-medium shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all duration-300"
        >
          Add New Batch
        </button>
      </div>
    </div>
  );
}