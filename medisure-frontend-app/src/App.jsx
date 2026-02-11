import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";

// 🔗 Blockchain init hook
import useContract from "./hooks/useContract";

// Public
import Login from "./pages/Login";
import Register from "./pages/Register";

// Manufacturer
import ManufacturerDashboard from "./pages/manufacturer/Dashboard";
import RegisterMedicine from "./pages/manufacturer/RegisterMedicine";

// Distributor
import DistributorDashboard from "./pages/distributor/Dashboard";

// Retailer
import RetailerDashboard from "./pages/retailer/Dashboard";

// Consumer
import ConsumerDashboard from "./pages/consumer/Dashboard";
import VerifyMedicine from "./pages/consumer/VerifyMedicine";

function App() {
  // ✅ Initialize blockchain once (no UI change)
  useContract();

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#0b0b12] text-gray-100">
        <Navbar />

        <main className="flex-grow px-4 animate-fadeIn">
          <Routes>
            {/* ================= PUBLIC ================= */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ================= MANUFACTURER ================= */}
            <Route
              path="/manufacturer/dashboard"
              element={
                <ProtectedRoute role="manufacturer">
                  <ManufacturerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manufacturer/register"
              element={
                <ProtectedRoute role="manufacturer">
                  <RegisterMedicine />
                </ProtectedRoute>
              }
            />

            {/* ================= DISTRIBUTOR ================= */}
            <Route
              path="/distributor/dashboard"
              element={
                <ProtectedRoute role="distributor">
                  <DistributorDashboard />
                </ProtectedRoute>
              }
            />

            {/* ================= RETAILER ================= */}
            <Route
              path="/retailer/dashboard"
              element={
                <ProtectedRoute role="retailer">
                  <RetailerDashboard />
                </ProtectedRoute>
              }
            />

            {/* ================= CONSUMER ================= */}
            <Route
              path="/consumer/dashboard"
              element={
                <ProtectedRoute role="consumer">
                  <ConsumerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/consumer/scan"
              element={
                <ProtectedRoute role="consumer">
                  <VerifyMedicine />
                </ProtectedRoute>
              }
            />

            {/* ================= FALLBACK ================= */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;