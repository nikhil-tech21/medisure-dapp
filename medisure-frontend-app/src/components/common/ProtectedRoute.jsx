import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const userRole = localStorage.getItem("userRole");
  if (userRole !== role) return <Navigate to="/" replace />;
  return children;
}