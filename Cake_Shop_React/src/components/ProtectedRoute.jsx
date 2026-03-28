import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if authToken exists in sessionStorage
  const authToken = sessionStorage.getItem("authToken");

  // If authToken exists, render the component, otherwise redirect to login
  return authToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
