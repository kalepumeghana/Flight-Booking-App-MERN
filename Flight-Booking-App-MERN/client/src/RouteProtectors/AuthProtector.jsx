import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthProtector = ({ children, role }) => {
  const userType = localStorage.getItem("userType");

  // Not logged in
  if (!userType) {
    return <Navigate to="/auth" />;
  }

  // If role is array
  if (Array.isArray(role)) {
    if (!role.includes(userType)) {
      return <Navigate to="/" />;
    }
  }
  // If single role
  else {
    if (role !== userType) {
      return <Navigate to="/" />;
    }
  }

  return children;
};

export default AuthProtector;