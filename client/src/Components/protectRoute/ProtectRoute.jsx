
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const { status } = useSelector((state) => state.auth);

  // If user is not authenticated, redirect to login page
  if (!status) {
    return <Navigate to="/login" replace />;
  }

  // Render child components if authenticated
  return <Outlet />;
};

export default ProtectedRoute;
