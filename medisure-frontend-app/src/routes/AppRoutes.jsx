import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/common/ProtectedRoute";

// Manufacturer
import ManufacturerDashboard from "../pages/manufacturer/Dashboard";
import RegisterMedicine from "../pages/manufacturer/RegisterMedicine";

// Distributor
import DistributorDashboard from "../pages/distributor/Dashboard";

// Retailer
import RetailerDashboard from "../pages/retailer/Dashboard";

// Consumer
import ConsumerDashboard from "../pages/consumer/Dashboard";
import VerifyMedicine from "../pages/consumer/VerifyMedicine";

export default function AppRoutes() {
  return (
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
  );
}