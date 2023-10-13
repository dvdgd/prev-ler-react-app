import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useCurrentUser";

interface IRequireRoleProps {
  allowedRoles: string[];
}

export const RequireRole = ({ allowedRoles }: IRequireRoleProps) => {
  const { userSession: currentUser } = useAuth();

  const allowedRole = allowedRoles.includes(currentUser?.user?.profile.userType || "");
  if (allowedRole) return <Outlet />

  return <Navigate to="/unauthorized" state={{ from: location }} replace />
};
