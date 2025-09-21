import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/providers/providers"; // adjust if your hook path is different

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth(); // assumes your AuthProvider exposes user object or isAuthenticated flag

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
