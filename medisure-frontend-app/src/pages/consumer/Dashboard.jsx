import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaQrcode,
  FaShieldAlt,
  FaHistory,
  FaUserCheck,
} from "react-icons/fa";

export default function ConsumerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0b12] via-[#1a1a2e] to-[#0b0b12] text-gray-100 p-8 md:p-14 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-md">
          Welcome to MediSure
        </h1>
        <p className="text-gray-400 mt-3 text-lg">
          Empowering consumers to verify medicine authenticity using blockchain.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Scan & Verify */}
        <div className="bg-[#161622]/80 border border-white/10 p-8 rounded-2xl shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:shadow-[0_0_60px_rgba(139,92,246,0.4)] transition-all duration-300 text-center">
          <div className="flex justify-center mb-6">
            <FaQrcode className="text-5xl text-purple-400" />
          </div>

          <h2 className="text-2xl font-semibold mb-2 text-white">
            Scan Your Medicine
          </h2>

          <p className="text-gray-400 mb-6">
            Verify your medicine's authenticity by scanning its QR code. Get
            instant blockchain validation.
          </p>

          <button
            onClick={() => navigate("/consumer/scan")}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-600 hover:to-purple-600 px-6 py-3 rounded-xl text-white font-medium shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all duration-300"
          >
            Start Scanning
          </button>
        </div>

        {/* Verification Summary */}
        <div className="bg-[#161622]/80 border border-white/10 p-8 rounded-2xl shadow-[0_0_40px_rgba(79,70,229,0.3)] hover:shadow-[0_0_60px_rgba(79,70,229,0.4)] transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-3">
            <FaShieldAlt className="text-indigo-400" />
            Verification Insights
          </h2>

          <ul className="space-y-4 text-gray-300">
            <li className="flex justify-between">
              <span>Verified Medicines</span>
              <span className="font-semibold text-green-400">34</span>
            </li>
            <li className="flex justify-between">
              <span>Unverified Medicines</span>
              <span className="font-semibold text-red-400">2</span>
            </li>
            <li className="flex justify-between">
              <span>Last Scan</span>
              <span className="text-gray-400">2 days ago</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14 max-w-6xl mx-auto">
        <div className="bg-[#1c1c2b]/80 p-6 rounded-2xl text-center border border-white/10">
          <FaShieldAlt className="mx-auto text-3xl text-purple-400 mb-3" />
          <h3 className="text-lg font-semibold text-white">Authenticity</h3>
          <p className="text-gray-400 text-sm">100% blockchain verified</p>
        </div>

        <div className="bg-[#1c1c2b]/80 p-6 rounded-2xl text-center border border-white/10">
          <FaHistory className="mx-auto text-3xl text-indigo-400 mb-3" />
          <h3 className="text-lg font-semibold text-white">Scan History</h3>
          <p className="text-gray-400 text-sm">15 past scans recorded</p>
        </div>

        <div className="bg-[#1c1c2b]/80 p-6 rounded-2xl text-center border border-white/10">
          <FaUserCheck className="mx-auto text-3xl text-green-400 mb-3" />
          <h3 className="text-lg font-semibold text-white">Profile Verified</h3>
          <p className="text-gray-400 text-sm">Email and phone verified</p>
        </div>

        <div className="bg-[#1c1c2b]/80 p-6 rounded-2xl text-center border border-white/10">
          <FaQrcode className="mx-auto text-3xl text-white mb-3" />
          <h3 className="text-lg font-semibold text-white">Blockchain ID</h3>
          <p className="text-gray-400 text-sm">#MS-9F21A34B7</p>
        </div>
      </div>
    </div>
  );
}