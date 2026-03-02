
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  
  const userRole = localStorage.getItem('userRole'); 

 
  const isAllowed = userRole && allowedRoles.includes(userRole);

  if (!userRole) {
  
    return <Navigate to="/" replace />;
  }

  if (!isAllowed) {
 
    alert(`Access Denied: You are logged in as ${userRole}.`);
 
    if (userRole === 'Admin') return <Navigate to="/admin" replace />;
    if (userRole === 'Security') return <Navigate to="/security" replace />;
    if (userRole === 'Manager') return <Navigate to="/manager" replace />;
    if (userRole === 'HR') return <Navigate to="/hr" replace />;
    return <Navigate to="/" replace />;
  }

 
  return <Outlet />;
};

export default ProtectedRoute;