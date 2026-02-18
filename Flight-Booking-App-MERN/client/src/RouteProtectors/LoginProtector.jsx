import React from 'react';
import { Navigate } from 'react-router-dom';

const LoginProtector = ({ children }) => {
  const userType = localStorage.getItem("userType");

  // Already logged in
  if (userType) {
    if (userType === "admin") return <Navigate to="/admin" />;
    if (userType === "flight-operator") return <Navigate to="/flight-admin" />;
    return <Navigate to="/flights" />;
  }

  return children;
};

export default LoginProtector;