import { get } from "react-hook-form";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "~/hooks/auth/useAuth";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, isAccessTokenExpired, getUser } = useAuth();

  if (!isAuthenticated() || isAccessTokenExpired()) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = getUser?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      if (userRole === "student") {
        return <Navigate to="/student" replace />;
      } else if (userRole === "instructor") {
        return <Navigate to="/instructor" replace />;
      } else {
        return <Navigate to="/login" replace />;
      }
    }
  }

  

  return <Outlet />;
}
