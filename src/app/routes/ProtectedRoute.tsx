// ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type { Role } from '../types/UserType';


interface ProtectedRouteProps {
  allowedRoles: Role[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const location = useLocation();

  const auth = {
    isAuthenticated: true, 
    user: { role: 'user' } as { role: Role } | null 
  };

  if (!auth.isAuthenticated) {
 
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (auth.user && !allowedRoles.includes(auth.user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  
  return <Outlet />;
};