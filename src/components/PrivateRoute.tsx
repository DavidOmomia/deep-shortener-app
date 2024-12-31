import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  loginUrl: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ loginUrl }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to={loginUrl} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;