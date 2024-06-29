import React from "react";
import { Navigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthContext();

  if (!user) {
    toast.error("Your need to login first");
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
